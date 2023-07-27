import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'

import logo from '@/img/logo.svg'
import bell from '@/img/icon/bell.svg'
import chat from '@/img/icon/chat.svg'


const fun  = [{name:'新規登録',url:'/reg'},
              {name:'ログイン',url:'/login'}]


const menu = [{name:'ホーム',url:'/'},
              {name:'迷子情報',url:'/cat?type=lose'},
              {name:'保護情報',url:'/cat?type=prot'},
              {name:'ねこ記事',url:'/note'},
              {name:'Q&A',url:'/qa'},
              {name:'お問い合わせ',url:'/ask'}]


const Menu = ({}) => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  
 
  const [sel,setSel] = useState(0)
  const [user,setUser] = useState(store.user)


  useEffect(()=>{
    setUser(store.user)
  },[store.user])


  const doSelMenu =(i,url)=>{
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

  console.log(user,'user')


  const renderUser =()=>(
    <div className={s.user}>
      <div className={s.item}>
        <img src={chat} />
      </div>
      <div className={s.item}>
        <img src={bell} />
      </div>
      <div className={s.item}>
        <img src={user?.icon} />
      </div>

    </div>
  )
  
  
  return (
    <div className={s.menu}>
      <div className={s.fn}>

        { user ? renderUser():renderLogin() }

        <i>アプリをダウンロード</i>
      </div>

      <div className={s.logo}>
        <img src={logo} alt="logo" />
      </div>
      
      <div className={s.list}>
        {menu.map((item,i)=>
          <div className={s.item} key={i}>
            <span className={sel===i?'sel':''} onClick={()=>doSelMenu(i,item.url)}>{item.name}</span>
          </div>
        )}
      </div>
    </div>
  )

}

export default observer(Menu)