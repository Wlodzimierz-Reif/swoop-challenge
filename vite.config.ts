import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  //   resolve: {
  //   alias: {
  //     '@utils': path.resolve(__dirname, './src/utils'),
  //     '@components': path.resolve(__dirname, './src/components'),
  //     // add other aliases as needed
  //   },
  // },
})
