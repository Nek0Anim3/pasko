import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
      const fileUrl = `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`;

      // Скачиваем файл и сохраняем его локально (или можно использовать облачное хранилище)
      const avatarResponse = await fetch(fileUrl);
      const avatarBuffer = await avatarResponse.arrayBuffer(); // Получаем данные как ArrayBuffer
      const buffer = Buffer.from(avatarBuffer); // Преобразуем ArrayBuffer в Buffer

      // Путь для сохранения аватара (в данном примере сохраняется локально)
      const avatarPath = path.join(process.cwd(), 'public', 'avatars', `${uid}.jpg`);
      fs.writeFileSync(avatarPath, buffer);

      // URL сохраненного аватара
      const savedAvatarUrl = `${process.env.NEXT_PUBLIC_API_URL}avatars/${uid}.jpg`;

      // Возвращаем URL аватара
      return NextResponse.json({ avatarUrl: savedAvatarUrl });
    } else {
      return NextResponse.json({ error: 'No profile photos found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
}
