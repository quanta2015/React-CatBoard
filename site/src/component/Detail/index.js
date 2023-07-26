import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import s from './index.module.less';


import icon_map  from '@/img/icon/map.svg'
import icon_usr from '@/img/icon/user.svg'
import icon_cal  from '@/img/icon/calendar.svg'


const Detail = ({}) => {
  const { store } = React.useContext(MobXProviderContext)

  const { cat,sub_date,sub_user,addr,title,sub,period,view,fav,id } = store.item
  const { age,attr,clr,image,img,name,sex,size,type,status } = cat


  const [sel,setSel] = useState(0)

  const doClose =()=>{
    store.setShow(false,'detail')
  }


  return (
    <div className={s.detail} >

      <div className={s.main}>
        <div className={s.close} onClick={doClose}></div>


        <div className={s.wrap}>

          
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
              <img src={`${PRE_IMG}${cat.img[0]}`} />
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
                <p>尻尾が短いです。サクラ耳です。痩せています。とても大人しくてフレンドリーな猫ちゃんです。</p>
              </div>
              
              <div className={s.row}>
                <label>保護した時の状況</label>
                <p>近所で座り込んでいるのを見つけました。普段見ない猫ちゃんなので近寄ってみたら懐いてくれました。元気がなさそうだったでドライフードを与えてみましたが、中々食べてくれません。今は自宅の中で保護しています。</p>
              </div>
            </div>

          </div>

          <div className={s.ft}>
            
            <div className={s.btn}>
              メッセージを送る
            </div>
          </div>
  　
        </div>
      </div>
    </div>
  )

}

export default observer(Detail)