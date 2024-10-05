import { useEffect } from 'react';
import useUserStore from '@/src/Store/userStore';
import CalculateLevel from './Level/Calculate';

const LevelUpdater = () => {
  const { userData, updateUserData } = useUserStore();

  useEffect(() => {
    const progressPercentage = CalculateLevel(userData.user.level, userData.user.maxPoints);
    
    if (progressPercentage >= 100) {
      // Вычисляем новые значения для уровня и очков за клик
      const newLevel = userData.user.level + 1;
      const newPointsPerTap = userData.user.pointsPerTap + newLevel * 2; // Например, увеличение на 2 за уровень

      // Обновляем данные пользователя в хранилище
      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          level: newLevel,
          pointsPerTap: newPointsPerTap, // Обновляем очки за клик
          maxPoints: userData.user.maxPoints,  // Сбрасываем очки после обновления уровня
        },
      });

      // Отправляем обновленные данные на сервер
      fetch('/api/user/putUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userData.user.uid,
          level: newLevel,
          pointsPerTap: newPointsPerTap, // Обновляем очки за клик на сервере
          maxPoints: userData.user.maxPoints,
        }),
      });
    }
  }, [userData.user.maxPoints]);

  return null;
};

export default LevelUpdater;
