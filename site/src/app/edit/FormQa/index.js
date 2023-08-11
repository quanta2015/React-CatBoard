/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input,  message, Form, Button} from 'antd'
import { observer,MobXProviderContext } from 'mobx-react'
import { v4 as uuidv4 } from 'uuid';
import {fixBody} from '@/util/fn'
import CardInfo from '@/component/CardInfo'
import {CONFIRM_MSG_QA} from '@/constant/data'
import s from './index.module.less';

const { TextArea } = Input

const FormMain = ({setShowEdit}) => {
  const { store } = React.useContext(MobXProviderContext)
  const { user,item } = store

  const [title,setTitle] = useState(item?.title)
  const [content,setContent] = useState(item?.content?.cnt)


  const doSubmit=()=>{
    let params = {
      user_id: user.user_id,
      board_id: item.board_id,
      title,
      content: {cnt: content, rep:[]}
    }
    store.setShow(true,'loading')
    store.saveQa(params).then(r=>{
      store.setShow(false,'loading')
      store.setRefresh()
      message.info(r.msg)
      setShowEdit(false)
    })
  }

  const doCancel=()=>{
    setShowEdit(false)
  }

  return (
    <div className={s.formQa}>
      <CardInfo {...CONFIRM_MSG_QA}/>
      <div className={s.row}>
        <label>タイトル :</label>
        <Input value={title} onChange={(e)=>setTitle(e.currentTarget.value)}></Input>
      </div>
      <div className={s.row}>
        <label>内容  :</label>
        <TextArea value={content} onChange={(e)=>setContent(e.currentTarget.value)} allowClear style={{height: '400px'}} />
      </div>

      <div className={s.row}>
        <div className={s.btn} onClick={doSubmit}>
          投稿する質問内容を確認
        </div>
        <div className={s.close} onClick={doCancel}>
          キャンセル
        </div>
      </div>
    </div>
    
  )

}

export default  observer(FormMain)