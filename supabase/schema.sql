-- 홍대보이 지도 DB 스키마
-- Supabase SQL Editor에서 실행

CREATE TABLE spots (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  lat          DOUBLE PRECISION NOT NULL,
  lng          DOUBLE PRECISION NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('open_minded', 'language_exchange', 'kdrama', 'studied_abroad')),
  ip_hash      TEXT,
  is_flagged   BOOLEAN NOT NULL DEFAULT false
);

-- 최신순 조회 인덱스
CREATE INDEX spots_created_at_idx ON spots (created_at DESC);

-- ip_hash 기반 rate limit 조회 인덱스
CREATE INDEX spots_ip_hash_idx ON spots (ip_hash, created_at);

-- RLS 활성화 (service role key만 write 가능, 읽기는 공개)
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (is_flagged=false 인 것만)
CREATE POLICY "Public read unflagged spots"
  ON spots FOR SELECT
  USING (is_flagged = false);

-- service role은 모든 작업 가능 (API Route에서 사용)
-- service role key는 RLS를 bypass하므로 별도 정책 불필요
