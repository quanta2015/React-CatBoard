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


const CardInfo = ({title,list,submit}) => {
  const { store } = React.useContext(MobXProviderContext)
  
  

  return (
    <div className={s.cardinfo} >
     
      <h1>{title}</h1>

      <div className={s.list}>
        {list.map((item,i)=> 
          <div className={s.sect} key={i}>
            {item.icon && <img src={item.icon} />}
            <p>
              {item.sect.map((o,j)=>
                <span key={j}>{o}</span>
              )}
            </p>
          </div>
          
        )}
      </div>
        

    </div>
  )

}

export default observer(CardInfo)