"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/config/firebase";

interface IUser {
  user?: object | null;
}

interface IUserCredentials {
  email?: string | null;
  password?: string | null;
}

export const AuthContext = React.createContext<IUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserCredentials | null>();
  const [apiKey, setApiKey] = useState<string | "">();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
