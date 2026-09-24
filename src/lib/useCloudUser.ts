import { useEffect, useState } from "react";
import { getCloudUser, onCloudUserChange, type CloudUser } from "./sync";

/**
 * Sessão atual do Supabase: `null` quando não há conta conectada.
 * Re-renderiza automaticamente no login/logout (via onAuthStateChange).
 */
export function useCloudUser(): CloudUser | null {
  const [user, setUser] = useState<CloudUser | null>(getCloudUser);
  useEffect(() => onCloudUserChange(setUser), []);
  return user;
}
