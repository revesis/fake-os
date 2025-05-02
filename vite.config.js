import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    server: {
        // hmr: {
        //   clientPort: 80,
        // },
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8080/",
                // target: "http://192.168.91.53:8080/",
                secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    build: {
        outDir: 'build',
        sourcemap: true
    },
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
});
