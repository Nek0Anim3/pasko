import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = async () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    } 

    const {user, avatarUrl,isNew} = await DbFetch(initData)

    return {
      initData,
      user,
      avatarUrl,
      isNew
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

    const {user, avatarUrl, isNew} = await DbFetch(initData)

    return {
      initData,
      user,
      avatarUrl,
      isNew
    };
  }
};

// Запрос на получение данных пользователя
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

  const { user, new: isNew } = await dbResponse.json(); // Получаем флаг `new`
  const { avatarUrl } = await avatarResponse.json();

  return { user, avatarUrl, isNew };
}
