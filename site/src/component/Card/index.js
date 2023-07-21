import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import Rank from '@/component/Rank'
import classnames from 'classnames';
import s from './index.module.less';

import icon_map  from '@/img/icon/map.svg'
import icon_user  from '@/img/icon/user.svg'
import icon_calendar from '@/img/icon/calendar.svg'

import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_list  from '@/img/icon/list.svg'
import icon_play  from '@/img/icon/play.svg'
import icon_ord   from '@/img/icon/ord.svg'


const Card = ({ type,cat,sub_date,sub_user,addr,title,sub,period,view,fav,id }) => {
  
  const info = {
    lose: '迷子',
    find: '目撃',
    prot: '保護',
    note: '記事',
  }
  return (
    <div className={classnames(s.card,type)} data-type={info[type]}>
      <Rank id={id} />

      <div className={s.img}>
        {cat && cat.image && <img src={`https://im.ages.io/${cat.image}`} alt=''/>}
      </div>

      {(type!=='note') &&
      <div className={s.detail}>
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
      <div className={s.detail}>
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
            <i>{view?view.length:0}</i>
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