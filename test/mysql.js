import  mysql  from 'mysql'


console.time("executionTime");

const connection = mysql.createConnection({
  host     : '3.86.84.248', 
  user     : 'quanta', 
  password : 'Catjapan2023?', 
  database : 'cat' 
});

connection.connect();
connection.query('SELECT * FROM tab_user', function (error, results, fields) {
  if (error) throw error;
  console.log('data: ', results);

  console.timeEnd("executionTime");
});

connection.end();

