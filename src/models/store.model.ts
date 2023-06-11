import { query } from "../db/connection"
import { storeQuery } from "../db/queries"
import { generateStoreCode } from "../util/generateRandomString"

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
                const stores:any = await query(storeQuery.GET_STORE_LIST,null);
                resolve(stores.rows)
            } catch (e) {
                reject(e)
            }
        })
    }
}
