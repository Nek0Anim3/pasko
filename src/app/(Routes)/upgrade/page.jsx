"use client";

import { Typography } from "@mui/material";
import styles from './page.module.css'
import { useEffect } from "react";
import gsap from "gsap";

const Upgrades = () => {

    useEffect(() => {
        gsap.fromTo(".upgradeContent", {y: "100%"}, {y: 0, duration: 0.4, ease: "power4.inOut"})
    }, [])

    return (
      <div className={`upgradeContent ${styles.upgradesPageContainer}`}>
          <Typography variant="h2" component="h1" className={styles.title}>Upgrades</Typography>
      </div>
    );
};

export default Upgrades;
