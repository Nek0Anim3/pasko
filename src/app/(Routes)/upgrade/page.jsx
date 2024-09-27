"use client";

import BackButtonComponent from "@/src/Components/ui/BackButtonComponent/BackButtonComponent";
import { Typography } from "@mui/material";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

const Upgrades = () => {
  const [isTelegramApp, setIsTelegramApp] = useState(true);

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
