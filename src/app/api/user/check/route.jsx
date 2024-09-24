import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db';

export async function POST(req) {
  try {
    const { uid } = await req.json();
    
    // Подключаемся к базе данных
    const { db } = await connectToDatabase();
    
    // Проверяем, есть ли пользователь с таким uid
    let user = await db.collection('users').findOne({ uid });

    if (!user) {
      // Если пользователь не найден, создаем нового
      const newUser = {
        uid,           // ID аккаунта Telegram
        points: 0,     // Начальные очки
      };

      // Вставляем нового пользователя в коллекцию
      await db.collection('users').insertOne(newUser);

      // Возвращаем успешный ответ
      return NextResponse.json({ message: 'User created', user: newUser });
    }

    // Если пользователь найден, возвращаем его данные
    return NextResponse.json({ message: 'User exists', user });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
