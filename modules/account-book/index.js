function init (router, basePath) {
  console.log(`${basePath}/get-bill-list`)
  router.get(`${basePath}/get-bill-list`, require('./get-bill-list'))
}

module.exports = {
  init
}
