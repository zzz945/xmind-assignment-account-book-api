const response = require('../../common/response')
const AccountBookSqlite = require('../../database/account-book')

async function insertBill(ctx) {
  let { 
    type,
    time,
    category,
    amount
  } = ctx.request.query

  type = +type
  time = new Date(time).getTime()
  amount = +amount

  try {  
    let sql = `
      INSERT INTO bill
      VALUES (${type},'${time}','${category}',${amount})
    `
    logInfo(ctx, sql)
    const data = await AccountBookSqlite.run(sql)
    response.sendData(ctx, data)
  } catch (e) {
    response.handleError(ctx, e)
  }
}

module.exports = insertBill