import React,{useState,useEffect} from 'react';import { observer,MobXProviderContext } from 'mobx-react'import classnames from 'classnames';import s from './index.module.less';import icon_map  from '@/img/icon/map.svg'import icon_user  from '@/img/icon/user.svg'import icon_calendar from '@/img/icon/calendar.svg'import icon_eye   from '@/img/icon/eye.svg'import icon_heart from '@/img/icon/heart.svg'import icon_list  from '@/img/icon/list.svg'import icon_play  from '@/img/icon/play.svg'import icon_warn  from '@/img/icon/warn.svg'import icon_ask  from '@/img/icon/ask.svg'const CardQ = ({ type,sub_date,sub_user,title,content,fav,clr,fit }) => {    const info = {    lost:'迷子',    find: '目撃',    prot: '保護',    note: '記事',  }  const RenderItem =(title,icon,info)=>(    <div className={s.iconItem}>      <div className={s.icon}>        <span>{title}</span>        <img src={icon} />      </div>      <span>{info.length}</span>    </div>  )    return (    <div className={s.cardq} style={{color:clr}}>      <div className={s.hd}>        <label style={{background:clr}}>{type}</label>        <i>回答</i>        <span>{content.length}</span>      </div>      <div className={s.bd}>        <div className={s.tl}>          <h1>{title}</h1>          <i>{sub_date.substr(0,10)}</i>        </div>        <p>{content}</p>        <div className={s.ft}>          {RenderItem('ユーザー名',icon_user,sub_user)}          {RenderItem('気になる',icon_warn,fav)}          <img src={icon_ask} style={{filter:fit}}/>        </div>      </div>          </div>  )}export default observer(CardQ)