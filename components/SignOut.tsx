import React, { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { deleteApiKey } from "@/config/firebase-api-key";

interface SignOutProps {
  setShowSignOutModal: (input: boolean) => void;
}

const SignOut = ({ setShowSignOutModal }: SignOutProps) => {
  const user = auth?.currentUser;

  const handleSignOut = useCallback(async () => {
    try {
      if (user) await deleteApiKey(user?.uid);
      await signOut(auth).then(() => {
        setShowSignOutModal(true);
        localStorage?.removeItem("isApiKeyRecieved");
        localStorage?.removeItem("isLoggedIn");
      });
    } catch (err) {
      console.error("Login Failed", err);
    }
  }, [setShowSignOutModal, user]);

  return (
    <div className="fixed top-0 right-0 flex justify-end pt-6 pr-10 hover:text-gray-500 hover:underline">
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default SignOut;
