const sqlite3 = require('sqlite3')
const sqlite = sqlite3.verbose()

class Sqlite {
  constructor(dbFilePath) {
    this.path = dbFilePath
    this.db = null
  }
  // 连接数据库
  connect() {
    return new Promise((resolve,reject) => {
      this.db = new sqlite.Database(this.path, err => {
        if(err === null) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }
  // 运行sql
  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, err => {
        if(err === null) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }
  // 运行多条sql
  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, err => {
        if(err === null) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }
  // 查询一条数据
  get(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, data) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
  // 查询所有数据
  all(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, data) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
  // 关闭数据库
  close() {
    this.db.close()
  }
}

module.exports = Sqlite