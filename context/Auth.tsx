"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { IUser } from "@/types/User";

const initialState: IUser = {
  isLoggedIn: false,
};

export const AuthContext = React.createContext<IUser>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
