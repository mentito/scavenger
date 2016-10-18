import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import harvest from './lib/harvest'
import request from './lib/request'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

app.get('/checks', (req, res) => res.send())
app.post('/harvests', async (req, res) => {
  const { render, source, context, selector } = req.body

  let data, status;

  try {
    ({ data, status } = await request(source, render))
  } catch (e) {
    console.log('1', e.response)
    return res.status(e.response.status).json({
      error: e.response.data
    })
  }

  harvest(data, context, selector)((error, content) => {
    res.status(status).json(content)
  })
})

createServer(app).listen(process.env.PORT || 1337)
