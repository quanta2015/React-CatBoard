/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form, message} from 'antd';
import { now,publishMsg } from '@/util/fn';
import cls from 'classnames';
import {PRE_IMG} from '@/constant/urls'

import s from './index.module.less';

import up from '@/img/icon/up.svg'



const tabs = ['自分の投稿','他の投稿']

const Chat = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const { user } = store
  const [msg,setMsg] = useState('')
  const [sel,setSel] = useState(0)
  const [cid,setCid] = useState(-1)
  const [chat,setChat] = useState([[],[]]) 
  const [item,setItem] = useState(null) 
  // const [chat,setChat] = useState([]) 


  
  useEffect(()=>{

    if (!user) {
      navigate('/')
    }else{
      const params = {
        user_id: user.user_id
      }
      store.queryChat(params).then(r=>{
        console.log('取得データ',r)
        setChat(r.chat)
      })
    }
    
  },[])

  const doSelTab =(i)=>{
    setSel(i)
    setCid(-1)
    setItem(null)
  }

  const doSelChat =(i,item)=>{
    setCid(i)
    setItem(item)
  }

  const doSendMsg=()=>{
    let src
    if (sel === 0) {
      src = 'fr'
    }else{
      src = 'to'
    }

    if (msg!=='') {
      const { content,...rest } = item
      const newMsg = { src, msg, sub_date: now() }
      content.push(newMsg)
      const params = { ...rest, content };
      // console.log('params',params)
      store.saveChat(params).then(r=>{
        console.log('取得データ',r)
        const chatMsg = JSON.stringify({
          id: item.id,
          msg_type: 'chat',
          msg: newMsg,
        })
        publishMsg(chatMsg,store.client)
        setMsg('')
      })
    }else{
      message.info('请输入发送消息！')
    }
  }


  const handleKeyDown = (e) => {
    if (e.altKey && e.keyCode === 13) {
      doSendMsg()
    }
  }

  const doChgMsg =(e)=>{
    // console.log(msg)
    setMsg(e.currentTarget.value)
  }



  return (
    <div className={s.chat}>
      <div className={s.wrap}>
        <div className={s.chatNav}>
          <div className={s.tab}>
            {tabs.map((item,i)=>
              <li key={i} className={sel===i?'sel':''} onClick={()=>doSelTab(i)}>{item}</li>
              )}
          </div>
          <div className={s.list}>
            {chat[sel].map((item,i)=>
              <div key={i} 
                className={cls(s.chatItem, cid===i?'sel':'')} 
                onClick={()=>doSelChat(i,item)}
                >
                <div className={s.lt}>
                  <span>{item.cat_name}</span>
                  <img src={`${PRE_IMG}${item.cat_img}`} />
                </div>
                <div className={s.mid}>...</div>
                <div className={s.rt}>
                  <span>{item.to_name}</span>
                  <img src={`${item.to_icon[0]}`} />
                  <p></p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={s.chatBd}>

          {item?.content && item?.content.length>0 &&
          <div className={s.content}>
            {item.content.map((o,i)=>
              <div 
                key={i} 
                className={cls(
                  s.chatMsg,
                  sel === 0 ? o.src : (o.src === 'fr' ? 'to' : 'fr')
                )}>
                <img src={(o.src==='fr')?item.fr_icon[0]:item.to_icon[0]} />
                <p>{o.msg}</p>
              </div>
            )}

          </div>}
          <div className={s.bar}>
            <Input.TextArea 
              value={msg} 
              onChange={doChgMsg} 
              onKeyDown={handleKeyDown}
              style={{height: '80px'}}
              />
            <span className={s.btn} onClick={(e)=>doSendMsg(e)}><img src={up} /></span>
            
          </div>
        </div>
        
      </div>
    </div>
  )

}

export default  observer(Chat)