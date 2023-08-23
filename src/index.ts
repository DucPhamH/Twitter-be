import express, { Express, NextFunction, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'
import bodyParser from 'body-parser'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
config()
databaseService.connect()
const app: Express = express()
const port = process.env.PORT || 4000
initFolder()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
