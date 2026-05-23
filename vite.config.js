import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { COINGECKO_ORIGIN } from "./src/config/api.js";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api/coingecko": {
                target: COINGECKO_ORIGIN,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/coingecko/, ""),
            },
        },
    },
});
