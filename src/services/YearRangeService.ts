export class YearRangeService {
    static generateYearRange(centerYear: number, range: number): number[]
    {
        const startYear = centerYear - Math.floor(range / 2);
        return Array.from({length: range}, (_, i) => startYear + i);
    }
}