//const assert = require('assert')
const chai = require('chai')

// const should = chai.should()
// const expect = chai.expect;
// const assert = chai.assert;
const request = require('supertest');
const app = require('../dist/app');
const {
    generateStoreCode
} = require('../dist/util/generateRandomString')

describe('GET /book/books-list', function() {
    it('returns a list of books', function(done) {
        request(app)
            .get('/book/books-list')
            .expect(200)
            .expect(res => {
                console.log("books list :", res.body)
            }).end(done)
    })
})

describe('POST /book/add-book', function() {
    it('adds a book', function(done) {
        request(app)
            .post('/book/add-book')
            .send({
                "title": "req.body.title",
                "description": "req.body.description",
                "isbn": 1234567854123,
                "author": "req.body.author",
                "publisher": "req.body.publisher",
                "pages" : 200,
                "storeCode" : generateStoreCode()
            })
            .expect(201)
            .expect(res => {
                console.log("book :", res.body)
            }).end(done)
    })
})