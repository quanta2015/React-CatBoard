import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'
import {formatTime} from '@/util/fn'
import { Tooltip } from 'antd';


import bell from '@/img/icon/bell.svg'
import chat from '@/img/icon/chat.svg'
import user from '@/img/icon/menu-user.svg'
import cat  from '@/img/icon/menu-cat.svg'
import edit from '@/img/icon/menu-edit.svg'
import flag from '@/img/icon/menu-flag.svg'
import logout from '@/img/icon/menu-logout.svg'


const MENU_USER = [{name: 'アカウント情報', icon:user, url:'/userInfo', type:1},
                   // {name: '猫ちゃん情報', icon:cat, url:'/catInfo', type:1},
                   {name: '投稿内容 確認 / 編集 / 削除', icon:edit, url:'/edit', type:1},
                   {name: '保存した情報・記事をみる', icon:flag, url:'/edit', type:0},
                   {name: 'ログアウト', icon:logout,url:'/logout',type:1}, ]


const MenuUser = ({user}) => {

  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const type = store.user?parseInt(store.user?.user_type):1
  const menu = MENU_USER.filter(o=> o.type>=type)

  const [msgs,setMsgs] = useState([])

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
        setMsgs(r.data)
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
      setMsgs(r.data)
      store.setItem(item)

      if (item.msg_type === "いいね") {
        store.setShow(true,'note')
      }else{
        store.setShow(true,'qa')
      }
      
    })
  }
  
  return (
    <React.Fragment>
    <div className={s.menuUser}>
      <div className={s.item}>
        <img src={chat} />
        <i className={s.sp}></i>
      </div>
      <div className={s.item}>
        <img src={bell} />

        {(msgs.length>0) && <i className={s.sp}></i> }

        {(msgs.length>0) && 
        <div className={s.menuSub}>
          <div className={s.wrap}>
            {msgs.map((item,i)=>
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
                {i === 0 ? 
                  <Tooltip title="確認 / 編集 / 削除ができます " placement="bottom">
                    <span>{item.name}</span>
                  </Tooltip> :
                  i === 1 ?
                  <Tooltip title="確認 / 編集 / 削除ができます " placement="bottom">
                    <span>{item.name}</span>
                  </Tooltip> :
                  <span>{item.name}</span>
                }
              </div>
              )}
            </div>
        </div>
      </div>

    </div>
    </React.Fragment>
  )

}

export default observer(MenuUser)