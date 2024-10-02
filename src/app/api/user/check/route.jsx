import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; // подключение к MongoDB клиенту

export async function POST(req) {
  try {
    const { uid, firstName } = await req.json();
    const { database } = await connectToDatabase();

    // Проверяем, есть ли пользователь с таким uid
    let user = await database.collection("users").findOne({ uid });

    const currentTime = new Date();

    if (!user) {
      // Если пользователь не найден, создаем нового пользователя
      const newUser = {
        uid,                    // ID аккаунта Telegram
        firstName: firstName,
        points: 0,              // Начальные очки
        maxPoints: 0,
        pointsPerTap: 1,
        income: 0,              // Часовой доход очков
        friendsInvited: 0,
        level: 0,
        avatarUrl: "",
        upgrades: [],
        lastUpdated: currentTime // Устанавливаем время последнего обновления на текущий момент
      };

      const avatarResponse = await fetch(`${process.env.API_URL}api/avatar`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });
      const avatarData = await avatarResponse.json();
      newUser.avatarUrl = avatarData.avatarUrl;      

      // Сохраняем нового пользователя
      await database.collection("users").insertOne(newUser);
      await database.collection("users").createIndex({ uid: uid }, { unique: true });

      // Возвращаем успешный ответ
      return NextResponse.json({ user: newUser, new: true });
    } 

    // Если пользователь найден, вычисляем сколько времени прошло с последнего обновления
    const lastUpdated = new Date(user.lastUpdated);
    const timeDifference = currentTime - lastUpdated; // разница в миллисекундах
    const hoursPassed = (timeDifference / (1000 * 60 * 60)); // переводим в часы

    const additionalPoints = hoursPassed * user.income;
    user.points += additionalPoints;
    user.maxPoints += additionalPoints;
    user.lastUpdated = currentTime;

    // Обновляем данные пользователя в базе
    await database.collection("users").updateOne(
      { uid },
      { $set: { points: user.points, maxPoints: user.maxPoints, lastUpdated: currentTime } }
    );
    
    // Возвращаем обновлённые данные пользователя
    return NextResponse.json({ user, new: false });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
