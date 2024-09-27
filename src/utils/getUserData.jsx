import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = async () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    } 


    console.lot(initDataRaw)
    return await DbFetch(initData);
  } catch (error) {
    // Возвращаем фейковые данные
    const fakeUser = {
      id: 1277009903,
      firstName: "Cenaure"
    };

    const initData = {
      user: fakeUser
    };

    return await DbFetch(initData); // Используем DbFetch один раз
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
      body: JSON.stringify({ uid: initData.user.id, firstName: initData.user.firstName }),
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

  return { initData, user, avatarUrl, isNew };
}
