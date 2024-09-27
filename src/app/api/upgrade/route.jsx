import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/db'; // подключение к MongoDB клиенту

export async function POST(req) {
  try {
    // Получаем данные из тела запроса
    const { name, image, description, price } = await req.json();
    
    // Проверяем наличие всех необходимых полей
    if (!name || !image || !description || !price) {
      return NextResponse.json({ error: 'Все поля (name, image, description, price) обязательны' }, { status: 400 });
    }

    // Подключаемся к базе данных
    const { database } = await connectToDatabase();

    // Создаём объект улучшения
    const newUpgrade = {
      name,           // Название улучшения
      image,          // URL изображения улучшения
      description,    // Описание улучшения
      price,          // Цена улучшения
      createdAt: new Date(),  // Дата создания
    };

    // Сохраняем улучшение в базе данных
    const result = await database.collection('upgrades').insertOne(newUpgrade);

    // Возвращаем успешный ответ с данными о созданном улучшении
    return NextResponse.json({ upgrade: result});

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Ошибка при создании улучшения' }, { status: 500 });
  }
}
