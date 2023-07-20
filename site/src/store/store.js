import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {get,post} from '@/util/net.js'
import * as urls from '@/constant/urls'


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  mobile = false


  async post(url, params) {
    const r = await post(url,params)
    if (r.code === 200) {
      return r
    }else{
      return null
      message.error(' 网络接口数据出错!')
    }
  }

  async get(url, params) {
    const r = await get(url,params)
    if (r.code === 0) {
      return r.data
    }else{
      return null
      message.error(' 网络接口数据出错!')
    }
  }

  async queryCats(params) {
    return await this.post(urls.API_QUERY_CATS,params)
  }

  async queryLatest(params) {
    return await this.post(urls.API_QUERY_LATEST,params)
  }
  
  async querySubDate(params) {
      return await this.post(urls.API_QUERY_LATEST_SUB_DATE,params)
    }




}

export default new Store()