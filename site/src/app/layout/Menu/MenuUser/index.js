import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'
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

  const doSelMenu =(url)=>{
    if (url === '/logout') {
      store.delUser()
      navigate('/')
    }else{
      navigate(url)
    }
  }

  // console.log('user',user)
  
  return (
    <React.Fragment>
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