import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    // If needed to build into a public dir
    /*build: {
        outDir: 'public',
        assetsDir: 'assets',
    },
    publicDir: '../public',*/
});
