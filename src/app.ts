import express from 'express'

require('dotenv').config()


const cors = require('cors')

const app = express()

app.use(cors())



app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})