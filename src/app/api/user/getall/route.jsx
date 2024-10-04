import { NextResponse } from 'next/server'; // Используем NextResponse
import { connectToDatabase } from '@/src/lib/db'; // Подключение к MongoDB клиенту
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 }); // Кэш на 30 минут

export async function GET() {
  try {
    const { database } = await connectToDatabase();
    
    // Headers to avoid CDN/browser cache
    const headers = {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
      'Content-Type': 'application/json',
    };

    const cachedLeaders = null;
    if (cachedLeaders) {
      return NextResponse.json({ users: cachedLeaders }, { headers });
    }

    const users = await database
      .collection("users")
      .find({}, { projection: { uid: 1, firstName: 1, maxPoints: 1, avatarUrl: 1 } })
      .sort({ maxPoints: -1 })
      .limit(10)
      .toArray();

    cache.set('leaderboard', users);

    return NextResponse.json({ users }, { headers });

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}

