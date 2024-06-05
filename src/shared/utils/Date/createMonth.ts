import { createDate } from "./createDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface CreateMonthParams {
  date?: Date
  locale?: string
}

export const createMonth = (params: CreateMonthParams) => {
  const locale = params?.locale ?? 'en-us'
  const date = params?.date ?? new Date();

  const { month: monthName, year, monthNumber, monthIndex } = createDate({ date, locale })

  const getDay = (dayNumber: number) =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale })

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1)
    }
    return days
  }

  return {
    monthName,
    monthIndex,
    monthNumber,
    year,
    getDay,
    createMonthDays
  }
}