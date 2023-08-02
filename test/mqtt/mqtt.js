import  mqtt from 'mqtt'

// 连接到 MQTT 服务器
// const client = mqtt.connect('mqtt://47.99.143.102:1883');

const client = mqtt.connect('mqtt://13.231.192.200:1885');




client.on('connect', () => {
  console.log('Connected to MQTT broker.');

  const topic = '/cat/chat';
  const messages = ['Hello MQTT!', 'This is a random message.', 'Greetings from the MQTT client.'];

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully:', message);
      }
    });
  }, 2000); 
});


client.on('error', (err) => {
  console.error('Error:', err);
});
