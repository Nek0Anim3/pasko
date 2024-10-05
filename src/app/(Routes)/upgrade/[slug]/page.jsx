'use client'

import UpgradeCard from '@/src/Components/ui/UpgradeCard/UpgradeCard';
import styles from './page.module.css';
import Grid from '@mui/material/Grid2';
import useUpgradesStore from '@/src/Store/upgradesStore';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Upgrades = () => {
  const {upgrades, isLoading} = useUpgradesStore()
  const [data, setData] = useState([])
  const pathname = usePathname()

  useEffect(() => {
    let category;
      
    // Определяем категорию в зависимости от маршрута
    if (pathname === '/upgrade/courses') {
      category = 2; // Например, для курсов
    } else if (pathname === '/upgrade/office') {
      category = 3; // Например, для офиса
    } else {
      category = 1; // По умолчанию, главная страница
    }

    const filteredUpgrades = upgrades?.filter(upgrade => upgrade.category === category);

    setData(filteredUpgrades)
  }, [upgrades, pathname])

  if(isLoading) return null

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }} paddingBottom={6} className={styles.grid}>
      {data?.length > 0 ? (
        data.map((upgrade, index) => (
          <Grid key={index} size={6}>
            <UpgradeCard img={upgrade.image} title={upgrade.name} desc={upgrade.description} />
          </Grid>
        ))
      ) : (
        <p>No upgrades available</p>
      )}
    </Grid>
  );
};

export default Upgrades;
