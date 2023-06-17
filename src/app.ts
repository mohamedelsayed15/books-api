import express from 'express'
import storeRoutes from './routes/store.route'
import bookRoutes from './routes/book.route'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

const swaggerDocument = require('../swagger.json')
const app = express()

require('dotenv').config()

app.use(cors())
app.use(express.json({ limit: "3kb" })); //parser//json data size limitation
//swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//routes
app.use('/store', storeRoutes)
app.use('/book',bookRoutes)


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})