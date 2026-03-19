-- Projects table for architects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  architect_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT,
  budget TEXT,
  location TEXT,
  category TEXT,
  materials TEXT[],
  status TEXT NOT NULL DEFAULT 'Recebendo propostas'
    CHECK (status IN ('Recebendo propostas', 'Em negociação', 'Fechado', 'Arquivado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read projects (suppliers need to browse)
CREATE POLICY "projects_select" ON public.projects
FOR SELECT USING (auth.role() = 'authenticated');

-- Only the architect who created can insert
CREATE POLICY "projects_insert" ON public.projects
FOR INSERT WITH CHECK (auth.uid() = architect_id);

-- Only the architect who created can update
CREATE POLICY "projects_update" ON public.projects
FOR UPDATE USING (auth.uid() = architect_id);

-- Only the architect who created can delete
CREATE POLICY "projects_delete" ON public.projects
FOR DELETE USING (auth.uid() = architect_id);

CREATE INDEX IF NOT EXISTS idx_projects_architect_id ON public.projects(architect_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- Messages table for conversations
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can read messages where they are sender or recipient
CREATE POLICY "messages_select" ON public.messages
FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can insert messages where they are the sender
CREATE POLICY "messages_insert" ON public.messages
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can update messages where they are the recipient (to mark as read)
CREATE POLICY "messages_update" ON public.messages
FOR UPDATE USING (auth.uid() = recipient_id);

CREATE INDEX IF NOT EXISTS idx_messages_project_id ON public.messages(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at ASC);

-- Updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
