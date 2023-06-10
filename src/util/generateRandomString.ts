const randomString = require('randomstring')

export const generateStoreCode = () => {
    return randomString.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization:'uppercase'
    });
}