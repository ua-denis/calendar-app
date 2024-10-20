export const DateUtils = {
    isSameDate: (date1: Date, date2: Date) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear(),

    isSameMonth: (date: Date, currentMonth: number) => date.getMonth() === currentMonth,

    isToday: (date: Date) => DateUtils.isSameDate(date, new Date()),
};