import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    // lucide-react is ESM-only — exclude from CJS pre-bundling to avoid
    // "does not provide export" errors with the Vite dep optimizer
    exclude: ['lucide-react'],
  },
})
