export const addDaysToToday = (numDays: number) => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() + numDays);
  return new Date(nyDato);
};
