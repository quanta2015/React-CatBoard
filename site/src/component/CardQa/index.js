/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
// import { Button, Input,Select,message,Modal, Pagination} from 'antd';
// import cls from 'classnames';
import { PRE_IMG } from '@/constant/urls'
import { DEC_TYPE } from '@/constant/data'


import s from './index.module.less';

import icon_cal from '@/img/icon/calendar.svg'
import icon_map  from '@/img/icon/map.svg'
import icon_ques  from '@/img/icon/question.svg'
import icon_edit from '@/img/icon/edit.svg'
import icon_del from '@/img/icon/delete.svg'

const CardQa = ({item,i,doEditQa,showDeleteConfirm}) => {

  return (
    <div className={s.itemQa} key={i}>
      <label className={DEC_TYPE[item?.category]}>{item?.category}</label>
      <img src={icon_ques} />
      <div className={s.info}>
        <div className={s.bd}>
          <h1>{item?.title}</h1>
          <p>{item?.content?.cnt}</p>
          
        </div>
        <div className={s.bottom}>
          <span><img src={icon_cal} />{item?.sub_date}</span>
          <span><img src={icon_map} />{item?.addr?.addr_ken}{item?.addr?.addr_shi}{item?.addr?.addr_dtl}</span>
          
          <div className={s.fn}>
            <div className={s.btn} onClick={()=>doEditQa(item)}><img src={icon_edit} />修改</div>
            <div className={s.btn} onClick={()=>showDeleteConfirm(item)}><img src={icon_del} />删除</div>
          </div>
        </div>
      </div> 
    </div>
  )

}

export default  observer(CardQa)