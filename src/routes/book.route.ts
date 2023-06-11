const bookController = require("../controllers/book.controller")
import { Router } from "express"

const router = Router()

router.get(
    '/books-list',
    bookController.getBooksList)

router.post(
    '/add-book',
    bookController.addBook)


export default router