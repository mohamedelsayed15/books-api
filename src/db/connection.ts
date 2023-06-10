import pool from './pool'

export const query = (queryText: string, queryParams: any) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, queryParams)
            .then(res => {
            resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

