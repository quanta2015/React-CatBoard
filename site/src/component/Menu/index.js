import React,{useState,useEffect} from 'react';
import { inject,observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import { useNavigate } from 'react-router-dom'

import logo from '@/img/logo.svg'


const fun  = ['新規登録','ログイン','アプリをダウンロード']
const menu = ['ホーム','迷子情報','保護情報','ねこ記事','Q&A','お問い合わせ']

const Menu = ({}) => {
  const { store } = React.useContext(MobXProviderContext)
  const [sel,setSel] = useState(0)


  const doSelMenu =(i)=>{
    setSel(i)
  }
  
  const doClickHome=()=>{
    store.setEdit(false);
    store.setLoginRequired(false);
  }
  const doClick=()=>{
    store.setEdit(true)
  }

  const loginRequired=()=>{
    console.log('ddd')
    store.setLoginRequired(true)
  }
  
  return (
    <div className={s.menu}>
      <div className={s.fn}>
        {fun.map((item,i)=>
          <span key={i}>{item}</span>
        )}
      </div>

      <div className={s.logo}>
        <img src={logo} alt="logo" />
      </div>
      
      <div className={s.list}>
      {menu.map((item, i) =>
        <div className={s.item} key={i}>
          <span
            className={sel === i ? 'sel' : ''}
            onClick={() => {
              if(i === 0){
                doClickHome()
              }
              if (i === 1) {
                loginRequired();  
              }
              if (i === 2) {
                doClick();  
              }
              doSelMenu(i);
            }}
          >
            {item}
          </span>
        </div>
      )}
</div>
    </div>
  )

}

export default inject('store')(observer(Menu))