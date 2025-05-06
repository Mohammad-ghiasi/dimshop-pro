"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<{ token: string | null }>({ token: null });

export  function AuthProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken: string | null;
}) {
  return (
    <AuthContext.Provider value={{ token: initialToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
