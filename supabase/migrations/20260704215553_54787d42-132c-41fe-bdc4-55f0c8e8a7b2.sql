CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  consent_processing BOOLEAN NOT NULL DEFAULT false,
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a lead, but only with the required processing consent
CREATE POLICY "Anyone can submit a lead with consent"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent_processing = true
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(name) BETWEEN 1 AND 100
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- No SELECT/UPDATE/DELETE policies -> only service_role can read/modify