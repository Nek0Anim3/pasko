import { useEffect } from 'react';
import useUserStore from '@/src/Store/userStore';
import CalculateLevel from './Level/Calculate';

const LevelUpdater = () => {
  const { userData, updateUserData } = useUserStore();

  useEffect(() => {
    if(CalculateLevel(userData.user.level, userData.user.maxPoints) >= 100) {
      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          level: userData.user.level+1,
        },
      });
    }
  }, [userData.user.maxPoints]); // Следим за изменениями userData

  return null; // Этот компонент просто запускает таймер
};

export default LevelUpdater;
