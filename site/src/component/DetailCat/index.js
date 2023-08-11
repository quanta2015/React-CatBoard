import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { message } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import { scrollToTop,cfm } from '@/util/fn'
import CardDetailCat from '@/component/CardDetailCat'
import s from './index.module.less';


import icon_map from '@/img/icon/map.svg'
import icon_usr from '@/img/icon/user.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_lt  from '@/img/icon/left.svg'
import icon_rt  from '@/img/icon/right.svg'

const Detail = ({}) => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)

  const { user } = store
  const { board_id,cat,type,sub_date,sub_user,sub_icon,sub_user_id,addr,title,sub,content,period,view,fav,id,close } = store.item
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




  const doInitChatId =()=>{
    const params = {
      board_id,
      user_fr: sub_user_id,
      user_to: user.user_id,
      cat_name:name,
      cat_img: img[0],
    }
    

    store.initChatId(params).then(r=>{
      // console.log('CHAT IT',r)
      scrollToTop()
      store.setShow(false,'detail')
      navigate('/chat')
    })
  }


  const doClosePost =async()=>{
    store.setShow(true,'loading')
    store.closeBoard({board_id}).then(r=>{
      // console.log(r.data)
      store.setShow(false,'loading')
      // store.setShow(false,'detail')
      message.info(r.msg)
      store.setItem(r.data)
      store.setRefresh()
    })
  }


  const doConfirm =()=>{
    cfm('本当に投稿を閉じるには',doClosePost)
  }


  return (
    <div className={s.detail} >

      <div className={s.main}>
        <div className={s.mainWrap}>
          <div className={'del'} onClick={doClose}></div>
          {user.user_id === sub_user_id  && close===0 &&
            <div className={s.stop} onClick={doConfirm}>締め切る</div>}


          <CardDetailCat btnTxt={'メッセージを送る'} btnEvent={doInitChatId}/>
        </div>
      </div>
    </div>
  )

}

export default observer(Detail)