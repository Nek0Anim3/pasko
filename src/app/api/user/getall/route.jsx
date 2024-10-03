import { NextResponse } from 'next/server'; // Используем NextResponse
import { connectToDatabase } from '@/src/lib/db'; // Подключение к MongoDB клиенту
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 }); // Кэш на 30 минут

export async function GET() {
  try {
    // Подключение к базе данных
    const { database } = await connectToDatabase();

    // Попробуем получить данные из кэша
    const cachedLeaders = cache.get('leaderboard');
    if (cachedLeaders) {
      return NextResponse.json({ users: cachedLeaders }); // Возвращаем данные из кэша
    }

    // Получаем данные из базы данных
    const users = await database
      .collection("users")
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 }) // Сортируем по количеству очков
      .limit(10) // Ограничиваем список до топ-10 пользователей
      .toArray();

    // Кэшируем результат
    cache.set('leaderboard', users);

    // Возвращаем данные пользователям
    return NextResponse.json({ users });

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
