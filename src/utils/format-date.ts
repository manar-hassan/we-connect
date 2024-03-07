import dayjs from 'dayjs';

export function formatDate(date?: Date, format: string = 'YYYY-MM-DD'): string {
  if (!date) return '';
  return dayjs(date).format(format);
}
