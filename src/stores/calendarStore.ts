import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {DateFactory} from '@/factories/DateFactory.ts';
import {ErrorHandler} from '@/services/ErrorHandler.ts';

export const useCalendarStore = defineStore('calendar', () =>
{
    const selectedDate = ref(new Date());
    const currentMonth = computed(() => selectedDate.value.getMonth());
    const currentYear = computed(() => selectedDate.value.getFullYear());

    function updateDate(dateCommand: () => Date | null)
    {
        const newDate = dateCommand();
        if (newDate) {
            selectedDate.value = newDate;
        } else {
            ErrorHandler.log('Invalid date operation');
        }
    }

    function setSelectedDate(date: Date)
    {
        updateDate(() => (date instanceof Date && !isNaN(date.getTime())) ? date : null);
    }

    function setMonth(month: number)
    {
        updateDate(() => (month >= 0 && month <= 11) ? DateFactory.createDate(currentYear.value, month) : null);
    }

    function setYear(year: number)
    {
        updateDate(() => (year >= 1900 && year <= 2100) ? DateFactory.createDate(year, currentMonth.value) : null);
    }

    function nextMonth()
    {
        updateDate(() => DateFactory.createDate(currentYear.value, currentMonth.value + 1));
    }

    function previousMonth()
    {
        updateDate(() => DateFactory.createDate(currentYear.value, currentMonth.value - 1));
    }

    return {
        selectedDate,
        currentMonth,
        currentYear,
        setSelectedDate,
        setMonth,
        setYear,
        nextMonth,
        previousMonth,
    };
});
