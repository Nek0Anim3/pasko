import { connectToDatabase } from '@/src/lib/db';
import { NextResponse } from 'next/server';
import { createClient } from 'redis';

const redisClient = createClient({
    password: 'CavTGWPyM7o3G1Az4oQfo8xPxbomdi1H',
    socket: {
        host: 'redis-15628.c326.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 15628
    }
});

redisClient.connect();

export async function POST() {
  try {
    // Попробуем получить данные из кэша
    const cachedData = await redisClient.get('leaderboardData');
    
    // Если данные в кэше существуют, возвращаем их
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // Если данных в кэше нет, подключаемся к базе данных
    const { database } = await connectToDatabase();

    // Получаем данные из базы данных
    const users = await database
      .collection('users')
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 }) // Сортируем по количеству очков
      .limit(20) // Ограничиваем список до топ-20 пользователей
      .toArray();

    // Кэшируем полученные данные на 1 минуту
    await redisClient.setEx('leaderboardData', 60, JSON.stringify({ users }));

    // Возвращаем данные пользователям
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
