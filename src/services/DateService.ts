export class DateService {
    public static readonly DAYS_IN_WEEK = 7;

    static getMonthName(month: number): string
    {
        return new Date(2000, month, 1).toLocaleString('default', {month: 'long'});
    }

    static isLeapYear(year: number): boolean
    {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    static getDaysInMonth(year: number, month: number): number
    {
        return new Date(year, month + 1, 0).getDate();
    }
}