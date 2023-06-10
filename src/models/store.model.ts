import { query } from "../db/connection"
import { storeQuery } from "../db/queries"
import { generateStoreCode } from "../util/generateRandomString"

// interface StoreOptions {
//     name: string;
//     address: string;
//     code: string;
// }
export default class Store {
    // name: string;
    // code: string;
    // address: string;
    // constructor(options: StoreOptions) {
    //     const { name, address } = options;

    //     this.name = name;
    //     this.code = generateStoreCode();
    //     this.address = address;
    //     // this.create().then(store => console.log(store)).catch(e => {
    //     //     throw e
    //     // })
    // }
    //=============== Functions ===============
    // creating a new store
    static async create(options: any) {
        const { name, address } = options;

        return new Promise(async (resolve, reject) => {
            try {
                // generate store code
                options.code = generateStoreCode()
                // implement query
                const store = await query(storeQuery.ADD_STORE, [
                    name,
                    address,
                    options.code
                ]);
                resolve(options)
            } catch (e) {
                reject(e)
            }
        })
    }
    // fetching store list
    static async getStores() {

        return new Promise(async (resolve, reject) => {
            try {
                const stores = await query(storeQuery.GET_STORE_LIST,null);
                resolve(stores)
            } catch (e) {
                reject(e)
            }
        })
    }
}
