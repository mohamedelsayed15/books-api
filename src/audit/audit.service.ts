import { EventEmitter } from 'node:events';
import Audit  from './audit.model'

const eventEmitter = new EventEmitter()

eventEmitter.on(`audit`, async (audit) => {
    try {
        Audit.create(audit)
    } catch (e) {
        console.log(e)
    }
})

export const prepareAudit = (options: any) => {
    const audit = new Audit(options)
    eventEmitter.emit('audit',audit)
}

// export default eventEmitter

// import eventEmitter from './audit/audit.service'

// eventEmitter.emit('audit',audit)