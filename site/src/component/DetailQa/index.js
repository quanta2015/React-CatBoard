import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import cls from 'classnames';

import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,message } from 'antd';
import {PRE_IMG} from '@/constant/urls'
import {formatTime,clone,now } from '@/util/fn'
import s from './index.module.less';


import icon_user  from '@/img/icon/user.svg'
import icon_eye   from '@/img/icon/eye.svg'
import icon_eye_r from '@/img/icon/eye-red.svg'
import icon_chat from '@/img/icon/chat-c.svg'
import icon_rp from '@/img/icon/reply.svg'
import icon_fb from '@/img/icon/forbid.svg'

const { TextArea } = Input

const caluFav =(user,fav)=> fav.includes(user.mail)


const DetailNote = ({}) => {
  const { store } = React.useContext(MobXProviderContext)
  const { user } = store
  const my_id = user.user_id
  const my_icon = user.icon[0]
  const { category,sub_date,sub_user,sub_user_id,content,title,fav,board_id } = store.item
  const { cnt, rep } = content
  const clr = (category==='受付中')?'var(--clr-qa)':'#9E9E9E'
  const clrSub = (category==='受付中')?'var(--clr-qa-sub)':'#ccc'  

  const [isFav,setIsFav] = useState(false)
  const [reply,setReply] = useState(rep)
  const [repTxt,setRepTxt] = useState('')
  const [txt,setTxt] = useState('')

  const doClose =()=>{
    store.setShow(false,'qa')
  }

  useEffect(()=>{ 
    setIsFav(user?caluFav(user,fav):false)
  },[])

  console.log(clone(rep),'rep')




  const RenderItem =(icon,info,txt,style)=>(
    <div className={s.iconItem} style={{color:clr}}>
      <div className={s.icon}>
        <img src={icon} style={{}} />
      </div>
      <span>{info.length}</span>
      <span>{txt}</span>
    </div>
  )


  const doShowRepFrm=(i)=>{
    
    let list = clone(reply)
    let status = list[i].show?true:false
    // console.log(i,list[i].show,'reply')
    list.map(o=> o.show=false)
    list[i].show = !status
    setReply([...list])
  }


  const saveContent = async(list,type,to)=>{
    const content = { ...clone(store.item.content), rep: list };
    const params = {
      fr: my_id,
      to,
      icon: my_icon,
      type,
      title,
      board_id,
      content,
      sub_date,
    }
    store.setShow(true,'loading')
    await store.saveContent(params).then(r=>{
      // console.log(r)
      message.info(r.msg)
      store.setShow(false,'loading')
      setTxt('')
      store.setItem(r.data)
      setReply(r.data.content.rep)
      store.setRefresh()
    })
  }


  const doReply=async()=>{
    const sub_date = now()
    const list = clone(reply)
    list.push({
      sub_date,
      user_id: my_id,
      user_icon: my_icon,
      content: txt,
    })
    await saveContent(list,'回答',sub_user_id)
  }


  const doReplyToReply=async(item,i)=>{
    const sub_date = now()
    const list = clone(reply)
    list.map(o=> {
      delete o.show;
    })
    list[i].rep = list[i].rep || []
    list[i].rep.push({
      user_id: my_id,
      user_icon: my_icon,
      content: repTxt,
      sub_date,
    })
    await saveContent(list,'返信',item.user_id)
  }


  return (
    <div className={s.detailQa} >

      <div className={s.main} >
        
        <div className={s.wrap}>
          <div className={'del'} onClick={doClose}></div>

          {my_id === sub_user_id &&  
            <div className={s.stop}>締め切る</div>}


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
                <span>{sub_user}</span>
                <span>{sub_date}</span>
              </div>
            </div>
          </div>

          <div className={s.bd}>
            <div className={s.content}>{cnt}</div>
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


          { (reply.length>0) && 
          <div className={s.rep}>
            <h1>
              <img src={icon_chat} />
              <span>回答</span>
              {reply.length}
            </h1>

            <div className={s.wrap}>
              {reply.map((item,i)=>
              <div className={s.repItem} key={i}>
                <h2>
                  <img src={item.user_icon} />
                  <span>{item.sub_user}</span>
                </h2>
                <p>{item.content}</p>
                <div className={s.desc}>
                  <span>{item.sub_date}</span>

                  {my_id !== item.user_id &&  
                  <div className={s.btn} onClick={()=>doShowRepFrm(i)} > <img src={icon_rp}/>返信 </div>}
                  <div className={s.btn}> <img src={icon_fb} /> 举报 </div>
                </div>


                {item.rep && (item.rep.length>0) && 
                <div className={s.sep}>コメント</div>}


                {item.rep && item.rep.map((o,j)=>
                  <div className={cls(s.repItem,'r2r')} key={j}>
                    <h2>
                      <img src={o.user_icon} />
                      <span>{o.sub_user}</span>
                    </h2>
                    <p>{o.content}</p>
                    <div className={s.desc}>
                      <span>{o.sub_date}</span>
                      <div className={s.btn}> <img src={icon_fb} /> 举报 </div>
                    </div>
                  </div>
                )}

                {item.show && 
                  <div className={s.frm}>
                    <TextArea value={repTxt} onChange={(e)=>setRepTxt(e.currentTarget.value)} allowClear style={{height: '100px'}} />
                    <div className="btnIn" onClick={()=>doReplyToReply(item,i)}>返信する</div>
                  </div>}
              </div>
              )}
            </div>
          </div>}

          {(category==='受付中') && 
          <div className={s.frm}>
            <TextArea value={txt} onChange={(e)=>setTxt(e.currentTarget.value)} allowClear style={{height: '200px'}} />

            <div className="btnIn" onClick={doReply}>回答する</div>
          </div>}

         
        </div>
      </div>
    </div>
  )

}

export default observer(DetailNote)