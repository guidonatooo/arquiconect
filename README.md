# BebêBet 🍼

> Bolão do chá revelação — amigos e familiares apostam no sexo do bebê via PIX!

**Stack:** Next.js 14 · Supabase · Tailwind CSS · shadcn/ui

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Placar em tempo real + botões de aposta |
| `/admin` | Painel de gerenciamento (senha protegida) |
| `/revelacao` | Página de revelação com confetes |

---

## 1. Criar e configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **New Project**, escolha um nome (ex: `bebebet`) e defina uma senha forte
3. Aguarde o projeto ser criado (~1 min)
4. Vá em **Project Settings → API** e copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### SQL para criar as tabelas

No Supabase, vá em **SQL Editor** e execute:

```sql
-- Tabela de apostas
CREATE TABLE apostas (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome       TEXT NOT NULL,
  escolha    TEXT NOT NULL CHECK (escolha IN ('menino', 'menina')),
  valor      NUMERIC(10, 2) NOT NULL CHECK (valor >= 5),
  status     TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de configuração
CREATE TABLE config (
  chave TEXT PRIMARY KEY,
  valor TEXT
);

-- Valores iniciais
INSERT INTO config (chave, valor) VALUES ('resultado', NULL);
INSERT INTO config (chave, valor) VALUES ('data_revelacao', '2025-08-10');

-- Habilitar Realtime nas tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE apostas;
ALTER PUBLICATION supabase_realtime ADD TABLE config;

-- Row Level Security (RLS) — recomendado
ALTER TABLE apostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode ler apostas confirmadas
CREATE POLICY "apostas_confirmadas_publicas"
  ON apostas FOR SELECT
  USING (status = 'confirmado');

-- Qualquer um pode inserir apostas
CREATE POLICY "apostas_insercao_publica"
  ON apostas FOR INSERT
  WITH CHECK (true);

-- Qualquer um pode ler config
CREATE POLICY "config_publica"
  ON config FOR SELECT
  USING (true);
```

> **Nota:** As operações de admin (confirmar PIX, revelar resultado, listar todas as apostas)
> usam a `service_role_key` no servidor, que bypassa o RLS automaticamente.

---

## 2. Criar projeto na Vercel

1. Faça push deste repositório para o GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
3. Clique em **Add New → Project**
4. Selecione o repositório e clique em **Import**
5. A Vercel detectará automaticamente o framework **Next.js**
6. Configure as variáveis de ambiente (próximo passo) **antes** de clicar em Deploy

---

## 3. Variáveis de ambiente na Vercel

Em **Project Settings → Environment Variables**, adicione todas as variáveis do arquivo
`.env.local.example`:

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon pública | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (secreta) | `eyJ...` |
| `NEXT_PUBLIC_PIX_KEY` | Sua chave PIX | `seu@email.com` |
| `NEXT_PUBLIC_PIX_NAME` | Nome no PIX (máx 25 chars, sem acentos) | `Donato Silva` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Senha para acessar `/admin` | `senha123` |
| `NEXT_PUBLIC_DATA_REVELACAO` | Data da revelação (YYYY-MM-DD) | `2025-08-10` |
| `NEXT_PUBLIC_NOME_PAIS` | Nome dos pais no header | `Donato & Verônica` |
| `NEXT_PUBLIC_MENSAGEM_PAIS` | Mensagem pós-revelação | `Obrigado por celebrar...` |

Clique em **Deploy**. ✅

---

## 4. Desenvolvimento local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/bebebet.git
cd bebebet

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas configurações reais

# 4. Inicie o servidor de desenvolvimento
npm run dev
# Acesse http://localhost:3000
```

---

## 5. Como compartilhar com os convidados

Após o deploy na Vercel, você receberá uma URL como `https://bebebet.vercel.app`.

**Compartilhe essa URL** via WhatsApp, Instagram, etc.!

### Fluxo do evento

1. **Antes do chá** → Compartilhe o link `/`
2. **Convidados apostam** → Escolhem menino/menina, pagam via PIX
3. **Você confirma os PIX** → Acesse `/admin`, verifique os pagamentos e clique "Confirmar PIX"
4. **No momento da revelação** → Acesse `/admin` e clique "É Menino!" ou "É Menina!"
5. **Mostre `/revelacao` na TV/telão** → Confetes e lista dos vencedores aparecem automaticamente! 🎊

---

## Estrutura do projeto

```
app/
├── layout.tsx            # Layout raiz (fontes Playfair + Nunito, metadados)
├── globals.css           # Estilos globais + animações CSS (balões, confetes)
├── page.tsx              # Página principal — placar Realtime + modal de aposta
├── admin/page.tsx        # Painel admin — confirmar PIX, revelar resultado
├── revelacao/page.tsx    # Revelação — confetes, anúncio, vencedores
└── api/
    ├── apostas/          # POST: registrar aposta pendente
    ├── config/           # GET: ler configurações
    └── admin/
        ├── apostas/      # GET: listar todas as apostas (service role)
        ├── confirmar/    # POST: confirmar pagamento (service role)
        └── revelar/      # POST: revelar resultado (service role)

components/
├── ui/                   # Componentes base — Button, Dialog, Input, Label, Table, Badge
├── Header.tsx            # Logo BebêBet + nome dos pais + countdown
├── Scoreboard.tsx        # Placar em tempo real (Menino vs Menina)
├── BettingModal.tsx      # Modal de aposta + geração de QR Code PIX
├── RecentBets.tsx        # Lista das últimas apostas confirmadas
├── Balloons.tsx          # Balões CSS flutuando no fundo
└── Confetti.tsx          # Confetes CSS na página de revelação

lib/
├── supabase.ts           # Cliente Supabase para o browser (anon key)
├── supabase-server.ts    # Cliente Supabase para o servidor (service role)
├── pix.ts                # Gerador de payload PIX BR Code (EMV/BACEN)
└── utils.ts              # cn() helper para Tailwind
```
