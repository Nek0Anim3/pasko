"use client";

import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import useUserStore from "@/src/Store/userStore";
import { getUserData } from "@/src/utils/getUserData";
import { useEffect } from "react";
import { postEvent } from '@telegram-apps/sdk';

export default function Layout({ children }) {
  const { isLoading, setUser, userData } = useUserStore();

  useEffect(() => {
    const closeAppWithRequest = async () => {
      if (userData && userData.user) {
        const points = userData.user.points;

        try {
          const response = await fetch('api/user/putUser', {
            method: 'PUT',
            body: JSON.stringify({ points }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const data = await response.json();
          console.log('Request successful', data);

          postEvent('web_app_close', {
            return_back: true
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    window.addEventListener('beforeunload', closeAppWithRequest);

    return () => {
      window.removeEventListener('beforeunload', closeAppWithRequest);
    };
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();

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

        setUser({ user, tgUser }, avatarUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
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
