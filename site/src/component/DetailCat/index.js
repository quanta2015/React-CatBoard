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

  const { user } = store
  const { board_id,cat,type,sub_date,sub_user,sub_icon,sub_user_id,addr,title,sub,content,period,view,fav,id } = store.item
  const { age,attr,clr,image,img,name,sex,size,status} = cat


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
    const params = {
      board_id,
      "board_id#user_fr": `${board_id}#${user.user_id}`,
      user_fr: user.user_id,
      icon_fr: user.icon[0],
      user_to: sub_user_id,
      icon_to: sub_icon,
      cat_name:name,
      cat_img: img[0],
    }
    console.log('msg',params)

    store.initChatId(params).then(r=>{

    })
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