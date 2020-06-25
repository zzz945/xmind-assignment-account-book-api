function init (router) {
  const accountBook = require('./account-book')
  accountBook.init(router, '/account-book')
}

module.exports = {
  init
}