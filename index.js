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

  request(source, render).then(function (response) {
    data = response.data
    status = response.status

    harvest(data, context, selector)(function (error, content) {
      res.status(status).json(content)
    })
  }).catch(function (error) {
    return res.status(error.response.status || 500).json({
      error: error.response.data || error
    })
  })
})

createServer(app).listen(process.env.PORT || 1337)
