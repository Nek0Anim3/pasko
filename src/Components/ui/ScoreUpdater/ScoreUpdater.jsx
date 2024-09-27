import { useEffect, useRef } from 'react';
import useUserStore from '@/src/Store/userStore';

const ScoreUpdater = () => {
  const { userData, updateUserData } = useUserStore();
  const pointsRef = useRef(userData.user.points);
  const maxPointsRef = useRef(userData.user.maxPoints);

  useEffect(() => {
    const incomePerSecond = userData.user.income / 3600;

    // Синхронизируем рефы с пользовательскими данными
    pointsRef.current = userData.user.points;
    maxPointsRef.current = userData.user.maxPoints;

    const interval = setInterval(() => {
      pointsRef.current += incomePerSecond;
      maxPointsRef.current += incomePerSecond;

      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          points: pointsRef.current,
          maxPoints: maxPointsRef.current,
        },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userData]); // Следим за изменениями userData

  return null; // Этот компонент просто запускает таймер
};

export default ScoreUpdater;
