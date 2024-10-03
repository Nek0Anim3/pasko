// Пример метода GET для списка пользователей
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; 

export async function GET(req) {
  try {
    const { database } = await connectToDatabase();
    
    if (!database) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Получаем всех пользователей и сортируем по убыванию maxPoints
    const users = await database
      .collection("users")
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 })
      .toArray();

    // Возвращаем результат на клиент
    return NextResponse.json({ users });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
