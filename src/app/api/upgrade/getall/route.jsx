import { connectToDatabase } from '@/src/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Подключаемся к базе данных
    const { database } = await connectToDatabase();

    // Получаем данные из базы данных, сортируем по категориям (по возрастанию) и количеству очков
    const upgrades = await database
      .collection('upgrades')
      .find()
      .sort({ category: 1 }) // Сортируем по категориям по возрастанию и по количеству очков по убыванию
      .toArray();

    // Возвращаем данные пользователям
    return NextResponse.json({ upgrades });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
