"use client";

import Image from 'next/image';
import styles from './page.module.css';
import abbreviateNumber from '@/src/utils/abbreviateNumber';
import useUserStore from '@/src/Store/userStore';
import LeaderboardUserCard from '@/src/Components/ui/LeaderboardUserCard/LeaderboardUserCard';
import useSWR from 'swr';

// Функция для получения данных
const fetcher = async (url) => {
  console.log("Fetching data from", url); // Добавляем лог
  const res = await fetch(url);
  return res.json();
};

const Leaderboard = () => {
  const { userData, photoUrl } = useUserStore();

  // Используем SWR для получения данных. Данные обновляются только при заходе на страницу
  const { data, error, isLoading } = useSWR("/api/user/getall", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leaderboard.</div>;

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
          /> 
        )}

        <div className={styles.userLeaderboard}>
          <Image src={'/paskocoin.png'} width={35} height={35} alt="Coins Icon" />
          <p>
            {abbreviateNumber(userData ? userData.user.maxPoints : 1).value}
            {abbreviateNumber(userData ? userData.user.maxPoints : 1).suffix}
          </p>
        </div>

        <p>#1</p> {/* Display current user's position */}
      </div>

      <div className={styles.leaderboard}>
        {data.users.map((user, index) => (
          <div key={user.uid} style={{ width: "100%" }}>
            <LeaderboardUserCard user={user} index={index} />
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
