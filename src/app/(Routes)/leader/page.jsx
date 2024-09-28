"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import abbreviateNumber from '@/src/utils/abbreviateNumber';
import useUserStore from '@/src/Store/userStore';

const Leaderboard = () => {
  const { isLoading, userData, photoUrl } = useUserStore();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const response = await fetch(`https://paskocoin.vercel.app/api/user/getall`, { cache: 'no-store' });
      const data = await response.json();

      // Ensure leaderboardData is an array
      setLeaderboardData(Array.isArray(data.users) ? data.users : []);
      setLoading(false);
    };

    fetchLeaderboardData();
  }, []);

  // Check if either user data or leaderboard data is still loading
  if (isLoading || loading) return null;

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
          /> // Placeholder for avatar
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
        {leaderboardData.map((user, index) => (
          <div key={user.uid} className={styles.userLeaderInfo}>
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
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
              /> // Placeholder for missing avatars
            )}

            <div className={styles.userLeaderboard}>
              <Image src={'/paskocoin.png'} width={35} height={35} alt="Coins Icon" />
              <p>
                {abbreviateNumber(user.maxPoints).value}
                {abbreviateNumber(user.maxPoints).suffix}
              </p>
            </div>
          
            <p>#{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
