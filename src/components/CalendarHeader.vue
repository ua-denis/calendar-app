<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
    selectedDate: Date;
}>();

const formattedDate = computed(() =>
{
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return props.selectedDate.toLocaleDateString(undefined, options);
});
</script>

<template>
    <div class="calendar-header">
        <h1 class="selected-date">{{ formattedDate }}</h1>
    </div>
</template>

<style scoped>
.calendar-header {
    @apply mb-4;
}

.selected-date {
    @apply text-sm lg:text-lg sm:text-base xs:text-sm font-bold text-center text-gray-800;
}
</style>