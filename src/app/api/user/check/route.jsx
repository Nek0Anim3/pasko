import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const connectMongoDb = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Увеличиваем таймаут до 30 секунд
  });
};

export async function POST(req) {
  try {
    const { uid } = await req.json();

    // Подключаемся к базе данных
    await connectMongoDb();
    console.log("Подключение к базе данных установлено.");

    // Проверяем, есть ли пользователь с таким uid
    let user = await User.findOne({ uid });

    if (!user) {
      // Если пользователь не найден, создаем нового
      const newUser = new User({
        uid,           // ID аккаунта Telegram
        points: 0,     // Начальные очки
      });

      // Сохраняем нового пользователя
      await newUser.save();

      // Возвращаем успешный ответ
      return NextResponse.json({ message: 'User created', user: newUser });
    }

    // Если пользователь найден, возвращаем его данные
    return NextResponse.json({ message: 'User exists', user });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
