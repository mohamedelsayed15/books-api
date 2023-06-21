import { query } from "../db/connection"
import { auditQuery } from "../db/queries"

export default class Audit {
    auditAction: any
    data: any
    status: any
    error: any
    auditBy: any
    auditOn: any

    constructor(options: any) {

        const{
            auditAction,
            data,
            status,
            error,
            auditBy,
            auditOn } = options
        
        this.auditAction = auditAction
        this.data = data
        this.status = status
        this.error = error
        this.auditBy = auditBy
        this.auditOn = auditOn

    }
    static async create(options: any) {
        let{
            auditAction,
            data,
            status,
            error,
            auditBy,
            auditOn } = options
        if (data) {
            data = JSON.stringify(data)
        }
        if (error) {
            error = JSON.stringify(error)
        }
        new Promise(async (resolve, reject) => {
            try {
                await query(auditQuery.ADD_AUDIT, [
                    auditAction,
                    data,
                    status,
                    error,
                    auditBy,
                    auditOn] )
                resolve(options)
            } catch (e) {
                reject(e)
            }
        })
    }
}
