import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN); // Получаем токен из переменной окружения

bot.command('start', (ctx) => {
  ctx.reply('Привет, вот твоя игра!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Запустить Игру', web_app: { url: 'https:/paskocoin.vercel.app' } }],
      ],
    },
  });
});

export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Error handling webhook' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Отключаем bodyParser для работы с raw body
  },
};
