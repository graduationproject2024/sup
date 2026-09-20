export const START_DATE = new Date('2026-09-21T12:00:00+03:00'); // 12:00 PM Cairo/Riyadh time

export function getUnlockTimeForDay(dayIndex) {
  if (dayIndex < 6) return new Date(0); // Bonus messages are always unlocked
  const unlockTime = new Date(START_DATE.getTime());
  unlockTime.setDate(unlockTime.getDate() + (dayIndex - 6));
  return unlockTime;
}

export function isDayUnlocked(dayIndex) {
  if (dayIndex < 6) return true;
  const now = new Date();
  return now >= getUnlockTimeForDay(dayIndex);
}

export function calculateTimeRemaining(dayIndex) {
  const now = new Date();
  const unlockTime = getUnlockTimeForDay(dayIndex);

  if (now >= unlockTime) return "متاحة الآن!";

  const diff = unlockTime - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / 1000 / 60) % 60);

  let result = [];
  if (days > 0) result.push(`${days} يوم`);
  if (hours > 0) result.push(`${hours} ساعة`);
  if (mins > 0) result.push(`${mins} دقيقة`);

  return result.join(' و ');
}

export function getDaysPassed() {
  const now = new Date();
  if (now < START_DATE) return 0;

  const diffTime = Math.abs(now - START_DATE);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // if diff is 0 days but past 12pm, it means 1 day passed
}
