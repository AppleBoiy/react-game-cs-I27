import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'singleHMR',
            handleHotUpdate({ modules }) {
                modules.map((m) => {
                    m.importedModules = new Set()
                    m.importers = new Set()
                })

                return modules
            },
        },
    ],
})
