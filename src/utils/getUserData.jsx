import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useState, useEffect } from 'react';

export const getUserData = () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    }

    // Возвращаем данные пользователя, включая аватар
    return {
      initData: initData,
      photoUrl: initData.user?.photo_url || null, // Получаем ссылку на аватар пользователя
      username: initData.user?.username || 'Guest', // Получаем имя пользователя
    };
  } catch (error) {
    // Если ошибка или приложение не в Telegram, возвращаем фейковые данные
    return {
      initData: 'nemadata',
      username: 'Guest',
      photoUrl: '/potuzhno.png',
    };
  }
};

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: 'Guest',
    photoUrl: null,
  });

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      {userData.photoUrl ? (
        <img src={userData.photoUrl} alt="User Avatar" width={100} height={100} />
      ) : (
        <p>No avatar available</p>
      )}
    </div>
  );
};

export default UserProfile;
