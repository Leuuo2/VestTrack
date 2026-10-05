import { useEffect, useState } from "react";
import { BarChart3, Eye, Users, TrendingUp, Globe, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { getVisitStats } from "@/lib/analytics";
import { useCloudUser } from "@/lib/useCloudUser";
import { Link } from "react-router-dom";
import { isCloudConfigured } from "@/lib/supabase";

export default function Admin() {
  const user = useCloudUser();
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getVisitStats>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.email === "leonardopereira201423@gmail.com" || user?.email === "leonardo@vesttrack.dev";

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const s = await getVisitStats();
      setStats(s);
    } catch (e: any) {
      setError(e.message || "Erro ao carregar");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-violet-600" /> Visitas do Site</h1>
        <Card className="p-6 text-center border-dashed">
          <Eye className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 font-medium">Precisa estar logado</p>
          <p className="mt-1 text-sm text-muted-foreground">Faça login em /app/sync pra ver visitas (só admin pode ver)</p>
          <p className="mt-2 text-xs font-mono bg-muted p-2 rounded">Debug: user = null • cloudConfigured = {String(isCloudConfigured)} • URL = {import.meta.env.VITE_SUPABASE_URL ? "ok" : "missing"}</p>
          <Button asChild size="sm" className="mt-4"><Link to="/app/sync">Ir pra Sync</Link></Button>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-violet-600" /> Visitas do Site</h1>
        <Card className="p-6 text-center border-amber-500/20 bg-amber-500/5">
          <p className="font-medium text-amber-700 dark:text-amber-300">Acesso restrito</p>
          <p className="mt-2 text-sm text-muted-foreground">Só o admin (leonardopereira201423@gmail.com) pode ver visitas.</p>
          <p className="mt-2 text-xs font-mono bg-muted p-2 rounded">Logado como: {user.email} • isAdmin: {String(isAdmin)} • esperado: leonardopereira201423@gmail.com</p>
          <Button asChild size="sm" variant="outline" className="mt-4"><Link to="/app">Voltar pro app</Link></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-violet-600" /> Visitas do Site</h1>
          <p className="text-sm text-muted-foreground">Do Supabase • tabela page_views • logado como {user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
        </Button>
      </div>

      {loading ? (
        <Card className="p-6 text-center text-sm text-muted-foreground">Carregando visitas...</Card>
      ) : error ? (
        <Card className="p-6 border-amber-500/20 bg-amber-500/5">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Erro: {error}</p>
          <p className="mt-2 text-xs text-muted-foreground">Rode no Supabase SQL Editor:</p>
          <pre className="mt-2 overflow-auto rounded-xl bg-muted p-3 text-[11px]">create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text, referrer text, user_agent text,
  timestamp timestamptz default now(), session_id text
);
alter table page_views enable row level security;
create policy "Anyone can insert" on page_views for insert with check (true);
create policy "Only auth can read" on page_views for select using (auth.role() = 'authenticated');</pre>
        </Card>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-0">
              <div className="flex items-center gap-2 opacity-80"><Users className="h-4 w-4" /><span className="text-xs">Pessoas únicas</span></div>
              <p className="mt-1 text-2xl font-bold">{stats.unique}</p>
              <p className="text-[11px] opacity-80">{stats.todayUnique} hoje • por session_id</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground"><Eye className="h-4 w-4" /><span className="text-xs">Total cliques</span></div>
              <p className="mt-1 text-2xl font-bold">{stats.total}</p>
              <p className="text-[11px] text-muted-foreground">{stats.today} hoje • page views</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground"><Globe className="h-4 w-4" /><span className="text-xs">Páginas únicas</span></div>
              <p className="mt-1 text-2xl font-bold">{Object.keys(stats.byPath).length}</p>
              <p className="text-[11px] text-muted-foreground">rotas diferentes</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="h-4 w-4" /><span className="text-xs">Top página</span></div>
              <p className="mt-1 text-sm font-bold truncate">{Object.entries(stats.byPath).sort((a,b)=>b[1]-a[1])[0]?.[0] || "-"}</p>
              <p className="text-[11px] text-muted-foreground">{Object.entries(stats.byPathUnique).sort((a,b)=>b[1]-a[1])[0]?.[1] || 0} pessoas • {Object.entries(stats.byPath).sort((a,b)=>b[1]-a[1])[0]?.[1] || 0} cliques</p>
            </Card>
          </div>

          <Card className="p-4 md:p-6">
            <h3 className="font-medium text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-violet-600" /> Pessoas únicas por página (não cliques)</h3>
            <p className="mt-1 text-xs text-muted-foreground">Conta por session_id — mesma pessoa navegando várias vezes conta 1x por página</p>
            <div className="mt-4 space-y-2">
              {Object.entries(stats.byPathUnique).sort((a,b)=>b[1]-a[1]).map(([path, uniqueCount]) => {
                const totalClicks = stats.byPath[path] || 0;
                return (
                  <div key={path} className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
                    <span className="flex-1 truncate font-mono text-sm">{path}</span>
                    <span className="text-xs text-muted-foreground">{totalClicks} cliques</span>
                    <span className="font-bold">{uniqueCount} pessoas</span>
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-violet-600" style={{ width: `${(uniqueCount / Math.max(...Object.values(stats.byPathUnique))) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-medium text-sm">Últimas 30 visitas (com session)</h3>
            <div className="mt-4 space-y-2 max-h-[400px] overflow-auto">
              {stats.recent.map((v: any) => (
                <div key={v.path + v.timestamp + v.session_id} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-2 text-xs">
                  <span className="font-mono truncate">{v.path}</span>
                  <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[80px]">{v.session_id.slice(0,8)}...</span>
                  <span className="text-muted-foreground shrink-0">{new Date(v.timestamp).toLocaleString("pt-BR")}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
