import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; // Подключение к MongoDB клиенту

export async function PUT(req) {
  try {
    const { uid, points, pointsPerTap, income, friendsInvited, level, upgrades } = await req.json();
    //console.log(uid)
    const { database } = await connectToDatabase();

    // Подключаемся к базе данных
    //console.log("Подключение к базе данных установлено.");

    // Находим пользователя по uid
    const user = await database.collection("users").findOne({ uid });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Обновляем данные пользователя
    const updatedUser = {
      ...(points !== undefined && { points }),
      ...(pointsPerTap !== undefined && { pointsPerTap }),
      ...(income !== undefined && { income }),
      ...(friendsInvited !== undefined && { friendsInvited }),
      ...(level !== undefined && { level }),
      ...(upgrades !== undefined && { upgrades })
    };

    await database.collection("users").updateOne(
      { uid }, 
      { $set: updatedUser }
    );

    // Возвращаем обновленные данные пользователя
    const updatedData = await database.collection("users").findOne({ uid });

    return NextResponse.json({ user: updatedData });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
