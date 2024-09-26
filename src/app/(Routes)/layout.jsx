"use client";

import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import useUserStore from "@/src/Store/userStore";
import { getUserData } from "@/src/utils/getUserData";
import { useEffect } from "react";
import { postEvent } from "@telegram-apps/sdk";

export default function Layout({ children }) {
  const { isLoading, setUser } = useUserStore();

  /*
  fetch("api/user/putUser", {
    method: "POST",
    body: JSON.stringify({ uid: userData.user.uid , points }), // Корректный формат данных
    headers: {
      "Content-Type": "application/json",
    },
  })
  */

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData();
      if (data) {
        const { initData, user, avatarUrl } = data;
        setUser({ user, tgUser: initData.user }, avatarUrl);
      }
    };

    fetchUser();
  }, [setUser]);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </>
  );
}
