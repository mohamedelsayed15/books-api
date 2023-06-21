import express, {Request,Response, NextFunction } from 'express'
import storeRoutes from './routes/store.route'
import bookRoutes from './routes/book.route'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { prepareAudit } from "./audit/audit.service"
const swaggerDocument = require('../swagger.json')
const app = express()

require('dotenv').config()

app.use(cors())
app.use(express.json({ limit: "3kb" })); //parser//json data size limitation
//swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//routes
app.use('/store', storeRoutes)
app.use('/book', bookRoutes)

//404
app.use('/*', (req, res, next) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
//error handler 500
app.use((error:any, req:Request, res:Response, next:NextFunction) => { 
    try {
        if (error.prepareAudit) {
            prepareAudit(error.prepareAudit)
        }
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    } catch (e) { 
        console.log(e)
    }
})
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})
module.exports = app
