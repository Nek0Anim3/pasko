import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = async () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    } 

    const {user, avatarUrl} = await DbFetch(initData)

    return {
      initData,
      user,
      avatarUrl,
    };
  } catch (error) {
    //Факе юзер
    const fakeUser = {
      id: 1277009903,
      username: "Cenaure"
    }
    
    const initData = {
      user: fakeUser
    }

    const {user, avatarUrl} = await DbFetch(initData)

    return {
      initData,
      user,
      avatarUrl,
    };
  }
};

//Запрос на получение данных пользователя
async function DbFetch(initData) {
  const [dbResponse, avatarResponse] = await Promise.all([
    fetch("api/user/check", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: initData.user.id }),
    }),
    fetch("api/avatar", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: initData.user.id }),
    }),
  ]);

  if (!dbResponse.ok) {
    throw new Error(`Ошибка запроса: ${dbResponse.status}`);
  }

  const { user } = await dbResponse.json();
  const { avatarUrl } = await avatarResponse.json();

  return {user, avatarUrl}
}