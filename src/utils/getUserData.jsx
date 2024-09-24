import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const getUserData = () => {
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();

    // Проверка, что приложение запущено в Telegram
    if (!initDataRaw) {
      throw new Error('Not in Telegram');
    }

    // Возвращаем данные пользователя, включая аватар
    return {
      initData,
      initDataRaw,
      photoUrl: initData.user?.photo_url || null, // Получаем ссылку на аватар пользователя
    };
  } catch (error) {
    // Если ошибка или приложение не в Telegram, возвращаем фейковые данные
    return {
      initData: null,
      initDataRaw: null,
      photoUrl: null,
    };
  }
};
