const bookController = require("../controllers/book.controller")
import { Router } from "express"

const router = Router()

router.get(
    '/books-list',
    bookController.getBooksList)

router.get(
    '/book-details/:id',
    bookController.getBookDetails)

router.delete(
    '/delete-book/:id',
    bookController.deleteBook)

router.post(
    '/add-book',
    bookController.addBook)

router.patch(
    '/edit-book',
    bookController.updateBook)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router