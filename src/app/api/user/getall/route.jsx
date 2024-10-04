import { NextResponse } from 'next/server'; // Используем NextResponse
import { connectToDatabase } from '@/src/lib/db'; // Подключение к MongoDB клиенту

export async function GET() {
  try {
    // Подключение к базе данных
    const { database } = await connectToDatabase();

    // Получаем данные из базы данных
    const users = await database
      .collection("users")
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 }) // Сортируем по количеству очков
      .limit(20) // Ограничиваем список до топ-20 пользователей
      .toArray();

    // Возвращаем данные пользователям
    return NextResponse.json({ users });

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
