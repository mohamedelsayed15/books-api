import { Request,Response,NextFunction } from "express"
import Book from "../models/book.model"

exports.getBooksList = async (req:Request,res:Response) => {
    try {
        let booksList = await Book.getBooks()

        res.status(200).send({ booksList })

    } catch (e) {
        console.log(e)
        return res.status(500).send({
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
            return res.status(422).send({
                error: "Either storeName or address are required"
            })
        }

        const book = await  Book.create({
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages : req.body.pages
        })

        res.status(201).send({ book })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        })
    }
}