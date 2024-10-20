<script setup lang="ts">
import {computed, nextTick, onMounted, ref, VNodeRef, watch} from 'vue';
import {Calendar} from '@/utils/Calendar.ts';
import {DateUtils} from '@/utils/DateUtils.ts';

const props = defineProps<{
    currentMonth: number;
    currentYear: number;
    selectedDate: Date;
    minDate?: Date;
    maxDate?: Date;
}>();

const emit = defineEmits<{
    (e: 'update:selectedDate', date: Date): void;
}>();

const focusableElement = ref<VNodeRef | undefined>(undefined);

const keyActions: Record<string, () => Date> = {
    ArrowRight: () => updateDateByDays(1),
    ArrowLeft: () => updateDateByDays(-1),
    ArrowUp: () => updateDateByDays(-7),
    ArrowDown: () => updateDateByDays(7),
    Home: () => resetDateToStart(),
    End: () => moveToMonthEnd(),
};

const handleKeyDown = (event: KeyboardEvent) =>
{
    const key = event.key;

    if (keyActions[key] && !isDisabled(keyActions[key]())) {
        const newDate = keyActions[key]();
        emit('update:selectedDate', newDate);
        event.preventDefault();
    }
};

const updateDateByDays = (days: number): Date =>
{
    const newDate = new Date(props.selectedDate);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

const resetDateToStart = (): Date =>
{
    return new Date(props.selectedDate.setDate(1));
};

const moveToMonthEnd = (): Date =>
{
    const newDate = new Date(props.selectedDate);
    newDate.setMonth(newDate.getMonth() + 1, 0);
    return newDate;
};

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarDays = computed(() => Calendar.generateMonthDays(props.currentYear, props.currentMonth));

const isDisabled = (date: Date): boolean =>
{
    return Boolean((props.minDate && date < props.minDate) ||
        (props.maxDate && date > props.maxDate));
};

const handleDateClick = (date: Date) =>
{
    if (!isDisabled(date)) {
        emit('update:selectedDate', new Date(date));
    }
};

watch(() => props.selectedDate, () =>
{
    nextTick(() =>
    {
        if (focusableElement.value) {
            focusableElement.value.focus();
        }
    });
});

onMounted(() =>
{
    if (focusableElement.value) {
        focusableElement.value.focus();
    }
});
</script>

<template>
    <div class="calendar-grid" @keydown="handleKeyDown">
        <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="days" role="grid">
            <div
                v-for="(date) in calendarDays"
                :key="date.toISOString()"
                class="day"
                :class="{
                    'current-month-day': DateUtils.isSameMonth(date, currentMonth),
                    'selected': DateUtils.isSameDate(date, selectedDate),
                    'today': DateUtils.isToday(date),
                    'disabled': isDisabled(date)
                }"
                :tabindex="DateUtils.isSameMonth(date, currentMonth) && !isDisabled(date) ? 0 : -1"
                role="gridcell"
                :aria-selected="DateUtils.isSameDate(date, selectedDate)"
                :aria-disabled="isDisabled(date)"
                @click="handleDateClick(date)"
                @keydown.enter="handleDateClick(date); $event.preventDefault()"
                @keydown.space="handleDateClick(date); $event.preventDefault()"
                :ref="DateUtils.isSameDate(date, selectedDate) ? focusableElement : undefined"
            >
                {{ date.getDate() }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.calendar-grid {
    @apply mt-4;
}

.weekdays {
    @apply grid grid-cols-7 mb-2;
}

.weekday {
    @apply text-center font-bold text-sm lg:text-lg sm:text-base xs:text-sm;
}

.days {
    @apply grid grid-cols-7 gap-1;
}

.day {
    @apply h-8 sm:h-10 md:h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out text-sm sm:text-base text-gray-400 font-bold;
}

.day:hover {
    @apply bg-cyan-200;
}

.day:not(.current-month-day):hover {
    @apply bg-gray-200;
}

.day.selected:hover {
    @apply bg-cyan-400 text-white shadow-xl;
}

.current-month-day {
    @apply text-gray-700;
}

.selected {
    @apply bg-cyan-500 text-white;
}

.today {
    @apply border-2 border-cyan-500;
}

.disabled {
    @apply opacity-50 cursor-not-allowed;
}

.disabled:hover {
    @apply bg-transparent;
}

.day:focus {
    @apply outline-none;
}
</style>