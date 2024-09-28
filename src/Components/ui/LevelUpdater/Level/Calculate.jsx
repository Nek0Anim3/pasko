export default function CalculateLevel(currLevel, maxPoints) {
  // Следующий уровень требует (текущий уровень + 1) * 1000 очков
  let nextLevelPoints = (currLevel + 1) * 1000

  if(currLevel > 0) {
    nextLevelPoints *= ((currLevel + currLevel*0.05) * 50)
  }

  if (currLevel >= 10) {
    nextLevelPoints += nextLevelPoints*currLevel*0.05; // Увеличиваем требования для уровней 10+
  }
  
  //на рандом набубенил надеюсь стабильно

  // Рассчитываем прогресс как процент от следующего уровня
  const progressPercentage = Math.floor((maxPoints / nextLevelPoints) * 100);

  return progressPercentage;
}
