import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    } 

    return {
      initData,
      dbData
    };
  } catch (error) {
    // Если ошибка или приложение не в Telegram, возвращаем фейковые данные
    return {
      initData: {
        user: {
          id: 1277009903
        }
      },
      initDataRaw: null,
      photoUrl: null,
    };
  }
};