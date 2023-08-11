import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,message } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import {formatTime,publishMsg,clone} from '@/util/fn'
import s from './index.module.less';


import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_clock from '@/img/icon/clock.svg'
import icon_flag from '@/img/icon/menu-flag.svg'
import icon_face from '@/img/icon/facebook.svg'
import icon_twwi from '@/img/icon/twwi.svg'


const caluFav =(user,fav)=> fav.includes(user.mail)


const DetailNote = ({}) => {
  const { store } = React.useContext(MobXProviderContext)
  const { user } = store
  const my_id = user.user_id
  const my_icon = user.icon[0]
  const { cat,type,sub_date,sub_user,sub_user_id,content,title,see,fav,board_id } = store.item
  const { age,attr,clr,image,img,name,sex,size,status } = cat

  const [isFav,setIsFav] = useState(false)
  const [sel,setSel] = useState(0)
  const [curImg,setCurImg] = useState(img[sel])

  const doClose =()=>{
    store.setShow(false,'note')
  }

  useEffect(()=>{ 
    setIsFav(user?caluFav(user,fav):false)
  },[])


  const doSel =(step)=>{
    const len = img.length;
    const cur = (sel + step + len) % len;
    setSel(cur);
    setCurImg(img[cur]);
  }


  const doFav=()=> {
    let _fav
    const { mail } = user
    if (isFav) {
      _fav = fav.filter(o => o !== mail);
    }else{
      _fav = [...fav,mail]
    }
    const params ={
      board_id,
      sub_date,
      fav: _fav,
      favCount: _fav.length,
      fr: my_id,
      to: sub_user_id,
      icon: my_icon,
      type: 'いいね',
      isFav: isFav?1:0,
      title,
    }
    store.favNote(params).then(r=>{
      console.log('favmsg',r)

      if (!isFav) {
        console.log('favmsg',r.data[0])
        const msg = JSON.stringify(r.data[0]) 
        publishMsg(msg,store.client)
      }
      message.info(r.msg)
      setIsFav(!isFav)
    })
  }


  const doCollect=()=>{
    const params ={
      board_id,
      user_id: my_id,
    }
    store.saveCollect(params).then(r=>{
      console.log('collect',r)
      store.setCollect(r.data)
      message.info(r.msg)
    })
  }


  // console.log(clone(store.collect),'coll')

  // console.log(store.isCollect(board_id))




  return (
    <div className={s.detailNote} >

      <div className={s.main} >
        
        <div className={s.wrap}>
          <div className={'del'} onClick={doClose}></div>


          <div className={s.bd}>
            <div className={s.img}>
              <img src={`${PRE_IMG}${curImg}`}  />
            </div>
            
            <h1>{title}</h1>

            <h2>{sub_date}</h2>
            <div className={s.desc}>
              <p>
                <img src={icon_clock} />
                <span>{formatTime(sub_date)}</span>
              </p>
              <p>
                <img src={icon_eye} />
                <span>{see.length} views</span>
              </p>
              <p>
                <img src={icon_heart} />
                <span>いいね {fav.length}</span>
              </p>
            </div>

            <div className={s.content}>
              {content.cnt}
            </div>

            {user &&
            <div className={s.ft}>
              <p onClick={doFav}>
                <img src={icon_heart} className={isFav?s.fav:''}/>
                <span>いいねを押す</span>
              </p>
              <p onClick={doCollect}>
                <img src={icon_flag} className={store.isCollect(board_id)?s.fav:''} />
                <span>マイリストに追加</span>
              </p>
            </div>}

            <div className={s.ft}>
              <h1> SNSでシェア！</h1>
              <li>
                <img src={icon_face} />
                <img src={icon_twwi} />
              </li>
            </div>

          </div>

         
        </div>
      </div>
    </div>
  )

}

export default observer(DetailNote)