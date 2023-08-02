import  mqtt from 'mqtt'

// 连接到 MQTT 服务器
// const client = mqtt.connect('mqtt://47.99.143.102:1883');
const client = mqtt.connect('mqtt://13.231.192.200:1885');





// 处理连接和错误事件
client.on('connect', () => {
  console.log('Connected to MQTT broker.');

  client.subscribe('hoso/vehicle/data');
});

client.on('error', (err) => {
  console.error('Error:', err);
});


client.on("message", function(top, msg) {
  

  let m = JSON.parse(msg.toString())

  console.log(m)
});