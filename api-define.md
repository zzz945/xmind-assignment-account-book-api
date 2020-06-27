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
            "type": "支出",
            "category": "交通",
            "time": "2019-07-31",
            "amount": 1900
          },
          {
            "type": "收入",
            "category": "基金投资",
            "time": "2019-07-31",
            "amount": 1000
          },
          {
            "type": "支出",
            "category": "日常饮食",
            "time": "2019-07-24",
            "amount": 3900
          },
          {
            "type": "支出",
            "category": "房贷",
            "time": "2019-07-01",
            "amount": 5400
          },
          {
            "type": "支出",
            "category": "房屋租赁",
            "time": "2019-07-01",
            "amount": 1500
          },
          {
            "type": "收入",
            "category": "工资",
            "time": "2019-07-01",
            "amount": 30000
          },
          {
            "type": "支出",
            "category": "日常饮食",
            "time": "2019-07-01",
            "amount": 100
          }
        ],
        "statistics": [
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
            "total_amount": 4000
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
        "statisticsByType": [
          {
            "type": "收入",
            "total_amount": 31000
          },
          {
            "type": "支出",
            "total_amount": 12800
          },
          {
            "type": "净收入",
            "total_amount": 18200
          }
        ],
        "total": 7,
        "pageNum": 1,
        "pageSize": 100
      }
    }
  ```
</details>

参数定义：
| 参数名 | 类型 | 必传 | 描述 | 示例 |
| ----- | ---- | ---- | ---- | ---- |
| month | String | Y | 账单月份 | 2019-07 |
| categories | String | N | 账单的详细分类数组 | ["1bcddudhmh"] |
| pageNum | Number | N | 页码，默认第一页 | - |
| pageSize | Number | N | 每页条数，默认100 | - |


返回字段：
| 字段名 | 类型 | 描述 |
| ----- | ---- | ---- | 
| list | String | 账单列表 |
| statistics | Array | 账单按分类统计 |
| statisticsByType | Array | 账单按类型统计 |
| total | Number | 总数|
| pageNum | Number | 页码 | 
| pageSize | Number | 每页条数 |

### 添加账单
- 接口路径：/account-book/get-bill-list
- 请求方式：POST/GET
- 接口描述：添加新账单
- 请求示例：http://localhost:8108/account-book/insert-bill?type=0&time=2020-03-01%2020:00:00&category=8s0p77c323&amount=8888 

| 参数名 | 类型 | 必传 | 描述 | 示例 |
| ----- | ---- | ---- | ---- | ---- |
| type | Number | Y | 账单类型 | 1代表收入, 0代表支出 |
| time | Number | Y | 时间 | 2020-03-01 20:00:00 |
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
| pageSize | Number | N | 每页条数，默认100 | - |
