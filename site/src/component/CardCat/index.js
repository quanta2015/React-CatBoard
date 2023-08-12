/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
// import { Button, Input,Select,message,Modal, Pagination} from 'antd';
// import cls from 'classnames';
import { PRE_IMG } from '@/constant/urls'
import { DEC_TYPE } from '@/constant/data'


import s from './index.module.less';

import icon_edit from '@/img/icon/edit.svg'
import icon_del from '@/img/icon/delete.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_map  from '@/img/icon/map.svg'




const CardCat = ({item,i,doEdit,doDel}) => {
  const { store } = React.useContext(MobXProviderContext) 

  const doShowDetail =()=>{
    store.subType = item.category==='迷子'?'lose':'prot'
    store.setItem(item)
    store.setShow(true,'detail')
  }

  return (
    <div className={s.itemCat} key={i} onClick={doShowDetail}>
      <label className={DEC_TYPE[item?.category]}>{item?.category}</label>
      <img src={`${PRE_IMG}${item?.cat?.img[0]}`} />
      <div className={s.info}>
        <div className={s.top}>
          <div className={s.row}>
            <label>名前</label>
            <span>{item?.cat?.name}</span>
          </div>
          <div className={s.row}>
            <label>年龄</label>
            <span>{item?.cat?.age}</span>
          </div>
          <div className={s.row}>
            <label>颜色</label>
            <span>{item?.cat?.clr}</span>
          </div>
          <div className={s.row}>
            <label>性别</label>
            <span>{item?.cat?.sex}</span>
          </div>
          <div className={s.row}>
            <label>大小</label>
            <span>{item?.cat?.size}</span>
          </div>
          <div className={s.row}>
            <label>种类</label>
            <span>{item?.cat?.type}</span>
          </div>
          
        </div>
        <div className={s.bottom}>
          <span><img src={icon_cal} />{item?.sub_date}</span>
          <span><img src={icon_map} />{item?.addr?.addr_ken}{item?.addr?.addr_shi}{item?.addr?.addr_dtl}</span>
          
          <div className={s.fn}>

            {doEdit &&
            <div className={s.btn} onClick={()=>doEdit(item)}><img src={icon_edit}/>修改</div>}

            {doDel && 
            <div className={s.btn} onClick={()=>doDel(item)}><img src={icon_del} />删除</div>}
          </div>
        </div>
      </div> 
    </div>
  )

}

export default  observer(CardCat)