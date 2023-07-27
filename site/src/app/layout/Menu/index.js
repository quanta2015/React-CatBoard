import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'

import MenuUser from './MenuUser'

import logo from '@/img/logo.svg'
import bell from '@/img/icon/bell.svg'
import chat from '@/img/icon/chat.svg'

import user from '@/img/icon/menu-user.svg'
import cat  from '@/img/icon/menu-cat.svg'
import edit from '@/img/icon/menu-edit.svg'
import logout from '@/img/icon/menu-logout.svg'

const fun  = [{name:'新規登録',url:'/reg'},
              {name:'ログイン',url:'/login'}]


const MENU_MAIN = [{name:'ホーム',url:'/'},
                   {name:'迷子情報',url:'/cat?type=lose'},
                   {name:'保護情報',url:'/cat?type=prot'},
                   {name:'ねこ記事',url:'/note'},
                   {name:'Q&A',url:'/qa'},
                   {name:'お問い合わせ',url:'/ask'}]

const MENU_USER = [{name: 'アカウント情報', icon:user, url:'/userInfo'},
                   {name: '猫ちゃん情報', icon:cat, url:'/catInfo'},
                   {name: '投稿内容 確認 / 編集 / 削除', icon:edit,url:'/edit'},
                   {name: 'ログアウト', icon:logout,url:'/logout'},]


const Menu = ({}) => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  
  const [sel,setSel] = useState(0)
  const [user,setUser] = useState(store.user)


  useEffect(()=>{
    setUser(store.user)
  },[store.user])
  
  

  const doSelMenu =(i,url)=>{
    store.reset()
    setSel(i)
    navigate(url)
  }
  

  const renderLogin =()=>(
    <div className={s.login}>
      {fun.map((item,i)=>
        <span key={i} onClick={()=>doSelMenu(i,item.url)}>{item.name}</span>
      )}
    </div>
  )
  
  return (
    <div className={s.menu}>
      <div className={s.fn}>

        { user ? <MenuUser user={user} />:renderLogin() }

        <i>アプリをダウンロード</i>
      </div>

      <div className={s.logo}>
        <img src={logo} alt="logo" />
      </div>
      
      <div className={s.list}>
        {MENU_MAIN.map((item,i)=>
          <div className={s.item} key={i}>
            <span className={sel===i?'sel':''} onClick={()=>doSelMenu(i,item.url)}>{item.name}</span>
          </div>
        )}
      </div>
    </div>
  )

}

export default observer(Menu)