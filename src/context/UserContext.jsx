"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        setUser(null);
        return;
      }

      const data = await res.json();
      if (data?.ok) setUser(data.user);
      else setUser(null);
    } catch {
      // اگر نت قطع بود، user رو دست نزن؛ فقط loading رو بردار
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ✅ LOGOUT استیبل
  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      // پاکسازی کلاینت (حتی اگر سرور جواب نداد)
      setUser(null);
      setLoading(false);

      // ریدایرکت امن
      window.location.href = "/login";
    }
  }, []);

  const value = { user, setUser, loading, refresh, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider />");
  return ctx;
}
