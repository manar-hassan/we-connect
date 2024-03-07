export function getDatesInRange(startDate: Date, endDate: Date = new Date()) {
  const date = new Date(startDate);
  date.setDate(date.getDate());
  const dates = [];
  while (date <= endDate) {
    /*     const dayNumber = date.getDate();
    const month = date.getMonth() + 1;
    const dayNAme = date.toLocaleString('en-US', { weekday: 'short' }); */
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
