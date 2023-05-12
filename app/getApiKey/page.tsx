"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotValidApiKeyModal from "@/components/NotValidApiKeyModal";
import SignOut from "@/components/SignOut";
import SignOutModal from "@/components/SignOutModal";
import GetApiForm from "@/components/GetApiForm";

const GetApiKey = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage?.getItem("isLoggedIn");
    if (!isLoggedIn && !showSignOutModal) {
      router?.replace("/auth/login");
    }
  }, [router, showSignOutModal]);

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
