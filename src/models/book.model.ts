export default class Book  {

    private id: number
    private title: string
    private isbn: number
    private author: string
    private description: string
    private pages: number
    private publisher: string

    constructor(
        id: number,
        title: string,
        description: string,
        isbn: number,
        author: string,
        publisher:string,
        pages: number) {

        this.id = id
        this.title = title
        this.description = description
        this.isbn = isbn
        this.author = author
        this.publisher = publisher
        this.pages =pages

    }

}