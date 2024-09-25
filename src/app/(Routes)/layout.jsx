"use client"

import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import useUserStore from "@/src/Store/userStore";
import { getUserData } from "@/src/utils/getUserData";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { isLoading, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();

        // Параллельные запросы
        const [dbResponse, avatarResponse] = await Promise.all([
          fetch("api/user/check", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: data.initData.user.id }),
          }),
          fetch("api/avatar", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: data.initData.user.id }),
          }),
        ]);

        if (!dbResponse.ok) {
          throw new Error(`Ошибка запроса: ${dbResponse.status}`);
        }

        const tgUser = data.initData.user;
        const { user } = await dbResponse.json();
        const { avatarUrl } = await avatarResponse.json();

        // Сохраняем данные в Zustand
        setUser({user, tgUser}, avatarUrl);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  if(isLoading) return <div>Loading</div>

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
