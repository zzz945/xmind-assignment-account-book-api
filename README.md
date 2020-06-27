# 记账本服务端
实现记账本业务逻辑，为前端提供http接口

## 启动服务
```sh
# npm install
# npm start
```

## 重新导入初始数据

shell命令：
```sh
# cd ./database/account-book
# ../../dev-tools/sqlite-tools/sqlite3 ./AccountBook.db
```

sqlite3命令行：
```sql
.mode csv
CREATE TABLE bill(
  "type" INTEGER NOT NULL,
  "time" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "amount" REAL NOT NULL
);
.import ./bill-no-header.csv bill

CREATE TABLE categories(
  "id" TEXT NOT NULL,
  "type" INTEGER NOT NULL,
  "name" TEXT NOT NULL
);
.import ./categories-no-header.csv categories
```
