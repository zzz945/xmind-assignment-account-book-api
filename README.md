# 记账本服务端设计文档

## 接口文档

### 获取账单列表
- 接口路径：/account-book/get-bill-list
- 请求方式：GET
- 接口描述：按条件查询账单列表，支持分页，按时间倒序返回结果
- 请求示例：http://localhost:8108/account-book/get-bill-list?month=2019-07 
- <details>
  <summary>返回示例</summary>

  ```json
    {
      "errno": 0,
      "errmsg": "ok",
      "data": {
        "list": [
          {
            "type": 0,
            "category": "交通",
            "time": "2019-07-31",
            "amount": 1900
          },
          {
            "type": 1,
            "category": "基金投资",
            "time": "2019-07-31",
            "amount": 1000
          },
          {
            "type": 0,
            "category": "日常饮食",
            "time": "2019-07-24",
            "amount": 3900
          },
          {
            "type": 0,
            "category": "房贷",
            "time": "2019-07-01",
            "amount": 5400
          },
          {
            "type": 0,
            "category": "房屋租赁",
            "time": "2019-07-01",
            "amount": 1500
          },
          {
            "type": 1,
            "category": "工资",
            "time": "2019-07-01",
            "amount": 30000
          }
        ],
        "statictics": [
          {
            "category": "工资",
            "total_amount": 30000
          },
          {
            "category": "房贷",
            "total_amount": 5400
          },
          {
            "category": "日常饮食",
            "total_amount": 3900
          },
          {
            "category": "交通",
            "total_amount": 1900
          },
          {
            "category": "房屋租赁",
            "total_amount": 1500
          },
          {
            "category": "基金投资",
            "total_amount": 1000
          }
        ],
        "total": 6,
        "pageNum": 1,
        "pageSize": 20
      }
    }
  ```
</details>

参数定义：
| 参数名 | 类型 | 必传 | 描述 | 示例 |
| ----- | ---- | ---- | ---- | ---- |
| month | String | N | 账单月份 | 2019-07 |
| category | String | N | 账单的详细分类 | 车贷 |
| pageNum | Number | N | 页码，默认第一页 | - |
| pageSize | Number | N | 每页条数，默认20 | - |


返回字段：
| 字段名 | 类型 | 描述 |
| ----- | ---- | ---- | 
| list | String | 账单列表 |
| statistics | String | 账单分类统计 |
| total | Number | 总数|
| pageNum | Number | 页码 | 
| pageSize | Number | 每页条数 |

### 添加账单
- 接口路径：/account-book/get-bill-list
- 请求方式：POST
- 接口描述：添加新账单
- 请求示例：http://localhost:8108/account-book/insert-bill?type=0&time=2020-03-01%2020:00:00&category=8s0p77c323&amount=8888 

| 参数名 | 类型 | 必传 | 描述 | 示例 |
| ----- | ---- | ---- | ---- | ---- |
| type | Number | Y | 账单类型 | 1代表收入, 0代表支出 |
| time | Number | Y | 页码，默认第一页 | - |
| category | String | Y | 账单的详细分类 | 1bcddudhmh |
| amount | Float | Y | 账单金额 | - |

### 获取分类列表
- 接口路径：/account-book/get-categories
- 请求方式：GET
- 接口描述：获取分类列表
- 请求示例：http://localhost:8108/account-book/get-categories?name=车
- <details>
  <summary>返回示例</summary>

  ```json
  {
    "errno": 0,
    "errmsg": "ok",
    "data": {
      "list": [
        {
          "id": "1bcddudhmh",
          "type": 0,
          "name": "车贷"
        },
        {
          "id": "hc5g66kviq",
          "type": 0,
          "name": "车辆保养"
        }
      ],
      "total": 2,
      "pageNum": 1,
      "pageSize": 20
    }
  }
  ```
</details>

| 参数名 | 类型 | 必传 | 描述 | 示例 |
| ----- | ---- | ---- | ---- | ---- |
| name | Number | N | 分类名，模糊查询 | 车贷 |
| pageNum | Number | N | 页码，默认第一页 | - |
| pageSize | Number | N | 每页条数，默认20 | - |

## 总体设计

### 技术栈
koa + sqlite

为什么选sqlite：
1. 直接读写csv：无索引效率低，查询、更新或写入都需要解析整个文件；且无法支持并行写操作；
2. 通过内存数据库间接读写csv，如[nedb](https://github.com/louischatriot/nedb): 不支持group by做数据统计；数据量过大时会导致内存溢出；
3. sqlite: 文件数据库，非常方便通过sql做增删改查和统计，后续如需要考虑分布式、负载均衡可切换为mysql

### 初始数据导入脚本

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

### 后续优化TODO LIST
1. 服务端日志：为了查线上问题
2. traceid: 需要为每次接口请求创建唯一traceid，配合服务端日志追踪请求链路
3. 单元测试：为了提高编码质量，代码改动后做回归测试
4. lint：编码规范，风格统一，提高合作效率
