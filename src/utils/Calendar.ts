import {DateService} from '@/services/DateService.ts';
import {DateFactory} from '@/factories/DateFactory.ts';

export class Calendar {
    private static generatePaddingDays(startDay: number, year: number, month: number): Date[]
    {
        return Array.from({length: startDay}, (_, i) =>
            DateFactory.createPaddingDate(year, month, i - startDay + 1)
        );
    }

    private static generateMainMonthDays(year: number, month: number, daysInMonth: number): Date[]
    {
        return Array.from({length: daysInMonth}, (_, i) =>
            DateFactory.createDate(year, month, i + 1)
        );
    }

    private static generateTrailingDays(remainingDays: number, year: number, nextMonth: number): Date[]
    {
        return Array.from({length: remainingDays}, (_, i) =>
            DateFactory.createTrailingDate(year, nextMonth, i + 1)
        );
    }

    static generateMonthDays(year: number, month: number): Date[]
    {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = DateService.getDaysInMonth(year, month);

        const mainMonthDays = this.generateMainMonthDays(year, month, daysInMonth);
        const paddingDays = this.generatePaddingDays(firstDay, year, month);
        const remainingDays = (paddingDays.length + mainMonthDays.length) % DateService.DAYS_IN_WEEK;
        const trailingDays = this.generateTrailingDays(
            DateService.DAYS_IN_WEEK - remainingDays, year, month + 1
        );

        return [...paddingDays, ...mainMonthDays, ...trailingDays];
    }
}