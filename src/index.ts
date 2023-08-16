import express, { Express, NextFunction, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'
import bodyParser from 'body-parser'
const app: Express = express()
const port = 3000

databaseService.connect()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
