export const getDaysOff = async (year: number) => {
  const response = await fetch(`https://isdayoff.ru/api/getdata?year=${year}`);
  const result = await response.text();
  return result;
};
