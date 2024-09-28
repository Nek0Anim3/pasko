import { useEffect } from 'react';
import useUserStore from '@/src/Store/userStore';
import CalculateLevel from './Level/Calculate';

const LevelUpdater = () => {
  const { userData, updateUserData } = useUserStore();

  useEffect(() => {
    const progressPercentage = CalculateLevel(userData.user.level, userData.user.maxPoints);

    if (progressPercentage >= 100) {
      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          level: userData.user.level + 1,
          maxPoints: userData.user.maxPoints,  // Сбрасываем очки после обновления уровня
        },
      });

      fetch('/api/user/putUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userData.user.uid,
          level: userData.user.level + 1,
          maxPoints: userData.user.maxPoints,
        }),
      });
    }
  }, [userData.user.maxPoints]);

  return null;
};

export default LevelUpdater;
