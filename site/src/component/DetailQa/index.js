import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,message } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import {formatTime} from '@/util/fn'
import s from './index.module.less';


import icon_user  from '@/img/icon/user.svg'
import icon_eye   from '@/img/icon/eye.svg'
import icon_eye_r from '@/img/icon/eye-red.svg'
import icon_chat from '@/img/icon/chat-c.svg'


const caluFav =(user,fav)=> fav.includes(user.mail)


const DetailNote = ({}) => {
  const { store } = React.useContext(MobXProviderContext)
  const { user } = store
  const { category,type,sub_date,sub_user,addr,content,title,sub,period,view,fav,id,board_id } = store.item
  const clr = (category==='受付中')?'var(--clr-qa)':'#9E9E9E'
  const clrSub = (category==='受付中')?'var(--clr-qa-sub)':'#ccc'  

  const [isFav,setIsFav] = useState(false)
  const [sel,setSel] = useState(0)

  const doClose =()=>{
    store.setShow(false,'qa')
  }

  useEffect(()=>{ 
    setIsFav(user?caluFav(user,fav):false)
  },[])



  const RenderItem =(icon,info,txt,style)=>(
    <div className={s.iconItem} style={{color:clr}}>
      <div className={s.icon}>
        <img src={icon} style={{}} />
      </div>
      <span>{info.length}</span>
      <span>{txt}</span>
    </div>
  )



  return (
    <div className={s.detailQa} >

      <div className={s.main} >
        
        <div className={s.wrap}>
          <div className={'del'} onClick={doClose}></div>


          <div className={s.hd}>
            <h1>
              <em style={{background:clr}} >{category}</em>
              <span>{title}</span>
            </h1>
            <div className={s.desc}>
              <div className={s.iconItem} style={{color:'var(--clr-grey)'}}>
                <div className={s.icon}>
                  <img src={icon_user} style={{}} />
                </div>
                <span>{sub_user.length}</span>
                <span>{sub_date}</span>
              </div>
            </div>
          </div>

          <div className={s.bd}>
            <div className={s.content}>{content}</div>
            <div className={s.desc}>
              <div className={s.iconItem} style={{color:'var(--clr-nav)'}}>
                <div className={s.icon}>
                  <img src={icon_eye_r} />
                </div>
                <span>{fav.length}</span>
                <span>{'気になる'}</span>
              </div>
            </div>
          </div>


          <div className={s.fn}>
            <span>回答する</span>
            <span>回答を締め切る</span>
          </div>

          <div className={s.rep}>
            <h1>
              <img src={icon_chat} />
              <span>回答</span>
              2
            </h1>

            <div className={s.wrap}>
              <p>
                {/*<img src={} />*/}
              </p>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  )

}

export default observer(DetailNote)