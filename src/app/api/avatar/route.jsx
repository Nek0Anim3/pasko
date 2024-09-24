import { NextResponse } from 'next/server';

export async function POST(req) {
  const token = process.env.BOT_TOKEN;
  const { uid } = await req.json(); 

  // Параметры для первого запроса (getUserProfilePhotos)
  const userProfilePhotosOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'User-Agent': 'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user_id: uid, offset: null, limit: 1 }),  // запрос 1 фото
  };

  try {
    // Первый запрос на получение фотографий профиля
    const response = await fetch(
      `https://api.telegram.org/bot${token}/getUserProfilePhotos`,
      userProfilePhotosOptions
    );
    const profileData = await response.json();

    // Проверка, что есть хотя бы одно фото
    if (profileData.result.photos && profileData.result.photos.length > 0) {
      // Получаем file_id из первой фотографии
      const file_id = profileData.result.photos[0][0].file_id;

      // Параметры для второго запроса (getFile)
      const fileOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'User-Agent': 'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ file_id }),
      };

      // Второй запрос для получения файла
      const fileResponse = await fetch(
        `https://api.telegram.org/bot${token}/getFile`,
        fileOptions
      );
      const fileData = await fileResponse.json();

      // URL для загрузки аватара
      const avatarUrl = `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`;

      // Возвращаем URL аватара
      return NextResponse.json({ avatarUrl });
    } else {
      return NextResponse.json({ error: 'No profile photos found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
}
