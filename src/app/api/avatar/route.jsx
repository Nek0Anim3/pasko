export async function POST(req, res) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user_id: 1277009903, offset: 0, limit: 1 }),
  };

  try {
    const response = await fetch('https://api.telegram.org/7987999829:AAHy4J8q7zDY4WdMN3H3xVIwyvJ3m9qSTS4/getUserProfilePhotos', options);
    
    const text = await response.text(); // Отримай текст відповіді
    
    try {
      const data = JSON.parse(text); // Спробуй розпарсити текст у JSON
      return res.status(200).json(data);
    } catch (jsonError) {
      console.error("Помилка парсингу JSON:", jsonError, text); // Логуй помилку та відповідь
      return res.status(500).json({ error: 'Invalid JSON response from API', details: text });
    }
    
  } catch (error) {
    console.error("Помилка запиту:", error);
    return res.status(500).json({ error: 'Failed to fetch user profile photos' });
  }
}
