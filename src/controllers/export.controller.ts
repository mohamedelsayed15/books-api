const csv = require('fast-csv')
import fs from 'fs'
import { Request,Response,NextFunction } from "express"
//logging and auditing
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"
import Logger from "../services/logger.service"
const log = new Logger("store.controller")
import Book from '../models/book.model'
import { error } from 'console'
//===================================
const controller: any = {}

controller.books = async (req:Request,res:Response,next:NextFunction) => {
    try {
        let booksList = await Book.getBooks()
        const ws = fs.createWriteStream("books.csv")
        const data = JSON.parse(JSON.stringify(booksList))

        csv.write(data, { headers: true })
            .on('end', async () => {
                res.download('books.csv', async function () {
                    console.log("downloaded")
                    await fs.promises.unlink('books.csv');
                });
            }).pipe(ws)

    }  catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('export', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getBookDetails',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
export default controller