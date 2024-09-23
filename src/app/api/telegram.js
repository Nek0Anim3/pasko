import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ваш URI для подключения к MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      await sendMessage(chatId, 'Welcome!');

      await client.connect();
      const database = client.db('PaskoCluster'); // Название вашей базы данных
      const users = database.collection('users');
      await users.insertOne({ userId: message.from.id });

      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function sendMessage(chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });
  return response.json();
}
