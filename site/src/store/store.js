import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {get,post} from '@/util/net.js'
import * as urls from '@/constant/urls'
import {fixBody} from '@/util/fn'
import axios  from 'axios'

const USER_KEY = 'NEKONARA_USER'

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  qa       = false
  user     = null
  edit     = false
  note     = false
  mobile   = false
  detail   = false
  loading  = false
  loginReq = false

  refresh  = false


  item    = {}

  reset =()=>{
    this.edit     = false
    this.detail   = false
    this.loading  = false
    this.loginReq = false
    this.qa       = false
  }


  setUser = (user) =>{
    this.user = user
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  getUser = ()=>{
    return JSON.parse(window.localStorage.getItem(USER_KEY))
  }

  delUser = ()=>{
    this.user = null
    window.localStorage.removeItem(USER_KEY)
  }

  setItem = (item) =>{
    this.item = item
  }

  setRefresh = () =>{
    this.refresh = !this.refresh
  }


  setShow =(status,attr)=> {
    fixBody(status)
    this[attr] = status
  }


  async post(url, params) {
    const r = await post(url,params)
    if (r.code === 0) {
      return r
    }else if (r.code ===1) {
      message.error(r.msg)
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


  async regUser(params) {
    return await this.post(urls.API_REG_USER,params)
  }


  async queryAll(params) {
    return await this.post(urls.API_QUERY_ALL,params)
  }


  async queryCats(params) {
    return await this.post(urls.API_QUERY_CATS,params)
  }

  async queryNote(params) {
    return await this.post(urls.API_QUERY_NOTE,params)
  }

  async queryQA(params) {
    return await this.post(urls.API_QUERY_QA,params)
  }

  

  async favNote(params) {
    return await this.post(urls.API_FAV_NOTE,params)
  }


  async saveUserInfo(params) {
    return await this.post(urls.API_SAVE_USERINFO,params)
  }

  async addQa(params) {
    return await this.post(urls.API_ADD_QA,params)
  }

  async replyQa(params) {
    return await this.post(urls.API_REPLY_QA,params)
  }


  async loadMsg(params) {
    return await this.post(urls.API_LOAD_MSG,params)
  }


  async saveContent(params) {
    return await this.post(urls.API_SAVE_CONTENT,params)
  }

  async closePost(params) {
    return await this.post(urls.API_CLOSE_POST,params)
  }




  async initChatId(params) {
    return await this.post(urls.API_INIT_CHAT_ID,params)
  }



  async login(params) {
    return await this.post(urls.API_LOGIN,params)
  }

  async uploadImg(params) {
    try {
        const r = await axios.post(urls.API_UPLOAD_IMG, params);
        if ((r.status ===200)&&(r.data.code ===0)) {
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