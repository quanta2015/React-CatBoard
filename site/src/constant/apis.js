var mode = process.env.NODE_ENV
let API_SERVER = 'http://localhost'



if (mode === 'development') {
  // API_SERVER = 'http://mqcai.top:9003'
  API_SERVER = 'http://localhost:9001'
}

if (mode === 'production') {
  API_SERVER = 'http://mqcai.top:9003'
}

export { API_SERVER }
export const MQTT_SERVER  = 'ws://121.40.124.170:1884'