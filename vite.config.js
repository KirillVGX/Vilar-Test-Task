import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api/coingecko": {
                target: "https://api.coingecko.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/coingecko/, ""),
            },
        },
    },
});
