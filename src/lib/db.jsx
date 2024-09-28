import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const options = {};

// Объявляем глобальные переменные для подключения к MongoDB
let mongoClient;
let database;

// Если переменные уже объявлены глобально (только в разработке), используем их
if (!process.env.MONGO_URL) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
  try {
    // Если клиент и база данных уже инициализированы, возвращаем их
    if (mongoClient && database) {
      return { mongoClient, database };
    }

    // Используем глобальный клиент в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClient) {
        mongoClient = new MongoClient(uri, options);
        global._mongoClient = await mongoClient.connect(); // Подключаем и сохраняем в глобальной области
      }
      mongoClient = global._mongoClient;
    } else {
      // В продакшене просто создаем и подключаем клиента
      mongoClient = new MongoClient(uri, options);
      await mongoClient.connect();
    }

    database = mongoClient.db('test'); // Получаем базу данных

    return { mongoClient, database };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to connect to database');
  }
}
