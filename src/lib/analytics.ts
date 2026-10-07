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
      visitor_id: getVisitorId(),
      user_id: await getUserId(),
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

function getVisitorId() {
  try {
    let vid = localStorage.getItem("vesttrack_vid");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("vesttrack_vid", vid);
    }
    return vid;
  } catch {
    return "unknown";
  }
}

async function getUserId() {
  try {
    if (!supabase) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  } catch {
    return null;
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
    
    const { data: views, error } = await supabase
      .from("page_views")
      .select("path, timestamp, session_id, visitor_id, user_id")
      .order("timestamp", { ascending: false })
      .limit(5000);
    
    if (error) {
      throw new Error(`Supabase: ${error.message} (code: ${error.code})`);
    }
    
    const total = views?.length || 0;
    const today = new Date().toISOString().slice(0, 10);
    const todayViews = views?.filter(v => v.timestamp.slice(0, 10) === today).length || 0;
    
    // Pessoas reais = distinct visitor_id (persiste mesmo fechando aba) ou user_id se logado
    const uniqueVisitors = new Set(views?.map(v => v.visitor_id || v.session_id) || []).size;
    const uniqueUsers = new Set(views?.filter(v => v.user_id).map(v => v.user_id) || []).size;
    const uniqueSessions = new Set(views?.map(v => v.session_id) || []).size;
    
    const todayUniqueVisitors = new Set(views?.filter(v => v.timestamp.slice(0, 10) === today).map(v => v.visitor_id) || []).size;
    const todayUniqueSessions = new Set(views?.filter(v => v.timestamp.slice(0, 10) === today).map(v => v.session_id) || []).size;
    
    const byPath: Record<string, number> = {};
    const byPathUniqueVisitors: Record<string, number> = {};
    const byPathUniqueSessions: Record<string, number> = {};
    
    const seenVisitorsPerPath = new Map<string, Set<string>>();
    const seenSessionsPerPath = new Map<string, Set<string>>();
    
    views?.forEach(v => {
      byPath[v.path] = (byPath[v.path] || 0) + 1;
      
      if (!seenVisitorsPerPath.has(v.path)) seenVisitorsPerPath.set(v.path, new Set());
      seenVisitorsPerPath.get(v.path)!.add(v.visitor_id || v.session_id);
      
      if (!seenSessionsPerPath.has(v.path)) seenSessionsPerPath.set(v.path, new Set());
      seenSessionsPerPath.get(v.path)!.add(v.session_id);
    });
    
    seenVisitorsPerPath.forEach((set, path) => {
      byPathUniqueVisitors[path] = set.size;
    });
    seenSessionsPerPath.forEach((set, path) => {
      byPathUniqueSessions[path] = set.size;
    });
    
    return { 
      total, 
      today: todayViews, 
      uniqueVisitors,
      uniqueUsers,
      uniqueSessions,
      todayUniqueVisitors,
      todayUniqueSessions,
      byPath, 
      byPathUniqueVisitors,
      byPathUniqueSessions,
      recent: views?.slice(0, 50) || [] 
    };
  } catch (e: any) {
    console.error("[analytics] get stats error", e);
    throw e;
  }
}
