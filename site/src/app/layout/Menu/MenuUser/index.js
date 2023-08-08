import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import { message,notification } from 'antd'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import {MENU_USER} from '@/constant/data'
import {formatTime,clone} from '@/util/fn'
import mqtt from "mqtt";
import {MQTT_SERVER} from '@/constant/apis'
import * as urls from '@/constant/urls'
import s from './index.module.less';


import bell from '@/img/icon/bell.svg'
import chat from '@/img/icon/chat.svg'





const MenuUser = ({user}) => {

  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const type = store.user?parseInt(store.user?.user_type):1
  const menu = MENU_USER.filter(o=> o.type>=type)
  const [msgs,setMsgs] = useState([])


  useEffect(() => {
    const client = mqtt.connect(MQTT_SERVER);
    store.client = client
    const onConnect = () => {
      console.log('Connected to MQTT SERVER.');
      client.subscribe(urls.TOPIC);
    };

    client.on('error', (err) => {
      console.error('Error:', err);
    });

    const procSysMsg =(msg)=>{
      const { user_id } = store.user;
      if (msg.to === user_id) {
        let m = clone(store.msgs)
        const exist = m.some(item => item.mid === msg.mid);

        if (!exist) {
          m.push(msg)
          store.setMsgs([...m])
          message.info('您有新的短消息')
        }
      }
    }


    const addChatMsg =(id,msg)=>{
      const chat = clone(store.chat)
      chat[0].map(o=>{
        if (o.id===id) {
          o.content.push(msg)
          o.unread += 1
        }
      })
      chat[1].map(o=>{
        if (o.id===id) {
          o.content.push(msg)
          o.unread += 1
        }
      })
      store.setChat([...chat])
    }


    const procChatMsg =(m)=>{
      const { id, msg} = m

      if (store.chatItem) {
        console.log()
        if (store.chatItem.id === id) {
          const chatItem = clone(store.chatItem)
          chatItem.content.push(msg)
          store.setChatItem(chatItem)
        }else{
          addChatMsg(id,msg)
        }
      }else{
        addChatMsg(id,msg)
      }
    }


    const onMessage = (top, msg) => {
      let _msg = JSON.parse(msg.toString())


      if (_msg.msg_type==='chat') {
        procChatMsg(_msg)
      }else{
        procSysMsg(_msg)
      }
    };

    client.on('connect', onConnect);
    client.on('message', onMessage);

    // 清除事件监听器
    return () => {
      client.off('connect', onConnect);
      client.off('message', onMessage);
    };
  }, []); 


  useEffect(()=>{
    if (!user) {
      navigate('/')
    }else{
      // 获取聊天列表
      const params = {
        user_id: user.user_id
      }
      store.queryChat(params).then(r=>{
        console.log('取得データ',r)
        store.setChat(r.chat)
      })
    }
  },[])


  const doSelMenu =(url)=>{
    if (url === '/logout') {
      store.delUser()
      navigate('/')
    }else{
      navigate(url)
    }
  }


  useEffect(()=>{
    const params = {
      user_id: user.user_id
    }
    store.loadMsg(params).then(r=>{
      if (r.code ===0) {
        console.log('msg data:',r.data)
        // setMsgs(r.data)
        store.setMsgs(r.data)
      }
    })
  },[])

  const formatMsg =(item,msg='')=>{
    switch(item.msg_type) {
      case '回答': msg = ['質問','回答'];break;
      case '返信': msg = ['質問','返信'];break;
      case 'いいね': msg = ['回答','いいね'];break;
    }
    return (
      <>
        <em>{item.user_name}</em>
        <i>さんがあなたの{msg[0]}に<em>{msg[1]}</em>しました。</i>
      </>
    )
  }


  const doShowMsg =(item)=>{
    // console.log(item,'msg')
    const { user_id } =  user
    const { mid } = item
    store.readMsg({mid,user_id}).then(r=>{
      store.setMsgs(r.data)

      store.setItem(item)

      if (item.msg_type === "いいね") {
        store.setShow(true,'note')
      }else{
        store.setShow(true,'qa')
      }
    })
  }
  
  return (
    <div className={s.menuUser}>
      <div className={s.item} onClick={()=>navigate('/chat')}>
        <img src={chat} />
        <i className={s.sp}> 
          {store.chat[0].reduce((s, o) => s + o.unread, 0)+ store.chat[1].reduce((s, o) => s + o.unread, 0)}
        </i>
      </div>
      <div className={s.item}>
        <img src={bell} />

        {(store.msgs.length>0) && <i className={s.sp}>{store.msgs.length}</i> }

        {(store.msgs.length>0) && 
        <div className={s.menuSub}>
          <div className={s.wrap}>
            {store.msgs.map((item,i)=>
              <div className={s.msgItem} onClick={()=>doSelMenu(item.url)} key={i}>
                <img src={item.fr_icon} />
                <p>
                  <span>{formatMsg(item)}</span>
                  <span onClick={()=>doShowMsg(item)}>{item.msg_title}</span>
                </p>
                <em>{formatTime(item.msg_date)}</em>
              </div>
            )}
          </div>
        </div>}
      </div>
      <div className={s.item}>
        <img src={user?.icon[0]} />

        <div className={s.menuSub}>
          <div className={s.wrap}>
            {menu.map((item,i)=>
              <div className={s.menuItem} onClick={()=>doSelMenu(item.url)} key={i}>
                <img src={item.icon} />
                <span>{item.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )

}

export default observer(MenuUser)