/* eslint-disable node/prefer-global/process */
import { isAuthorized } from '@tinacms/auth'
import express, { Router } from 'express'
import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'
import ServerlessHttp from 'serverless-http'

const app = express()
const router = Router()

const mediaHandler = createMediaHandler({
  cloud_name: process.env.NUXT_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NUXT_CLOUDINARY_API_KEY || '',
  api_secret: process.env.NUXT_CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    }
    catch (e) {
      console.error(e)
      return false
    }
  },
})

router.get('/cloudinary/media', mediaHandler)

router.post('/cloudinary/media', mediaHandler)

router.delete('/cloudinary/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/api/', router)
app.use('/.netlify/functions/api/', router)

export const handler = ServerlessHttp(app)
