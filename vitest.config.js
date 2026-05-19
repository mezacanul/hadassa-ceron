import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
