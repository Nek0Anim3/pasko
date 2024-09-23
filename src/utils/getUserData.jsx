import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    }

    // Возвращаем данные пользователя
    return {
      username: initData.user?.username, /*
      first_name: initData.user?.first_name,
      last_name: initData.user?.last_name,*/
    };
  } catch (error) {
    // Если ошибка или приложение не в Telegram, возвращаем фейковые данные
    return {
      username: 'fakeuser',
      first_name: 'Fake',
      last_name: 'User',
    };
  }
};

//гпт нагенерил