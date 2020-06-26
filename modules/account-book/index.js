function init (router, basePath) {
  router.get(`${basePath}/get-bill-list`, require('./get-bill-list'))
  router.post(`${basePath}/insert-bill`, require('./insert-bill'))
  router.get(`${basePath}/insert-bill`, require('./insert-bill'))
  router.get(`${basePath}/get-categories`, require('./get-categories'))
}

module.exports = {
  init
}
