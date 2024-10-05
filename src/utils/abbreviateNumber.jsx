export default function abbreviateNumber(number) {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let tier = Math.log10(Math.abs(number)) / 3 | 0;

  if (tier === 0) return { value: number?.toString(), suffix: '' };

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return { value: scaled.toFixed(2), suffix };
}
