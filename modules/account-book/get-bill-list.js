const response = require('../../common/response')
const AccountBookSqlite = require('../../database/account-book')
const moment = require('moment')

async function getBillList(ctx) {
  let {
    month, // yyyy-mm
    category,
    pageNum = 1, 
    pageSize = 20, 
  } = ctx.request.query

  pageNum = +pageNum
  pageSize = +pageSize

  try {
    let where = []
    if (month) {
      const startTime = moment(month).unix()*1000
      const endTime = moment(month).add(1, 'month').unix()*1000
      where.push(`time >= ${startTime} and time < ${endTime}`)
    }
    if (category) {
      where.push(`category = '${category}'`)
    }

    if (where.length) {
      where = `where ${where.join(' and ')}`
    } else {
      where = ''
    }

    // 查询账单列表
    let sql = `
      select
        bill.type as type,
        categories.name as category,
        bill.time as time, 
        bill.amount as amount
      from bill
      left join categories
      on bill.category = categories.id
      ${where}
      order by time desc
      limit ${pageSize}
      offset ${(pageNum - 1) * pageSize}
    `
    logInfo(ctx, sql)
    const list = await AccountBookSqlite.all(sql)
    list.forEach(item => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })

    // 查询总数，用于分页
    sql = `
      select 
        count(*) as total
      from bill
      ${where}
    `
    logInfo(ctx, sql)
    const [{ total }] = await AccountBookSqlite.all(sql)

    // 统计数据
    sql = `
      select
        min(categories.name) as category,
        sum(bill.amount) as total_amount
      from bill
      left join categories
      on bill.category = categories.id
      ${where}
      group by bill.category
      order by total_amount desc
    `
    const statictics = await AccountBookSqlite.all(sql)

    response.sendData(ctx, {
      list,
      statictics,
      total,
      pageNum,
      pageSize,
    })
  } catch (e) {
    response.handleError(ctx, e)
  }
}

module.exports = getBillList