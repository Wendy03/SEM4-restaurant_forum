# 餐廳評論網

## Installing

#### 環境

1.  node.js v-10.15.0

2.  專案套件
    > - bcryptjs: "^2.4.3",
    > - body-parser: "^1.19.0",
    > - connect-flash: "^0.1.1",
    > - dotenv: "^8.2.0",
    > - express: "^4.17.1",
    > - express-handlebars: "^3.1.0",
    > - express-session: "^1.17.0",
    > - faker: "^4.1.0",
    > - imgur-node-api: "^0.1.0",
    > - method-override: "^3.0.0",
    > - multer: "^1.4.2",
    > - mysql2: "^2.1.0",
    > - passport: "^0.4.1",
    > - passport-local: "^1.0.0",
    > - pg: "^7.18.1",
    > - sequelize: "^5.21.4",
    > - sequelize-cli: "^5.5.1"

#### 確認本機是否安裝 [MySql](https://dev.mysql.com/downloads/windows/installer/)

#### 開啟終端機到存放專案本機位置並執行:

> git clone https://github.com/Wendy03/SEM4-restaurant_forum.git

##### 專案套件安裝

```

1.使用終端機切換目錄到專案: SEM4-restaurant_forum
2.使用終端機安裝套件: npm install

```

#### 專案的「根目錄」新增 .env 這個檔案，參考 env example

> #### [圖片網站 Imgur](https://api.imgur.com/oauth2/addclient) 填寫資料取得 client ID

```

#### 修改 /config/config.json

```

- 修改 development mode 的設定，加入資料庫的名字與密碼,刪除 operatorsAliases

"development": {
"username": "root",
"password": "your password",
"database": "forum",
"host": "127.0.0.1",
"dialect": "mysql",
"operatorsAliases": false
}

```

#### 資料庫設定

##### 請在 MySQL Workbench 輸入下方指令

- 建立 forum 資料庫

```

drop database if exists forum;
create database forum;
use forum;

```

##### 建立 Users 和 restaurant table

- npx sequelize db:migrate

##### 建立種子資料

- npx sequelize db:seed:all

#### 執行程式

```

1. 終端機輸入: nodemon run dev
2. 開啟網頁輸入: http://localhost:3000/users/signin

```

## 主要功能

#### 網管理者:
##### 1. 只有網站管理者可以登入網站後台

##### 2. 網站管理者可以在後台管理餐廳的基本資料

##### 3. 網站管理者可以編輯使用權限

## 測試帳號

| Name  | Email             | Password | 預設權限 |
| ----- | ----------------- | -------- | -------  |
| root  | root@example.com  | 12345678 |  admin   |
| user1 | user1@example.com | 12345678 |  user    |
| user2 | user2@example.com | 12345678 |  user    |
```
