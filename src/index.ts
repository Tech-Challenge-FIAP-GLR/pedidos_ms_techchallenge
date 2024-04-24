import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import controller from './controllers/index'

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()

app.get('/', (req, res) => {
  res.send('Olá mundo')
})

app.use(cors({
  origin: ['http://localhost:4000']
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('', controller)

app.use((req, res) => {
  res.status(404)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})