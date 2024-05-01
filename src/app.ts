import  { Request, Response, NextFunction } from 'express'
const express = require('express')
import storeRoutes from './routes/store.route'
import bookRoutes from './routes/book.route'
import userRoutes from './routes/user.route'
import authRoutes from './routes/auth.route'
import exportRoutes from './routes/export.route'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { prepareAudit } from "./audit/audit.service"
import rateLimit from "./util/ratelimit"
const swaggerDocument = require('../swagger.json')
const app = express()
const hpp = require('hpp');
const helmet = require('helmet')

require('dotenv').config()
app.use(cors({
    origin: 'http://127.0.0.1:5555',//postman default port
    methods: ['GET', 'POST', 'PUT','PATCH'],
    credentials:true
}))
app.use(helmet())
app.use(express.json({ limit: "3kb" })); //parser//json data size limitation
app.use(hpp())//http parameter pollution
app.use(rateLimit)
//swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//routes
app.use('/store', storeRoutes)
app.use('/book', bookRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/export',exportRoutes)

//404
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
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
app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.PORT)
})
module.exports = app
