import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import s from './index.module.less';


import icon_map from '@/img/icon/map.svg'
import icon_usr from '@/img/icon/user.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_lt  from '@/img/icon/left.svg'
import icon_rt  from '@/img/icon/right.svg'

const CardDetailCat = ({btnTxt,btnEvent}) => {
  const { store } = React.useContext(MobXProviderContext)

  const { user } = store
  const { cat,type,sub_date,sub_user,addr,title,sub,content,period,view,fav,id } = store.item
  const { age,attr,clr,image,img,name,sex,size,status } = cat


  const [sel,setSel] = useState(0)
  const [curImg,setCurImg] = useState(img[sel])

 
  const doSel =(step)=>{
    const len = img.length;
    const cur = (sel + step + len) % len;
    setSel(cur);
    setCurImg(img[cur]);
  }


  return (
    <div className={s.cardDetailCat}>
    
      <div className={s.hd}>
        <div className={s.item}>
          <img src={icon_usr} />
          {sub_user}
        </div>
        <div className={s.item}>
          <img src={icon_map} />
          {`${addr?.addr_ken}${addr?.addr_shi}${addr?.addr_dtl}`}
        </div>
        <div className={s.item}>
          <img src={icon_cal} />
          {sub_date}
        </div>
      </div>


      <div className={s.bd}>
        <div className={s.img}>
          <img className={s.arrow} src={icon_lt} onClick={()=>doSel(-1)} />
          <div className={s.list}>
            {img.map((item,i)=>
              <img src={`${PRE_IMG}${curImg}`} key={i} className={i===sel?'act':''} />
            )}
          </div>
          <img className={s.arrow} src={icon_rt} onClick={()=>doSel(1)} />
        </div>


        <div className={s.sig}>
          <div className={s.row}>
            <label>名前</label>
            <span>{name}</span>
          </div>
          <div className={s.row}>
            <label>毛色</label>
            <span>{clr}</span>
          </div>
          <div className={s.row}>
            <label>猫種</label>
            <span>{type}</span>
          </div>
          <div className={s.row}>
            <label>首輪</label>
            <span>青色の首輪</span>
          </div>
          <div className={s.row}>
            <label>性別</label>
            <span>{sex}</span>
          </div>
          <div className={s.row}>
            <label>年齢</label>
            <span>{age}</span>
          </div>
          <div className={s.row}>
            <label>大きさ</label>
            <span>{size}</span>
          </div>
        </div>


        <div className={s.com}>
          <div className={s.row}>
            <label>その他特徴</label>
            <p>{title}</p>
          </div>

          <div className={s.row}>
            <label>迷子になってしまった時の日時 </label>
            <p>２０２２年２月１４日　 ７時</p>
          </div>
          
          <div className={s.row}>
            <label>保護した時の状況</label>
            <p>{content}</p>
          </div>
        </div>

      </div>

      { user && 
      <div className={s.ft}>
        <div className={classnames(s.btn,type)} onClick={btnEvent}>{btnTxt}</div>
      </div>}
　
    </div>
  )

}

export default observer(CardDetailCat)