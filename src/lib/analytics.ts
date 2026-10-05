import { supabase, isCloudConfigured } from "./supabase";

// Track page view - call on each page
export async function trackPageView(path: string) {
  if (!isCloudConfigured || !supabase) return;
  
  try {
    const visit = {
      path,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
    };
    
    // Don't await - fire and forget
    supabase.from("page_views").insert(visit).then(({ error }) => {
      if (error) console.debug("[analytics] track error", error.message);
    });
  } catch (e) {
    console.debug("[analytics] error", e);
  }
}

function getSessionId() {
  try {
    let sid = sessionStorage.getItem("vesttrack_sid");
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("vesttrack_sid", sid);
    }
    return sid;
  } catch {
    return "unknown";
  }
}

// Get visit stats - for admin dashboard
export async function getVisitStats() {
  if (!isCloudConfigured || !supabase) {
    throw new Error("Supabase não configurado - VITE_SUPABASE_URL ou KEY faltando");
  }
  
  try {
    // First check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw new Error(`Session error: ${sessionError.message}`);
    if (!session) throw new Error("Sem sessão - faça login novamente em /app/sync");
    
    console.log("[analytics] session user", session.user.email, session.user.role);
    
    const { data: views, error } = await supabase
      .from("page_views")
      .select("path, timestamp, session_id")
      .order("timestamp", { ascending: false })
      .limit(2000);
    
    if (error) {
      console.error("[analytics] supabase error", error);
      throw new Error(`Supabase: ${error.message} (code: ${error.code}) - Rode o SQL do page_views e verifique RLS`);
    }
    
    const total = views?.length || 0;
    const today = new Date().toISOString().slice(0, 10);
    const todayViews = views?.filter(v => v.timestamp.slice(0, 10) === today).length || 0;
    
    // Unique visitors = distinct session_id
    const uniqueSessions = new Set(views?.map(v => v.session_id) || []).size;
    const todayUnique = new Set(views?.filter(v => v.timestamp.slice(0, 10) === today).map(v => v.session_id) || []).size;
    
    const byPath: Record<string, number> = {};
    views?.forEach(v => {
      byPath[v.path] = (byPath[v.path] || 0) + 1;
    });

    const byPathUnique: Record<string, number> = {};
    const seenPerPath = new Map<string, Set<string>>();
    views?.forEach(v => {
      if (!seenPerPath.has(v.path)) seenPerPath.set(v.path, new Set());
      seenPerPath.get(v.path)!.add(v.session_id);
    });
    seenPerPath.forEach((set, path) => {
      byPathUnique[path] = set.size;
    });
    
    return { 
      total, 
      today: todayViews, 
      unique: uniqueSessions,
      todayUnique,
      byPath, 
      byPathUnique,
      recent: views?.slice(0, 30) || [] 
    };
  } catch (e: any) {
    console.error("[analytics] get stats error", e);
    throw e;
  }
}
