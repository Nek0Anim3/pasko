"use client";

import BackButtonComponent from "@/src/Components/ui/BackButtonComponent/BackButtonComponent";
import { Typography } from "@mui/material";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

const Upgrades = () => {
  const [isTelegramApp, setIsTelegramApp] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      setIsTelegramApp(true);
    } else {
      console.warn("App is running outside of Telegram.");
    }
  }, []);

  return (
    <>
      {isTelegramApp ? (
        <SDKProvider acceptCustomStyles debug>
          <Typography variant="h3" component="p">Coming soon!</Typography>
          <BackButtonComponent />
        </SDKProvider>
      ) : (
        <Typography variant="h5" component="p">
          Coming soon!
        </Typography>
      )}
    </>
  );
};

export default Upgrades;
