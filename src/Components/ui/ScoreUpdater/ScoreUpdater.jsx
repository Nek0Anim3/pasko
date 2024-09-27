import { useEffect, useRef } from 'react';
import useUserStore from '@/src/Store/userStore';

const ScoreUpdater = () => {
  const { userData, updateUserData } = useUserStore();
  const pointsRef = useRef(userData.user.points); // Храним очки в рефе

  useEffect(() => {
    // Доход в секунду = доход в час / 3600 секунд
    const incomePerSecond = userData.user.income / 3600;

    const interval = setInterval(() => {
      // Увеличиваем очки на доход в секунду
      pointsRef.current += incomePerSecond;

      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          points: pointsRef.current // Обновляем очки из рефа
        }
      });
    }, 1000); // Обновляем каждую секунду

    // Очищаем таймер при размонтировании компонента
    return () => clearInterval(interval);
  }, [userData.user.income]); // Следим только за изменением дохода

  useEffect(() => {
    pointsRef.current = userData.user.points; // Синхронизируем реф с очками при их изменении
  }, [userData.user.points]);

  return null; // Этот компонент просто запускает таймер
};

export default ScoreUpdater;
