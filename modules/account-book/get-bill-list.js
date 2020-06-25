const response = require('../../common/response')

async function getBillList(ctx) {
  response.sendData(ctx, {
    list: ['hello']
  })
}

module.exports = getBillList