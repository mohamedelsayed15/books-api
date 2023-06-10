import express from 'express'
import storeRoutes from './routes/store.route'

require('dotenv').config()


const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({ limit: "3kb" })); //parser//json data size limitation

app.use('/store',storeRoutes)



app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})