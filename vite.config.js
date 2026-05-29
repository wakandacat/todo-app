import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Site is served from https://wakandacat.github.io/todo-app/ (a sub-path),
  // so assets must be requested relative to /todo-app/, not the domain root.
  base: '/todo-app/',
  plugins: [react()],
})
