"use client"

import Image from 'next/image';
import styles from './page.module.css';
import useUserStore from '@/src/Store/userStore';
import abbreviateNumber from '@/src/utils/abbreviateNumber';

const Leaderboard = () => {
  // Правильное использование хука useUserStore
  const { userData, photoUrl, isLoading } = useUserStore();

  if(isLoading) return null

  return (
    <div className={styles.leaderboardContainer}>
      <h1>Leaderboard</h1>

      <div className={styles.userLeaderInfo}>
        {photoUrl ? (
          <Image
            src={photoUrl}
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
            alt="User Avatar"
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#ccc',
            }}
          /> // Заглушка для аватара
        )}

        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
          <Image src={'/paskocoin.png'} width={35} height={35} />
          <p>{abbreviateNumber(userData.user.maxPoints).value}{abbreviateNumber(userData.user.maxPoints).suffix}</p>
        </div>
        
        <p>#1</p>
      </div>
      <div className={styles.leaderboard}></div>
    </div>
  );
};

export default Leaderboard;
