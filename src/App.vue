<script setup lang="ts">
import CalendarView from '@/components/CalendarView.vue';

let currentYear = new Date().getFullYear();
</script>

<template>
    <div class="app">
        <header>
            <h1 class="text-3xl font-bold text-center my-4">Calendar</h1>
        </header>
        <main>
            <CalendarView/>
        </main>
        <footer class="text-center mt-8 text-gray-500">
            <p>&copy; {{ currentYear }} Calendar. All rights reserved.</p>
        </footer>
    </div>
</template>

<style>
@import './assets/style.css';

body {
    @apply bg-gray-100 text-gray-900 font-sans;
}

.app {
    @apply container mx-auto p-4;
}
</style>
