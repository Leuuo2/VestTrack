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
  if (!isCloudConfigured || !supabase) return null;
  
  try {
    const { data: views, error } = await supabase
      .from("page_views")
      .select("path, timestamp")
      .order("timestamp", { ascending: false })
      .limit(1000);
    
    if (error) throw error;
    
    const total = views?.length || 0;
    const today = new Date().toISOString().slice(0, 10);
    const todayViews = views?.filter(v => v.timestamp.slice(0, 10) === today).length || 0;
    
    const byPath: Record<string, number> = {};
    views?.forEach(v => {
      byPath[v.path] = (byPath[v.path] || 0) + 1;
    });
    
    return { total, today: todayViews, byPath, recent: views?.slice(0, 20) || [] };
  } catch (e) {
    console.debug("[analytics] get stats error", e);
    return null;
  }
}
