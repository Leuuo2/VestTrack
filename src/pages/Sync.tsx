import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Cloud,
  CloudOff,
  CloudUpload,
  HardDrive,
  KeyRound,
  LogOut,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserPlus,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import {
  cloudIsConfigured,
  cloudSignIn,
  cloudSignOut,
  cloudSignUp,
  pullAllFromCloud,
} from "@/lib/sync";
import { useCloudUser } from "@/lib/useCloudUser";

type Mode = "login" | "signup";

function Sync() {
  const user = useCloudUser();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "login") {
        await cloudSignIn(email, password);
        setNotice("Conta conectada — seus dados da nuvem foram baixados.");
      } else {
        const result = await cloudSignUp(email, password, name);
        if (result === "confirm-email") {
          setNotice("Conta criada! Enviamos um link para seu e-mail — confirme e depois entre com sua senha.");
          setMode("login");
        } else {
          setNotice("Conta criada e conectada!");
        }
      }
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Tente de novo.");
    } finally {
      setBusy(false);
    }
  }

  async function handleManualSync() {
    setSyncing(true);
    setError(null);
    setSynced(false);
    try {
      await pullAllFromCloud();
      setSynced(true);
      window.setTimeout(() => setSynced(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao sincronizar.");
    } finally {
      setSyncing(false);
    }
  }

  async function handleSignOut() {
    await cloudSignOut();
    setNotice(null);
  }

  return (
    <>
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
          <Cloud className="h-3 w-3" /> Nuvem premium
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Conta e sincronização</h1>
        <p className="text-sm text-muted-foreground">O app funciona sem conta. Crie uma (opcional) para backup na nuvem e usar no celular e no computador.</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card hover>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400"><HardDrive className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">Local (sempre ligado)</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tudo é salvo instantaneamente neste navegador — funciona offline e sem cadastro. É o modo padrão.</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400"><Cloud className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">Nuvem (com conta)</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Cada mudança é enviada automaticamente para o Supabase. Ao entrar em outro dispositivo, é só logar.</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">Privacidade</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">O banco usa RLS: cada conta só lê e edita os próprios dados. Nenhuma conta vê a de outra.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        {!cloudIsConfigured() ? (
          <Card premium title="Nuvem ainda não configurada">
            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400"><CloudOff className="h-5 w-5" /></div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O app está rodando só com os dados locais. Para ativar a sincronização, defina <code className="rounded bg-muted px-1.5 py-0.5 text-xs">VITE_SUPABASE_URL</code> e <code className="rounded bg-muted px-1.5 py-0.5 text-xs">VITE_SUPABASE_ANON_KEY</code> no arquivo <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.env</code> e recarregue.
              </p>
            </div>
          </Card>
        ) : user ? (
          <Card premium title="Conectado à nuvem">
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-2.5 ring-1 ring-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm font-medium">Sincronizando como <span className="font-bold text-emerald-700 dark:text-emerald-300">{user.email}</span></p>
              </div>
              <p className="text-sm text-muted-foreground">Tópicos, tarefas, simulados e perfil são enviados a cada alteração. Use o botão abaixo para baixar os dados mais recentes agora.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handleManualSync} disabled={syncing} className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
                  {syncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CloudUpload className="h-4 w-4" />} Sincronizar agora
                </Button>
                <Button variant="outline" onClick={handleSignOut} className="h-10 rounded-xl">
                  <LogOut className="h-4 w-4" /> Sair da conta
                </Button>
                {synced && <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400"><CheckCircle2 className="h-4 w-4" /> Dados atualizados!</span>}
              </div>
              {notice && <p className="rounded-xl bg-violet-500/10 px-3.5 py-2.5 text-sm text-violet-700 ring-1 ring-violet-500/20 dark:text-violet-300">{notice}</p>}
              {error && <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive ring-1 ring-destructive/20">{error}</p>}
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card premium title={mode === "login" ? "Entrar na sua conta" : "Criar conta grátis"}>
              <div className="mt-4 space-y-5">
                <div className="flex gap-1 rounded-xl bg-muted p-1 text-sm font-medium">
                  <button type="button" onClick={() => { setMode("login"); setError(null); setNotice(null); }} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 transition-all ${mode === "login" ? "bg-card shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                    <KeyRound className="h-4 w-4" /> Entrar
                  </button>
                  <button type="button" onClick={() => { setMode("signup"); setError(null); setNotice(null); }} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 transition-all ${mode === "signup" ? "bg-card shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                    <UserPlus className="h-4 w-4" /> Criar conta
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label htmlFor="sync-name" className="block text-sm font-medium">Nome</label>
                      <input id="sync-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Seu nome" />
                    </div>
                  )}
                  <div>
                    <label htmlFor="sync-email" className="block text-sm font-medium">E-mail</label>
                    <div className="relative mt-1.5">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input id="sync-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-3.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="voce@exemplo.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sync-password" className="block text-sm font-medium">Senha</label>
                    <div className="relative mt-1.5">
                      <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input id="sync-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full rounded-xl border border-input bg-transparent py-2.5 pl-10 pr-3.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder={mode === "signup" ? "Mínimo de 6 caracteres" : "Sua senha"} />
                    </div>
                  </div>

                  <Button type="submit" disabled={busy} className="h-11 w-full rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[15px] shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
                    {busy ? <RefreshCw className="h-4 w-4 animate-spin" /> : mode === "login" ? <KeyRound className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                    {mode === "login" ? "Entrar" : "Criar conta"}
                  </Button>
                </form>

                {notice && <p className="flex items-start gap-2 rounded-xl bg-violet-500/10 px-3.5 py-2.5 text-sm font-medium text-violet-700 ring-1 ring-violet-500/20 dark:text-violet-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {notice}</p>}
                {error && <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive ring-1 ring-destructive/20">{error}</p>}
              </div>
            </Card>

            <div className="space-y-4">
              <div className="rounded-[20px] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-card to-fuchsia-500/10 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400"><Sparkles className="h-4 w-4" /> Por que criar conta?</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    "Backup automático de tudo",
                    "Use no celular, tablet e PC",
                    "Dados protegidos com RLS",
                    "Sincronização em tempo real",
                  ].map(t => (
                    <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20"><CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /></span>{t}</li>
                  ))}
                </ul>
              </div>
              <Card>
                <p className="text-sm font-medium">💡 Dica</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Você pode usar o VestTrack para sempre sem conta. A nuvem é só para quem quer levar os dados para outro dispositivo — nunca obrigatória.</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sync;
