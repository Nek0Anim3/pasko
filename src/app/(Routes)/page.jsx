'use client';

import useUserStore from "@/src/Store/userStore";
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import abbreviateNumber from "@/src/utils/abbreviateNumber";
import useLoadingStore from "@/src/Store/loadingStore";
import gsap from "gsap";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import LevelUpdater from "@/src/Components/ui/LevelUpdater/LevelUpdater";
import CalculateLevel from "@/src/Components/ui/LevelUpdater/Level/Calculate";
import PaskoCoinButton from "@/src/Components/ui/PaskoCoinButton/PaskoCoinButton";

export default function Farm() {

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#2b2727',
      ...theme.applyStyles('dark', {
        backgroundColor: '#2b2727',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#fff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#fff',
      }),
    },
  }));

  const { userData, isLoading } = useUserStore(); // состояние и метод для обновления состояния

  if(isLoading) return <></>

  return  (
    <>
      <div className={`coin ${styles.clickerContent}`}>
        <div className={styles.clickerContaienr}>
          <div className={styles.lvlContainer}>
            <div className={styles.lvltext}>
              <div className={styles.lvl}>LVL {userData.user.level}</div>
              <div className={styles.lvl}>{CalculateLevel(userData.user.level, userData.user.maxPoints)}%</div>
            </div>
            <BorderLinearProgress variant="determinate" value={CalculateLevel(userData.user.level, userData.user.maxPoints)} />
            <div className={styles.actualPoints}>{abbreviateNumber(userData.user.points).value}{abbreviateNumber(userData.user.points).suffix}</div>
          </div>

          <PaskoCoinButton />
        </div>
      </div>

      <LevelUpdater />
    </>
  )
}