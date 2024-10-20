<script setup lang="ts">
import {DateService} from '@/services/DateService.ts';

const props = defineProps<{
    currentMonth: number;
    isOpen: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:month', month: number): void;
    (e: 'close'): void;
}>();

const months = Array.from({length: 12}, (_, i) => DateService.getMonthName(i));

const handleMonthSelect = (month: number) =>
{
    emit('update:month', month);
    emit('close');
};
</script>

<template>
    <transition name="modal">
        <div v-if="props.isOpen" class="modal-overlay" @click="$emit('close')">
            <div class="modal-content" @click.stop>
                <button class="close-button" @click="$emit('close')">&times;</button>
                <h2 class="modal-title">Select Month</h2>
                <div class="month-grid">
                    <button
                        v-for="(month, index) in months"
                        :key="month"
                        class="month-button"
                        :class="{ 'selected': index === props.currentMonth }"
                        :disabled="index === props.currentMonth"
                        @click="handleMonthSelect(index)"
                    >
                        {{ month }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-overlay {
    @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal-content {
    @apply bg-white rounded-lg p-6 w-80 relative;
}

.close-button {
    @apply absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700;
}

.modal-title {
    @apply text-xl font-bold mb-4 text-center;
}

.month-grid {
    @apply grid grid-cols-3 gap-2;
}

.month-button {
    @apply p-2 rounded-lg transition-colors duration-200 ease-in-out;
}

.month-button:hover {
    @apply bg-cyan-200;
}

.month-button.selected {
    @apply bg-cyan-500 text-white;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>