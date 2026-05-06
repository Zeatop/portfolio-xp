import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },

  plugins: [
    react(),
    {
      name: 'serve-minesweeper-static',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/minesweeper/')) return next()

          const filePath = path.join(
            process.cwd(),
            'public',
            req.url.split('?')[0]
          )

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath)
            const types = {
              '.html': 'text/html',
              '.js':   'application/javascript',
              '.css':  'text/css',
              '.png':  'image/png',
              '.svg':  'image/svg+xml',
              '.ico':  'image/x-icon',
              '.json': 'application/json',
              '.woff': 'font/woff',
              '.woff2':'font/woff2',
            }
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
            fs.createReadStream(filePath).pipe(res)
            return
          }

          next()
        })
      },
    },
  ],
})