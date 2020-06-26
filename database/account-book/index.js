const Sqlite = require('../../common/sqlite-promise')

const accountBook = new Sqlite(`${__dirname}/AccountBook.db`)
accountBook.connect()

module.exports = accountBook
