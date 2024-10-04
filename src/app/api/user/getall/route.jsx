import { NextResponse } from 'next/server'; // Используем NextResponse
import { connectToDatabase } from '@/src/lib/db'; // Подключение к MongoDB клиенту
import NodeCache from 'node-cache'; // Импортируем node-cache

// Создаем экземпляр кэша с таймаутом жизни кэша (TTL) 60 секунд
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export async function POST() {
  try {
    // Попробуем получить данные из кэша
    const cachedUsers = cache.get('leaderboard');

    if (cachedUsers) {
      console.log(1)
      return NextResponse.json({ users: cachedUsers });
    }

    // Если данных нет в кэше, подключаемся к базе данных
    const { database } = await connectToDatabase();

    // Получаем данные из базы данных
    const users = await database
      .collection('users')
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 }) // Сортируем по количеству очков
      .limit(20) // Ограничиваем список до топ-20 пользователей
      .toArray();

    // Сохраняем данные в кэш на 60 секунд
    cache.set('leaderboard', users);

    // Возвращаем данные пользователям
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
