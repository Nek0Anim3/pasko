import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db';

export async function PUT(req) {
  try {
    // Получаем данные из тела запроса
    const { uid, points, maxPoints, pointsPerTap, income, friendsInvited, level, upgrades } = await req.json();

    // Проверка на обязательные поля
    if (!uid) {
      return NextResponse.json({ error: 'Invalid or missing uid' }, { status: 400 });
    }

    // Подключение к базе данных
    const { database } = await connectToDatabase();

    // Находим пользователя по uid
    const user = await database.collection("users").findOne({ uid });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let updatedUser = { ...user };

    let isLvlCorrect = false;
    let newLvl = user.level + 1;
    let newPointsPerTap = user.pointsPerTap + newLvl*2

   // Логика проверки и обновления уровня
    if (maxPoints !== undefined && level !== undefined) {
      const nextLevelPoints = calculateNextLevelPoints(user.level);
    
      // Проверяем, что текущие очки >= требуемым для следующего уровня
      if (maxPoints >= nextLevelPoints) {
        isLvlCorrect = true;
      }
    }

    // Вычисляем новое количество очков за тап только если уровень корректен
    if (isLvlCorrect) {
      newPointsPerTap = user.pointsPerTap + (user.level + 1) * 2;
    }

    // Обновляем только те поля, которые были переданы
    updatedUser = {
      ...(points !== undefined && { points }),
      ...(maxPoints !== undefined && { maxPoints }),
      ...(isLvlCorrect && { pointsPerTap: newPointsPerTap }), // Здесь проверяем isLvlCorrect
      ...(income !== undefined && { income }),
      ...(isLvlCorrect && { level: user.level + 1 }), // Обновляем уровень, если он корректен
      ...(friendsInvited !== undefined && { friendsInvited }),
      ...(upgrades !== undefined && { upgrades }),
    };

    // Выводим в консоль для отладки
    console.log(updatedUser);

    // Обновляем данные пользователя в базе данных
    const result = await database.collection("users").updateOne(
      { uid }, 
      { $set: updatedUser }
    );

    // Проверяем, обновились ли данные
    if (result.modifiedCount === 0) {
      console.error('User data not updated:', uid);
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// Функция для расчета очков, необходимых для следующего уровня
function calculateNextLevelPoints(currLevel) {
  let nextLevelPoints = (currLevel + 1) * 1000;

  // Увеличиваем сложность уровней 1 и выше
  if (currLevel > 0) {
    nextLevelPoints *= ((currLevel + currLevel * 0.05) * 50);
  }

  // Увеличиваем требования для уровней 10+
  if (currLevel >= 10) {
    nextLevelPoints += nextLevelPoints * currLevel * 0.05;
  }

  return nextLevelPoints;
}
