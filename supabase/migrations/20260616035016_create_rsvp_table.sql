CREATE TABLE IF NOT EXISTS rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  guest_count integer NOT NULL DEFAULT 1,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_public_insert_rsvp" ON rsvp
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "allow_select_rsvp" ON rsvp
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "allow_update_rsvp" ON rsvp
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_delete_rsvp" ON rsvp
  FOR DELETE TO authenticated
  USING (true);
