import { Request,Response,NextFunction } from "express"
import Book from "../models/book.model"
import { bookUpload } from "../util/multer-book"
import fs from 'fs'
//logging and auditing
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"
import Logger from "../services/logger.service"
import { upload } from "../util/multer-user"
const log = new Logger("store.controller")
//===================================

exports.getBooksList = async (req:Request,res:Response,next:NextFunction) => {
    try {
        console.log(req.query)
        let booksList = await Book.getBooks()
        res.status(200).json({ booksList })

    }  catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('getBooksList', error.toString())
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
exports.getBookDetails = async (req:any,res:Response,next:NextFunction) => {
    try {
        let book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({
                error: "couldn't find specified book"
            })
        }
        res.status(200).json(book)

    } catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('getBookDetails', error.toString())
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
exports.deleteBook = async (req:any,res:Response,next:NextFunction) => {
    try {
        const count:any = await Book.count(req.params.id)

        if (count < 1) {
            
            return res.status(404).json({
                error:"couldn't find book"
            })
        }
        let book: any = await Book.findById(req.params.id)
        let bookObj = new Book({
            id:book.book_id
        })
        let deletedBook = await bookObj.deleteBookById()

        res.status(200).json(deletedBook)

    }  catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('deleteBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'deleteBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}

exports.addBook = async (req: Request, res: Response,next:NextFunction) => {
    try {//replace with validation
        if (!req.body.title ||
            !req.body.description ||
            !req.body.isbn ||
            !req.body.author ||
            !req.body.publisher ||
            !req.body.pages) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            })
        }

        const book = await  Book.create({
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages: req.body.pages,
            storeCode : req.body.storeCode
        })

        res.status(201).json(book)
    }  catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('addBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'addBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
exports.updateBook = async (req: Request, res: Response,next:NextFunction) => {
    try {
        //replace with validation
        if (!req.body.bookId||
            !req.body.title ||
            !req.body.description ||
            !req.body.isbn ||
            !req.body.author ||
            !req.body.publisher ||
            !req.body.pages) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            })
        }

        const count:any = await Book.count(req.body.bookId)

        if (count < 1) {
            return res.status(404).json({
                error:"couldn't find book"
            })
        }

        const book = await Book.updateBook({
            bookId:req.body.bookId,
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages: req.body.pages,
            storeCode : req.body.storeCode
        })

        res.status(201).json({ book })
    } catch (err: any) {
        console.error(err)
        const error: any = new Error(err.message);
        log.error('updateBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'updateBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}

exports.bookImage = async (req: any, res: Response,next:NextFunction) => {
    try {
        const bookId = req.params.id
        if (!bookId) {
            return res.status(422).send()
        }
        console.log(bookId)
        // find the book first
        const book:any = await Book.findById(bookId)
        console.log(book)
        if (!book) {
            return res.status(404).json({
                error:"couldn't find the book"
            })
        }

        const directoryPath = 'images/book-image/' + `${book.book_id}`

        await fs.promises.mkdir(directoryPath)

        const upload = bookUpload(directoryPath)

        upload(req, res, next => {
            //save into database
            console.log(req.file.path)
        })

        res.send({
            message:"book image uploaded"
        })
    } catch (err: any) {
        console.error(err)
        const error: any = new Error(err.message);
        log.error('updateBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'updateBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}