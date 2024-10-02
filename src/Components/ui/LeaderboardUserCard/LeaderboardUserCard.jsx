// components/LeaderboardUserCard.js
import Image from 'next/image';
import abbreviateNumber from '@/src/utils/abbreviateNumber';
import styles from './LeaderboardUserCard.module.css'; // Создай стили, если нужно

const LeaderboardUserCard = ({ user, index }) => {
  return (
    <div className={styles.userLeaderInfo}>
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

      {/*<ScrollingText nick={user.firstName || 'Anonymous'} />*/}

      <div className={styles.userLeaderboard}>
        <Image src={'/paskocoin.png'} width={35} height={35} alt="Coins Icon" />
        <p>
          {abbreviateNumber(user.maxPoints).value}
          {abbreviateNumber(user.maxPoints).suffix}
        </p>
      </div>

      <p>#{index + 1}</p>
    </div>
  );
};

export default LeaderboardUserCard;
