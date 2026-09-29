import { useEffect, useState } from "react";
import { getCloudUser, onCloudUserChange, type CloudUser } from "./sync";

export function useCloudUser(): CloudUser | null {
  const [user, setUser] = useState<CloudUser | null>(getCloudUser);
  useEffect(() => {
    const unsub = onCloudUserChange(setUser);
    return () => { unsub(); };
  }, []);
  return user;
}
