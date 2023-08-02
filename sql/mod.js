import mysql from 'mysql'

// MySQL 连接配置
const dbConfig = {
  host: '121.40.124.170',
  port: 3306,
  database: 'cat',
  user:     'hznu',
  password: 'hangzhou_2023_liyang_!!!',
};

// 连接到 MySQL
const connection = mysql.createConnection(dbConfig);

// 查询 tab_board 表的所有记录
const queryAllRecords = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tab_board';
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// 更新 tab_board 表的 cat 字段
const updateCatField = (id, cat) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tab_board SET cat = ? WHERE id = ?';
    connection.query(sql, [JSON.stringify(cat), id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// 随机从数组中选择一个元素
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// 主函数，处理所有记录的 cat 字段
const processRecords = async () => {
  try {
    // 获取所有记录
    const records = await queryAllRecords();

    // 遍历每个记录，处理 cat 字段
    for (const record of records) {
      // 将 cat 字段解析为 JSON 对象
      const catObj = JSON.parse(record.cat);

      // 随机替换 img 属性
      const imgList = ['AGfqLiN7l2','zGfqLiN7l2','B9FRJiN7l2','LuZ8KiN7l2','LJ1wKiN7l2','KuZ8KiN7l2','UTW8KiN7l2','KoDBJiN7l2','81dEKiN7l2','tv7tJiN7l2','PiXtJiN7l2','YDwhLiN7l2','IFj7KiN7l2','OiXtJiN7l2','L99NKiN7l2','5fiqLiN7l2','XDwhLiN7l2','picYIiN7l2','y9ZvKiN7l2','OXMRJiN7l2']; // 替换用的数组
      catObj.img = [getRandomElement(imgList)];

      // 更新数据库记录
      await updateCatField(record.id, catObj);
    }

    console.log('Successfully updated cat field for all records.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // 关闭数据库连接
    connection.end();
  }
};

// 执行主函数
processRecords();
