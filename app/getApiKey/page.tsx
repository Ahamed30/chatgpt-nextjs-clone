"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/Auth";
import NotValidApiKeyModal from "@/components/NotValidApiKeyModal";
import SignOut from "@/components/SignOut";
import SignOutModal from "@/components/SignOutModal";
import { IUser } from "@/types/User";
import GetApiForm from "@/components/GetApiForm";

const GetApiKey = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext) as IUser;
  const [showModal, setShowModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !showSignOutModal) {
      router?.push("/auth/login");
    }
  }, [isLoggedIn, router, showSignOutModal]);

  return (
    <>
      <SignOut setShowSignOutModal={setShowSignOutModal} />
      <GetApiForm setShowModal={setShowModal} />
      <NotValidApiKeyModal isVisible={showModal} setShowModal={setShowModal} />
      <SignOutModal isVisible={showSignOutModal} />
    </>
  );
};

export default GetApiKey;
