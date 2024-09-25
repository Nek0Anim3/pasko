"use client"

import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import useUserStore from "@/src/Store/userStore";
import { getUserData } from "@/src/utils/getUserData";
import { useEffect } from "react";
import { postEvent } from '@telegram-apps/sdk';

export default function Layout({ children }) {
  const { isLoading, setUser, userData} = useUserStore();

  useEffect(() => {
    function closeAppWithRequest() {
      if (userData && userData.user) {
        const points = userData.user.points;

        // Send your request to the server before closing
        fetch('api/user/putUser', {
          method: 'PUT',
          body: JSON.stringify({ points }), // Properly format the request payload
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Request successful', data);
          
          // After the request is completed, emit the web_app_close event
          postEvent('web_app_close', {
            return_back: true // Optional, depends on how the app is opened
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }

    // Bind the closeAppWithRequest function to window before unload event
    window.onbeforeunload = closeAppWithRequest;

    // Clean up the event listener on unmount
    return () => {
      window.onbeforeunload = null;
    };
  }, [userData]);

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
