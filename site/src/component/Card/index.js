import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import Rank from '@/component/Rank'
import classnames from 'classnames';
import s from './index.module.less';
import {PRE_IMG} from '@/constant/urls'
import {INF_TYPE} from '@/constant/data'


import icon_map  from '@/img/icon/map.svg'
import icon_user  from '@/img/icon/user.svg'
import icon_calendar from '@/img/icon/calendar.svg'

import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_list  from '@/img/icon/list.svg'
import icon_play  from '@/img/icon/play.svg'
import icon_ord   from '@/img/icon/ord.svg'


const Card = (item) => {
  const { store } = React.useContext(MobXProviderContext)
  const { type,cat,sub_date,sub_user,addr,title,sub,period,see,fav,id } = item
  
  

  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,(type==='note')?'note':'detail')
  }



  return (
    <div className={classnames(s.card,type)} data-type={INF_TYPE[type]} onClick={()=>doShowDetail(item)}>
      <Rank id={id} />

      <div className={s.img}>
        {cat && <img src={`${PRE_IMG}${cat.img[0]}`} alt=''/>}
      </div>

      {(type!=='note') &&
      <div className={s.detail} >
        <div className={s.row}>
          <img src={icon_map} />
          <span>{addr.addr_ken}{addr.addr_shi}{addr.addr_dtl}</span>
        </div>
        <div className={s.row}>
          <img src={icon_user} />
          <span>{sub_user}</span>
        </div>
        <div className={s.row}>
          <img src={icon_calendar} />
          <span>{sub_date}</span>
        </div>
      </div>}


      {(type==='note') &&
      <div className={s.detail}  >
        <div className={s.row}>
          <h1>{title}</h1>
        </div>
        <div className={s.row}>
          <h2>{sub}</h2>
        </div>
        <div className={s.row}>
          <div className={s.play}>
            <img src={icon_play} />
            {period}
          </div>
          <em>{sub_date}</em>
        </div>
        <div className={s.row}>
          <div className={s.item}>
            <p>
              <label>閲覧</label> 
              <img src={icon_eye} />
            </p>
            <i>{see?see.length:0}</i>
          </div>
          
          <div className={s.item}>
            <p>
              <label>あとで見る</label> 
              <img src={icon_list} />
            </p>
            
          </div>

          <div className={s.item}>
            <p>
              <label>いいね</label> 
              <img src={icon_heart} />
            </p>
            <i>{fav?fav.length:0}</i>
          </div>
          
        </div>
      </div>}
      
      
    </div>
  )

}

export default observer(Card)