export function getTodayDate(): string {
  const now = new Date();
  // 轉換到 UTC+8
  const taiwanOffset = 8 * 60 * 60 * 1000;
  const localDate = new Date(now.getTime() + taiwanOffset);
  return localDate.toISOString().slice(0, 10); // 取 yyyy-MM-dd
}
