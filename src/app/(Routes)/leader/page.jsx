"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import abbreviateNumber from '@/src/utils/abbreviateNumber';
import useUserStore from '@/src/Store/userStore';
import LeaderboardUserCard from '@/src/Components/ui/LeaderboardUserCard/LeaderboardUserCard';

const Leaderboard = () => {
  const { userData, photoUrl } = useUserStore();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для получения данных раз в 10 секунд
  const fetchData = async () => {
    try {
      const response = await fetch("/api/user/getall", { method: "POST" });
      if (!response.ok) throw new Error("Error fetching leaderboard data.");
      const result = await response.json(); // Преобразуем ответ в JSON
      setData(result);
      setError(null);
    } catch (err) {
      setError("Error loading leaderboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Загружаем данные при загрузке компонента
    const interval = setInterval(() => {
      fetchData(); // Обновляем данные каждые 10 секунд
    }, 60000);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

        
      </div>

      <div className={styles.leaderboard}>
        {data?.users?.length > 0 ? (
          data.users.map((user, index) => (
            <div key={user.uid} style={{ width: "100%", display: 'flex', alignItems: "center", flexDirection: 'column' }}>
              <LeaderboardUserCard user={user} index={index} />
              <div className={styles.divider}></div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
