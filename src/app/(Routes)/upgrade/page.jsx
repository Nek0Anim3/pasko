'use client'

import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UpgradeCard from '@/src/Components/ui/UpgradeCard/UpgradeCard';
import styles from './page.module.css'
import Grid from '@mui/material/Grid2';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Upgrades = () => {
    
  const [value, setValue] = useState(0);
  const [upgrades, setUpgrades] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Берём обновления с БД
    const fetchUpgrades = async () => {
      let res = await fetch('/api/upgrade/getall', { method: 'POST' });
      let result = await res.json();
      console.log(result)
      // Фильтруем улучшения по категории 1
      const filteredUpgrades = result.upgrades.filter(upgrade => upgrade.category === 1);
      setUpgrades(filteredUpgrades);
    };

    fetchUpgrades();
  }, []);


  return (
    <div className={`upgradeContent ${styles.upgradesPageContainer}`}>

      <p className="upgradePageHeader">
        Pasko Anatoliy
      </p>

      <h1 className={styles.title}>Upgrades</h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#202020'}} className={styles.itemBox}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="ОСНОВНЫЕ" {...a11yProps(0)} className={styles.itemlabels}/>
            <Tab label="КУРСЫ" {...a11yProps(1)} className={styles.itemlabels}/>
            <Tab label="КАБИНЕТ" {...a11yProps(2)} className={styles.itemlabels}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} className={styles.tabOne}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }} paddingBottom={6} className={styles.grid} >
            {upgrades.length > 0 ? (
              upgrades.map((upgrade, index) => (
                <Grid key={index} size={6}>
                  <UpgradeCard img={upgrade.image} title={upgrade.name} desc={upgrade.description} />
                </Grid>
              ))
            ) : (
              <p>No upgrades available</p>
            )}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      

    </div>
  );
};

export default Upgrades;
