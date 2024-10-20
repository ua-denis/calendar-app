<script setup lang="ts">
import {computed} from 'vue';
import {useCalendarStore} from '@/stores/calendarStore.ts';
import {DateService} from '@/services/DateService.ts';

const props = defineProps<{
    currentMonth: number;
    currentYear: number;
}>();

const emit = defineEmits<{
    (e: 'update:month', month: number): void;
    (e: 'update:year', year: number): void;
    (e: 'openYearModal'): void;
    (e: 'openMonthModal'): void;
}>();

const calendarStore = useCalendarStore();

const monthName = computed(() => DateService.getMonthName(props.currentMonth));

const previousMonth = () =>
{
    calendarStore.previousMonth();
};

const nextMonth = () =>
{
    calendarStore.nextMonth();
};
</script>

<template>
    <div class="calendar-navigation">
        <button @click="previousMonth" class="nav-button">&lt;</button>
        <div class="current-date">
            <transition name="fade" mode="out-in">
                <button :key="currentMonth" @click="emit('openMonthModal')" class="selector-button">
                    {{ monthName }}
                </button>
            </transition>
            <transition name="fade" mode="out-in">
                <button :key="currentYear" @click="emit('openYearModal')" class="selector-button">
                    {{ currentYear }}
                </button>
            </transition>
        </div>
        <button @click="nextMonth" class="nav-button">&gt;</button>
    </div>
</template>

<style scoped>
.calendar-navigation {
    @apply flex items-center justify-between mb-4;
}

.nav-button {
    @apply w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-200 ease-in-out;
}

.current-date {
    @apply flex items-center space-x-2;
}

.selector-button {
    @apply px-3 py-1 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 hover:shadow-lg transition-colors duration-200 ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>