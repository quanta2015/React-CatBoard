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



const formatBold =(s)=>{
  let parts = s.split('**');
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<i class='bold'>${parts[i]}</i>`;
  }
  return parts.join('');
}

const formatLink=(s)=> {
  const regex = /&&(.+?)\[(.+?)\]&&/g;
  return s.replace(regex, (match, text, link) => `<a href="${link}">${text}</a>`);
}


const CardInfo = ({list,title,btn,event}) => {
  const { store } = React.useContext(MobXProviderContext)
  const [data,setData] = useState([])
  
  useEffect(()=>{
    const newList = list.map(item => ({
      ...item,
      sect: item.sect.map(o => formatLink(formatBold(o)))
    }));
    setData(newList)
  },[])

  

  return (
    <div className={s.cardinfo} >
     
      <h1>{title}</h1>

      <div className={s.list}>
        {data.map((item,i)=> 
          <div className={s.sect} key={i}>
            {item.icon && <img src={item.icon} />}
            <div className={s.p}>
              {item.sect.map((o,j)=>
                <p key={j} dangerouslySetInnerHTML={{ __html: o }} />
              )}
            </div>
          </div>
        )}
      </div>
      
      {btn && 
      <div className="btnIn" onClick={event}>ホームに戻る</div>}

    </div>
  )

}

export default observer(CardInfo)