import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'shkryabin-app',
        short_name: 'shkryabin',
        description: 'Feedback Application',
        start_url: '/mobdev-lab14-shkryabin/',
        display: 'standalone',
        background_color: '#F9FAFB',
        theme_color: '#4F46E5',
        orientation: 'portrait-primary',
        scope: '/mobdev-lab14-shkryabin/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512', 
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['business', 'productivity'],
        lang: 'en'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/mobdev-lab14-shkryabin/'
})
