"use client"

import Image from 'next/image';
import styles from './page.module.css';
import abbreviateNumber from '@/src/utils/abbreviateNumber';
import useUserStore from '@/src/Store/userStore';
import LeaderboardUserCard from '@/src/Components/ui/LeaderboardUserCard/LeaderboardUserCard';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

const Leaderboard = () => {
  const { userData, photoUrl } = useUserStore.getState();

  // Используем SWR для получения данных с автоматическим обновлением
  const { data, error, isLoading, mutate } = useSWR("/api/user/getall", fetcher, {
    refreshInterval: 10000, // Автоматическое обновление каждые 10 секунд
    revalidateOnFocus: true, // Перезагрузка при возвращении на вкладку
    dedupingInterval: 5000, // Интервал между запросами
    revalidateIfStale: true, // Перезапрос данных, даже если страница предварительно отрендерена
    revalidateOnMount: true, // Перезапрос данных при загрузке страницы на клиенте
  });
  

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
