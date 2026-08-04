ALTER TABLE public.leads ADD COLUMN format TEXT NOT NULL DEFAULT 'A3';

DROP POLICY IF EXISTS "Anyone can submit a lead with consent" ON public.leads;

CREATE POLICY "Anyone can submit a lead with consent and format"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent_processing = true
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(name) BETWEEN 1 AND 100
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND format IN ('A3', 'A2')
);