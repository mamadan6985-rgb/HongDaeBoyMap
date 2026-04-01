import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getSupabase();

  if (!supabase) {
    // No DB — just return success so local state deletion still works
    return NextResponse.json({ success: true });
  }

  let token: string;
  try {
    const body = await req.json();
    token = body.token;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('spots')
    .delete()
    .eq('id', id)
    .eq('delete_token', token)
    .select('id')
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found or invalid token' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
