import express, { Express, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
const app: Express = express()
const port = 3000

databaseService.connect()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
