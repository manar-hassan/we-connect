export function addMultipleTimes(times: string[]) {
  let totalHours = 0;
  let totalMinutes = 0;

  times.forEach((time) => {
    const [hours, minutes] = time.split(':').map(Number);

    totalHours += hours;
    totalMinutes += minutes;
  });

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  }

  const resultHours = String(totalHours).padStart(2, '0');
  const resultMinutes = String(totalMinutes).padStart(2, '0');

  return `${resultHours}:${resultMinutes}`;
}
