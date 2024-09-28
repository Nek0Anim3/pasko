import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; // подключение к MongoDB клиенту

export async function GET(req) {
  try {
    const { database } = await connectToDatabase();

    // Получаем всех пользователей и сортируем по убыванию maxPoints
    const users = await database
      .collection("users")
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } }) // выбираем только нужные поля
      .sort({ maxPoints: -1 }) // сортируем по убыванию maxPoints
      .toArray();

    // Добавляем порядковый номер каждому пользователю
    const sortedUsers = users.map((user, index) => ({
      rank: index + 1,
      uid: user.uid,
      firstName: user.firstName,
      avatarUrl: user.avatarUrl, // Исправлено: используйте user.avatarUrl
      maxPoints: user.maxPoints
    }));

    // Возвращаем результат на клиент
    return NextResponse.json({ users: sortedUsers });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
