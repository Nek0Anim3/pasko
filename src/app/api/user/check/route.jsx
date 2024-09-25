import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; // подключение к MongoDB клиенту

export async function POST(req) {
  try {
    const { uid } = await req.json();

    const { database } = await connectToDatabase();

    // Подключаемся к базе данных
    console.log("Подключение к базе данных установлено.");

    // Проверяем, есть ли пользователь с таким uid
    let user = await database.collection("users").findOne({ uid });

    if (!user) {
      // Если пользователь не найден, создаем нового пользователя
      const newUser = {
        uid,           // ID аккаунта Telegram
        points: 0,     // Начальные очки
        pointsPerTap: 1,
        income: 0,
        friendsInvited: 0,
        level: 0,
        upgrades: []
      };

      // Сохраняем нового пользователя
      await database.collection("users").insertOne(newUser);

      // Возвращаем успешный ответ
      return NextResponse.json({ user: newUser });
    }

    // Если пользователь найден, возвращаем его данные
    return NextResponse.json({ user });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
