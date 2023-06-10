import { resolve } from "path";

interface StoreOptions {
    name: string;
    code: string;
    address: string;
}
export default class Store {
    private name: string;
    private code: string;
    private address: string;

    constructor(options: StoreOptions) {
        const { name, code, address } = options;

        this.name = name;
        this.code = code;
        this.address = address;
        //console.log(name)
        // return new Promise((resolve, reject) => {
            
        // })
    }
}
