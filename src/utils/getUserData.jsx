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
      initData: initData,
      initDataRaw: initDataRaw
    };
  } catch (error) {
    // Если ошибка или приложение не в Telegram, возвращаем фейковые данные
    return {
      initData: 'nemadata',
    };
  }
};

//гпт нагенерил

//Kostik: Отето ты потужно тут наделал я хуею! Ты молодец дуже великий, я тебе потом как выберемся в холода уже гулять, куплю чёта вкусненькое