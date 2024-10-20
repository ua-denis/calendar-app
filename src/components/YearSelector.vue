<script setup lang="ts">
import {computed, ref} from 'vue';
import {YearRangeService} from '@/services/YearRangeService.ts';

const props = defineProps<{
    currentYear: number;
    isOpen: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:year', year: number): void;
    (e: 'close'): void;
}>();

const YEAR_RANGE = 15;
const centerYear = ref(props.currentYear);

const yearRange = computed(() =>
    YearRangeService.generateYearRange(centerYear.value, YEAR_RANGE)
);

const handleYearSelect = (year: number) =>
{
    emit('update:year', year);
    emit('close');
};

const previousYearRange = () =>
{
    centerYear.value -= YEAR_RANGE;
};

const nextYearRange = () =>
{
    centerYear.value += YEAR_RANGE;
};
</script>

<template>
    <transition name="modal">
        <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
            <div class="modal-content" @click.stop>
                <button class="close-button" @click="$emit('close')">&times;</button>
                <h2 class="modal-title">Select Year</h2>
                <div class="year-grid">
                    <button
                        v-for="year in yearRange"
                        :key="year"
                        class="year-button"
                        :class="{ 'selected': year === currentYear }"
                        :disabled="year === currentYear"
                        @click="handleYearSelect(year)"
                    >
                        {{ year }}
                    </button>
                </div>
                <div class="navigation-buttons">
                    <button @click="previousYearRange">&lt; Previous</button>
                    <button @click="nextYearRange">Next &gt;</button>
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

.year-grid {
    @apply grid grid-cols-3 gap-2 mb-4;
}

.year-button {
    @apply p-2 rounded-lg transition-colors duration-200 ease-in-out;
}

.year-button:hover {
    @apply bg-cyan-200;
}

.year-button.selected {
    @apply bg-cyan-500 text-white;
}

.navigation-buttons {
    @apply flex justify-between;
}

.navigation-buttons button {
    @apply px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 ease-in-out;
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