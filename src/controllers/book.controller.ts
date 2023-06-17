import { Request,Response,NextFunction } from "express"
import Book from "../models/book.model"
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"

exports.getBooksList = async (req:Request,res:Response) => {
    try {
        let booksList = await Book.getBooks()
        //auditing
        prepareAudit({
            auditAction:auditAction.GET_BOOK_LIST,
            data:booksList,
            status:200,
            error:null,
            auditBy:"User",
            auditOn:new Date(Date.now()).toLocaleString(),
        })
        res.status(200).json({ booksList })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}
exports.getBookDetails = async (req:any,res:Response) => {
    try {
        let book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({
                error: "couldn't find specified book"
            })
        }
        res.status(200).json(book)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}
exports.deleteBook = async (req:any,res:Response) => {
    try {
        console.log("count")
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

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}

exports.addBook = async (req: Request, res: Response) => {
    try {
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
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}
exports.updateBook = async (req: Request, res: Response) => {
    try {
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
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}