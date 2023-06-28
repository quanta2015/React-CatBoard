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
    if (r.code === 0) {
      return r.data
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

  async queryParts(params) {
    return await this.post(urls.API_QUERY_PARTS,params)
  }

  async queryTable(params) {
    return await this.post(urls.API_QUERY_TABLE,params)
  }

  async saveTable(params) {
    return await this.post(urls.API_SAVE_TABLE,params)
  }

  async deleteRecord(params) {
    return await this.post(urls.API_DELETE_RECORD,params)
  }


  




}

export default new Store()