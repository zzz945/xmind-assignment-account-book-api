const response = require('../../common/response')
const AccountBookSqlite = require('../../database/account-book')

async function getCategories (ctx) {
  let {
    name,
    pageNum = 1, 
    pageSize = 100,
  } = ctx.request.query

  pageNum = +pageNum
  pageSize = +pageSize

  try {
    let where = []
    if (name) {
      where.push(`name like '%${name}%'`)
    }

    if (where.length) {
      where = `where ${where.join(' and ')}`
    } else {
      where = ''
    }

    // 查询账单列表
    let sql = `
      select 
        *
      from categories
      ${where}
      limit ${pageSize}
      offset ${(pageNum - 1) * pageSize}
    `
    logInfo(ctx, sql)
    const list = await AccountBookSqlite.all(sql)

    // 查询总数，用于分页
    sql = `
      select 
        count(*) as total
      from categories
      ${where}
    `
    logInfo(ctx, sql)
    const [{ total }] = await AccountBookSqlite.all(sql)
    response.sendData(ctx, {
      list,
      total,
      pageNum,
      pageSize,
    })
  } catch (e) {
    response.handleError(ctx, e)
  }
}

module.exports = getCategories