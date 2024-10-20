export class DateFactory {
    static createDate(year: number, month: number, day: number = 1): Date
    {
        return new Date(year, month, day);
    }

    static createPaddingDate(year: number, month: number, dayOffset: number): Date
    {
        return new Date(year, month, dayOffset);
    }

    static createTrailingDate(year: number, nextMonth: number, day: number): Date
    {
        return new Date(year, nextMonth, day);
    }
}