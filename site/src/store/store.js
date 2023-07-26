import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {get,post} from '@/util/net.js'
import * as urls from '@/constant/urls'
import {fixBody} from '@/util/fn'
import axios  from 'axios'



class Store {
  constructor() {
    makeAutoObservable(this);
  }

  edit    = false
  mobile  = false
  detail  = false
  loading = false
  loginRequired = false


  item    = {}


  setItem = (item) =>{
    this.item = item
  }


  setShow =(status,attr)=> {
    fixBody(status)
    this[attr] = status
  setEdit =(edit)=> {
    console.log('edit',edit)
    fixBody(edit)
    this.edit = edit
  }

  setLoginRequired =(loginRequired)=>{
    console.log('loginRequired',loginRequired)
    fixBody(loginRequired)
    this.loginRequired = loginRequired
  }


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

  async uploadImg(params) {
    try {
        const r = await axios.post(urls.API_UPLOAD_IMG, params);
        if ((r.status ===200)&&(r.data.code ===200)) {
          return r.data.data.id
        }
        return r;
    } catch (error) {
      message.error('文件上传失败！')
      console.error('File upload error: ', error);
    }
  }

}

export default new Store()