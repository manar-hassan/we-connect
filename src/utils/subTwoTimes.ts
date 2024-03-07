export function subtractTimes(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const differenceMinutes = totalMinutes1 - totalMinutes2;

  const hoursDifference = Math.floor(differenceMinutes / 60);
  const minutesDifference = differenceMinutes % 60;

  const result = `${String(hoursDifference).padStart(2, '0')}:${String(
    minutesDifference
  ).padStart(2, '0')}`;

  return result;
}
