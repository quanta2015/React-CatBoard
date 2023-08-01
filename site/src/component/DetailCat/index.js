import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import CardDetailCat from '@/component/CardDetailCat'
import s from './index.module.less';


import icon_map from '@/img/icon/map.svg'
import icon_usr from '@/img/icon/user.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_lt  from '@/img/icon/left.svg'
import icon_rt  from '@/img/icon/right.svg'

const Detail = ({}) => {
  const { store } = React.useContext(MobXProviderContext)

  const { cat,type,sub_date,sub_user,addr,title,sub,content,period,view,fav,id } = store.item
  const { age,attr,clr,image,img,name,sex,size,status } = cat


  const [sel,setSel] = useState(0)
  const [curImg,setCurImg] = useState(img[sel])

  const doClose =()=>{
    store.setShow(false,(type==='note')?'note':'detail')
  }


  const doSel =(step)=>{
    const len = img.length;
    const cur = (sel + step + len) % len;
    setSel(cur);
    setCurImg(img[cur]);
  }

  const doSendMsg =()=>{
    // console.log('msg')
  }

  return (
    <div className={s.detail} >

      <div className={s.main}>
        <div className={'del'} onClick={doClose}></div>


        <CardDetailCat btnTxt={'メッセージを送る'} btnEvent={doSendMsg}/>


      </div>
    </div>
  )

}

export default observer(Detail)