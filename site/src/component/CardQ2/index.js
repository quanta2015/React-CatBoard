import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import s from './index.module.less';
import Rank from '@/component/Rank'

import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_list  from '@/img/icon/list.svg'
import icon_play  from '@/img/icon/play.svg'
import icon_warn  from '@/img/icon/warn_lose.svg'

import icon_user  from '@/img/icon/userCircle.svg'



const CardQ2 = ({ user,desc,count,answer,qTitle,qDesc,qDate,id }) => {

  let clrList= ['#DCB35F','#BBB','#BB7744','#12264D'];

  
  return (
    <div className={s.cardq} >

      <Rank id={id} />

      <div className={s.hd}>
        
        <div className={s.p}>
          <img src={icon_user} />
          <div className={s.usr}>
            <span>{user}</span>
            <i>{desc}</i>
          </div>
        </div>
        <div className={s.sum}>
          <span>{count}</span>
          <i>いいね</i>
        </div>
        <div className={s.btn}>フォローする</div>
      </div>
      <div className={s.bd}>
        <div className={s.row}>
          <em style={{background:clrList[id-1]}}>A.</em>
          {answer}
        </div>
        <div className={s.row}>
          <em style={{background:clrList[id-1]}}>Q.</em>
          <h1>{qTitle}</h1>
          <span>{qDate}</span>
        </div>
        <div className={s.row}>
          <p>{qDesc}</p>
        </div>
      </div>
      
    </div>
  )

}

export default observer(CardQ2)