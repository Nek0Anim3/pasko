// Layout.js

"use client";

import Link from 'next/link';
import styles from './layout.module.css'
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import useUpgradesStore from '@/src/Store/upgradesStore';
import Image from 'next/image';
import useUserStore from '@/src/Store/userStore';
import abbreviateNumber from '@/src/utils/abbreviateNumber';

export default function Layout({ children }) {

  const pathname = usePathname();
  const {setUpgrades, upgrades} = useUpgradesStore()
  const {userData} = useUserStore()

  useEffect(() => {
    if(upgrades) return
    // Берём обновления с БД
    const fetchUpgrades = async () => {
      let res = await fetch('/api/upgrade/getall', { method: 'POST' });
      let result = await res.json();

      // Фильтруем улучшения по категории
      
      setUpgrades(result.upgrades);
    };

    fetchUpgrades();
  }, [pathname]);

  return (
    <div className={`upgradeContent ${styles.upgradesPageContainer}`}>
      <p className="upgradePageHeader">Pasko Anatoliy</p>
      <h1 className={styles.title}>Upgrades</h1>

      <div className={styles.userMoney}>
        <Image 
          src="/paskocoin.svg" 
          alt="PaskoCoin" 
          width={200} 
          height={200}
          className={styles.coinImage} 
        />
        <p>{abbreviateNumber(userData?.user?.points).value} {abbreviateNumber(userData?.user?.points).suffix}</p>
      </div>


      <div style={{ width: '100%' }}>
        <div className={styles.itemBox}>
          <nav className={styles.navigation}>
            <Link href="/upgrade/main" className={`${(pathname == "/upgrade/main" && styles.active)} ${styles.upgrLink}`}>Main</Link>
            <Link href="/upgrade/courses" className={`${(pathname == "/upgrade/courses" && styles.active)} ${styles.upgrLink}`}>Courses</Link>
            <Link href="/upgrade/office" className={`${(pathname == "/upgrade/office" && styles.active)} ${styles.upgrLink}`}>Office</Link>
          </nav>
        </div>

        {children}
      </div>
    </div>
  );
}
