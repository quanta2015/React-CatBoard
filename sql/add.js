import mysql from 'mysql2'
import {dataList}  from './data.js'

// 创建数据库连接池
const pool = mysql.createPool({
  host: '121.40.124.170',
  port: 3306,
  database: 'cat',
  user:     'hznu',
  password: 'hangzhou_2023_liyang_!!!',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// 插入数据的SQL语句
const insertSql = 'INSERT INTO tab_board SET ?';

// 执行插入操作
dataList.forEach(data => {
  pool.query(insertSql, data, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully:', result);
    }
  });
});

// 关闭数据库连接池（可选）
// pool.end();
