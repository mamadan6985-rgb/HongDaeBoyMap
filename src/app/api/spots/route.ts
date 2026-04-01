import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { VALID_TYPES } from '@/types';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json([]);

  const { data, error } = await supabase
    .from('spots')
    .select('id, lat, lng, type, created_at')
    .eq('is_flagged', false)
    .order('created_at', { ascending: false })
    .limit(1000);

  if (error) return NextResponse.json([]);
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 503 });
  }

  let body: { lat: unknown; lng: unknown; type: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { lat, lng, type } = body;

  if (
    typeof lat !== 'number' ||
    typeof lng !== 'number' ||
    typeof type !== 'string' ||
    !VALID_TYPES.includes(type as never)
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Seoul bounding box
  if (lat < 37.4 || lat > 37.7 || lng < 126.7 || lng > 127.2) {
    return NextResponse.json({ error: 'Location out of bounds' }, { status: 400 });
  }

  // IP hash for rate limiting (never store raw IP)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const salt = process.env.IP_HASH_SALT ?? 'default-salt';
  const ip_hash = crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .slice(0, 16);

  // Rate limit: max 20 spots per IP per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from('spots')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ip_hash)
    .gte('created_at', oneHourAgo);

  if ((count ?? 0) >= 20) {
    return NextResponse.json({ error: 'Too many spots — slow down!' }, { status: 429 });
  }

  const { data, error } = await supabase
    .from('spots')
    .insert({ lat, lng, type, ip_hash })
    .select('id, lat, lng, type, created_at')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
