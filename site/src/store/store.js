import React from 'react';
import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {get,post} from '@/util/net.js'
import * as urls from '@/constant/urls'
import {fixBody,clone,scrollToTop} from '@/util/fn'
import axios  from 'axios'



const USER_KEY = 'NEKONARA_USER'






class Store {
  constructor() {
    makeAutoObservable(this);
  }

  client   = null
  user     = null
  collect  = null
  mobile   = false
  loading  = false

  qa       = false
  edit     = false
  note     = false
  detail   = false
  refresh  = false
  addNote  = false
  loginReq = false
  subType  = null


  chat     = [[],[]]
  chatItem = null

  msgs     = []
  item     = {}

  reset =()=>{
    scrollToTop()
    this.edit     = false
    this.note     = false
    this.detail   = false
    this.loading  = false
    this.loginReq = false
    this.qa       = false
    this.addNote  = false
  }


  setChat =(chat)=>{ this.chat = chat }
  setChatItem =(chatItem)=>{ this.chatItem = chatItem }

  setMsgs =(msgs)=>{
    this.msgs = msgs
  }

  setCollect = (collect)=>{
    this.collect = collect
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


  isCollect = (board_id) => {
    return this.collect.some(item => item.board_id === board_id)
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


  async login(params) {
    const r = await post(urls.API_LOGIN,params)
    if (r) {
      return r
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


  async queryByMe(params) {
    return await this.post(urls.API_QUERY_BY_ME,params)
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

  async saveQa(params) {
    return await this.post(urls.API_SAVE_QA,params)
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


  async closeBoard(params) {
    return await this.post(urls.API_CLOSE_BOARD,params)
  }

  async readMsg(params) {
    return await this.post(urls.API_READ_MSG,params)
  }




  async initChatId(params) {
    return await this.post(urls.API_INIT_CHAT_ID,params)
  }

  async queryChat(params) {
    return await this.post(urls.API_QUERY_CHAT,params)
  }

  async saveChat(params) {
    return await this.post(urls.API_SAVE_CHAT,params)
  }


  async resetUnread(params) {
    return await this.post(urls.API_RESET_UNREAD,params)
  }

  async addQuestion(params) {
    return await this.post(urls.API_ADD_QUESTION,params)
  }

  async queryQuestion(params) {
    return await this.post(urls.API_QUERY_QUESTION,params)
  }

  async saveNote(params) {
    return await this.post(urls.API_SAVE_NOTE,params)
  }

  async deleteBoard(params) {
    return await this.post(urls.API_DEL_BOARD,params)
  }

  


  async saveCat(params) {
    return await this.post(urls.API_SAVE_CAT,params)
  }

  async saveCollect(params) {
    return await this.post(urls.API_SAVE_COLLECT,params)
  }


  async queryCollect(params) {
    return await this.post(urls.API_QUERY_COLLECT,params)
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