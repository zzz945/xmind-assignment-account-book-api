const response = require('../../common/response')
const AccountBookSqlite = require('../../database/account-book')
const moment = require('moment')
const { billType } = require('./consts')

async function getBillList(ctx) {
  let {
    month, // yyyy-mm
    categories,
    pageNum = 1, 
    pageSize = 100, 
  } = ctx.request.query

  pageNum = +pageNum
  pageSize = +pageSize

  try {
    let where = []
    if (month) {
      const startTime = moment(month).unix()*1000
      const endTime = moment(month).add(1, 'month').unix()*1000
      where.push(`bill.time >= ${startTime} and bill.time < ${endTime}`)
    }
    if (categories) {
      categories = JSON.parse(categories)
      // where.push(`bill.category in ${categories}`)
      where.push(`bill.category in (${
        categories.map(c => `'${c}'`).join(',')
      })`)
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
      item.type = billType.BILL_TYPE_TEXT[item.type]
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

    // 按分类统计数据
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
    const statistics = await AccountBookSqlite.all(sql)

    // 按类型统计（收入、支出）
    sql = `
      select
        type,
        sum(amount) as total_amount
      from bill
      ${where}
      group by type
      order by total_amount desc
    `
    const statisticsByType = await AccountBookSqlite.all(sql)
    let netIncome = 0
    statisticsByType.forEach(item => {
      if (item.type === billType.BILL_TYPE_IN) {
        netIncome += item.total_amount
      } else {
        netIncome -= item.total_amount
      }
      item.type = billType.BILL_TYPE_TEXT[item.type]
      
    })
    statisticsByType.push({
      type: '净收入',
      total_amount: netIncome,
    })

    response.sendData(ctx, {
      list,
      statistics,
      statisticsByType,
      total,
      pageNum,
      pageSize,
    })
  } catch (e) {
    response.handleError(ctx, e)
  }
}

module.exports = getBillList