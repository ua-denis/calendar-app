<script setup lang="ts">
import {useCalendarStore} from '@/stores/calendarStore.ts';
import {storeToRefs} from 'pinia';
import {ref} from 'vue';
import CalendarHeader from '@/components/CalendarHeader.vue';
import CalendarNavigation from '@/components/CalendarNavigation.vue';
import CalendarGrid from '@/components/CalendarGrid.vue';
import YearSelector from '@/components/YearSelector.vue';
import MonthSelector from '@/components/MonthSelector.vue';

const calendarStore = useCalendarStore();
const {selectedDate, currentMonth, currentYear} = storeToRefs(calendarStore);

const isYearModalOpen = ref(false);
const isMonthModalOpen = ref(false);

const handleDateSelection = (date: Date) =>
{
    calendarStore.setSelectedDate(date);
};

const handleMonthUpdate = (month: number) =>
{
    calendarStore.setMonth(month);
    isMonthModalOpen.value = false;
};

const handleYearUpdate = (year: number) =>
{
    calendarStore.setYear(year);
    isYearModalOpen.value = false;
};
</script>

<template>
    <div class="calendar-view">
        <CalendarHeader :selectedDate="selectedDate"/>
        <CalendarNavigation
            :currentMonth="currentMonth"
            :currentYear="currentYear"
            @update:month="handleMonthUpdate"
            @update:year="handleYearUpdate"
            @openYearModal="isYearModalOpen = true"
            @openMonthModal="isMonthModalOpen = true"
        />
        <CalendarGrid
            :currentMonth="currentMonth"
            :currentYear="currentYear"
            :selectedDate="selectedDate"
            @update:selectedDate="handleDateSelection"
        />
        <YearSelector
            :currentYear="currentYear"
            :isOpen="isYearModalOpen"
            @update:year="handleYearUpdate"
            @close="isYearModalOpen = false"
        />
        <MonthSelector
            :currentMonth="currentMonth"
            :isOpen="isMonthModalOpen"
            @update:month="handleMonthUpdate"
            @close="isMonthModalOpen = false"
        />
    </div>
</template>

<style scoped>
.calendar-view {
    @apply max-w-sm mx-auto bg-white rounded-lg shadow-lg p-4 sm:max-w-md md:max-w-lg lg:max-w-xl;
}
</style>