import { createDate } from "./createDate"

export const formatDate = (date: Date, format: string) => {
  const d = createDate({ date })

  return format
    .replace(/\bYYYY\b/, d.yearShort.toString())
    .replace(/\bMM\b/, d.monthShort)
}