import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;

let mongoClient = null;
let database = null;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
    try {
        // Если клиент и база данных уже инициализированы, возвращаем их
        if (mongoClient && database) {
            return { mongoClient, database };
        }

        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = new MongoClient(uri); // Убираем параметры
                await mongoClient.connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = new MongoClient(uri); // Убираем параметры
            await mongoClient.connect();
        }

        // Убедитесь, что вы используете правильное имя базы данных, а не URL
        database = mongoClient.db(); // Получаем базу данных по умолчанию
        return { mongoClient, database };
    } catch (e) {
        console.error('Database connection error:', e);
        throw e; // Прокидываем ошибку, чтобы обработать ее в вызывающем коде
    }
}
