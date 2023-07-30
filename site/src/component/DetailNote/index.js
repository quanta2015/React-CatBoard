import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import {formatTime} from '@/util/fn'
import s from './index.module.less';


import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_clock from '@/img/icon/clock.svg'
import icon_list from '@/img/icon/list.svg'
import icon_face from '@/img/icon/facebook.svg'
import icon_twwi from '@/img/icon/twwi.svg'


const DetailNote = ({}) => {
  const { store } = React.useContext(MobXProviderContext)

  const { cat,type,sub_date,sub_user,addr,content,title,sub,period,view,fav,id } = store.item
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


  return (
    <div className={s.detailNote} >

      <div className={s.main}>
        
        <div className={s.wrap}>


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
                <span>{view.length} views</span>
              </p>
              <p>
                <img src={icon_heart} />
                <span>いいね {fav.length}</span>
              </p>
            </div>

            <div className={s.content}>
              {content}
            </div>

            <div className={s.ft}>
              <p>
                <img src={icon_heart} className={s.fav}/>
                <span>いいねを押す</span>
              </p>
              <p>
                <img src={icon_list} />
                <span>マイリストに追加</span>
              </p>
            </div>

            <div className={s.ft}>
              <h1> SNSでシェア！</h1>
              <p>
                <img src={icon_face} />
                <img src={icon_twwi} />
              </p>
            </div>

          </div>

         
        </div>
      </div>
    </div>
  )

}

export default observer(DetailNote)