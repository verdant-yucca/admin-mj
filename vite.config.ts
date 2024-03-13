import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import macrosPlugin from 'vite-plugin-babel-macros';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// import mkcert from 'vite-plugin-mkcert'; // needs for testing ssl certificate in dev env for testing WebRTC features

export default defineConfig({
    base: process.env.PUBLIC_URL,
    css: {
        modules: {
            generateScopedName: '[name]__[local]__[hash:base64:5]',
            localsConvention: 'camelCase'
        }
    },
    build: {
        outDir: path.resolve(__dirname, `build`),
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name === 'index.css') {
                        return 'plugin.css';
                    }
                    return 'assets/[name].[ext]';
                },
                entryFileNames: 'plugin.js',
                format: 'esm'
            }
        }
    },
    server: {
        host: true,
        port: 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },

    plugins: [react(), svgr(), macrosPlugin(), nodePolyfills()]
});
