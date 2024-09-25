"use client";

import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import useUserStore from "@/src/Store/userStore";
import { getUserData } from "@/src/utils/getUserData";
import { useEffect } from "react";
import { postEvent, onEvent } from "@telegram-apps/sdk";

export default function Layout({ children }) {
  const { isLoading, setUser, userData } = useUserStore();

  useEffect(() => {
    function closeAppWithRequest() {
      if (userData && userData.user) {
        const points = userData.user.points;

        // Отправка запроса на сервер перед закрытием
        fetch("https://your-api-url.com/close-app", {
          method: "POST",
          body: JSON.stringify({ points }), // Правильный формат данных
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Request successful", data);

            // После завершения запроса, вызываем web_app_close
            postEvent("web_app_close", {
              return_back: true, // Опционально
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }

    // Использование SDK для перехвата закрытия приложения
    onEvent("web_app_close", closeAppWithRequest);

    // Очистка при размонтировании компонента
    return () => {
      onEvent("web_app_close", null);
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
