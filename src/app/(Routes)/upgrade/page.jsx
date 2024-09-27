import { Typography } from "@mui/material";
import styles from './page.module.css'

const Upgrades = () => {
    


    return (
      <div className={`upgradeContent ${styles.upgradesPageContainer}`}>
          <Typography variant="h3" component="h1" className={styles.title}>Upgrades</Typography>
      </div>
    );
};

export default Upgrades;
