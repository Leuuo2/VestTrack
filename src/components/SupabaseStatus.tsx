import { Cloud, CloudOff, CheckCircle2, Wifi, WifiOff } from "lucide-react";
import { useCloudUser } from "@/lib/useCloudUser";
import { cloudIsConfigured } from "@/lib/sync";
import { useEffect, useState } from "react";

export default function SupabaseStatus() {
  const user = useCloudUser();
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!cloudIsConfigured()) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs shadow-lg md:flex">
      {online ? <Wifi className="h-3 w-3 text-emerald-600" /> : <WifiOff className="h-3 w-3 text-red-500" />}
      {user ? (
        <>
          <Cloud className="h-3 w-3 text-emerald-600" />
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            {user.email}
          </span>
        </>
      ) : (
        <>
          <CloudOff className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Local • sem conta</span>
        </>
      )}
      <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-red-500"}`} />
    </div>
  );
}
