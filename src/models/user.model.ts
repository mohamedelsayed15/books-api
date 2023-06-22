import { query } from "../db/connection"
import { userQuery } from "../db/queries"

export default class Book {
    id: any;
    username: any;
    email: any;
    password: any;
    active: any;
    tokens: any;
    type: any;
    constructor(options:any) {
        const {
            id,
            username,
            email,
            password,
            active,
            tokens,
            type
        } = options;
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.active = active
    this.tokens = tokens
    this.type = type
    }
    
    //=============== Functions ===============
    // add a new user
    static async create(options: any) {
        const {
            username,
            email,
            password,
            userType
        } = options;
        return new Promise(async (resolve, reject) => {
            try {
                // implement query
                const user:any =await query(userQuery.createUser, [
                    username,
                    password,
                    email,
                    userType
                ]);
                resolve(user.rows[0])
            } catch (e) {
                reject(e)
            }
        })
    }
    static async findById(id:number) {
        return new Promise(async (resolve, reject) => {
            try {
                const user:any = await query(userQuery.findUserById, [id]);
                resolve(user.rows[0])
            } catch (e) {
                reject(e)
            }
        })
    }
    static async findByEmail(email:string) {
        return new Promise(async (resolve, reject) => {
            try {
                const user:any = await query(userQuery.findUserByEmail, [email]);
                resolve(user.rows[0])
            } catch (e) {
                reject(e)
            }
        })
    }
    // fetching users list
    static async getUsersList() {
        return new Promise(async (resolve, reject) => {
            try {
                const books: any = await query(userQuery.getUsersList, null)

                resolve(books.rows)
            } catch (e) {
                reject(e)
            }
        })
    }
}
