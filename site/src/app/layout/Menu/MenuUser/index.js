import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'


import logo from '@/img/logo.svg'
import bell from '@/img/icon/bell.svg'
import chat from '@/img/icon/chat.svg'
import user from '@/img/icon/menu-user.svg'
import cat  from '@/img/icon/menu-cat.svg'
import edit from '@/img/icon/menu-edit.svg'
import logout from '@/img/icon/menu-logout.svg'


const MENU_USER = [{name: 'アカウント情報', icon:user, url:'/userInfo'},
                   {name: '猫ちゃん情報', icon:cat, url:'/catInfo'},
                   {name: '投稿内容 確認 / 編集 / 削除', icon:edit, url:'/edit'},
                   {name: 'ログアウト', icon:logout, url:'/logout'},]


const MenuUser = ({user}) => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)


  const doSelMenu =(url)=>{

    if (url === '/logout') {
      store.setUser(null)
      navigate('/')
    }else{
      navigate(url)
    }
    
  }
  
  return (
    <div className={s.menuUser}>
      <div className={s.item}>
        <img src={chat} />
        <i className={s.sp}></i>
      </div>
      <div className={s.item}>
        <img src={bell} />
      </div>
      <div className={s.item}>
        <img src={user?.icon[0]} />

        <div className={s.menuSub}>
          <div className={s.wrap}>
            {MENU_USER.map((item,i)=>
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