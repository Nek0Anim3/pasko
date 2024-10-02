import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Конфигурация Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const token = process.env.BOT_TOKEN;
  const { uid } = await req.json();

  // Проверка, существует ли аватар в Cloudinary
  try {
    const existingAvatar = await cloudinary.v2.api.resources_by_ids([`avatars/${uid}`]);
    if (existingAvatar.resources.length > 0) {
      const savedAvatarUrl = existingAvatar.resources[0].secure_url;
      return NextResponse.json({ avatarUrl: savedAvatarUrl });
    }
  } catch (error) {
    console.error('Error checking existing avatar in Cloudinary:', error);
  }

  // Параметры для первого запроса (getUserProfilePhotos)
  const userProfilePhotosOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'User-Agent': 'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user_id: uid, offset: null, limit: 1 }), // запрос 1 фото
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

      // Скачиваем файл
      const avatarResponse = await fetch(fileUrl);
      const avatarBuffer = await avatarResponse.arrayBuffer(); // Получаем данные как ArrayBuffer
      const buffer = Buffer.from(avatarBuffer); // Преобразуем ArrayBuffer в Buffer

      // Загружаем файл в Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload_stream(
        { folder: 'avatars', public_id: uid, overwrite: true },
        (error, result) => {
          if (error) {
            throw new Error('Cloudinary upload failed');
          }
          return result;
        }
      ).end(buffer);

      // Возвращаем URL загруженного аватара
      const savedAvatarUrl = uploadResponse.secure_url;
      return NextResponse.json({ avatarUrl: savedAvatarUrl });
    } else {
      return NextResponse.json({ error: 'No profile photos found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
}
