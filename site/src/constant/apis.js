var mode = process.env.NODE_ENV
let API_SERVER = 'http://localhost'



if (mode === 'development') {
  API_SERVER = 'http://mqcai.top:9001'
  // API_SERVER = 'http://localhost'
}

if (mode === 'production') {
  API_SERVER = 'http://mqcai.top:9001'
}

export { API_SERVER }
