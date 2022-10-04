import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgrPlugin()],
    server: {
        host: '127.0.0.1',
        port: 8886
    },
    mainFields: [],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [esbuildCommonjs(['react-moment'])]
        }
    }
});
