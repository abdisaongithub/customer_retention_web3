import {
    defineConfig
} from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import {
    createRequire
} from 'node:module';
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env
    },
    css: {
        postcss,
    },
    plugins: [
        react(),
        ckeditor5({
            theme: require.resolve('@ckeditor/ckeditor5-theme-lark')
        }),
    ],
    optimizeDeps: {
        include: ['@workspace/ckeditor5-custom-build'],
    },
    resolve: {
        alias: [{
            find: /^~.+/,
            replacement: (val) => {
                return val.replace(/^~/, "");
            },
        }, ],
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: false,
            exclude: [/@workspace\/ckeditor5-custom-build/, ]
        }
    }
})