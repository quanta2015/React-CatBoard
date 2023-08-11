/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import cls from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, message,Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import {SUB_TYPE,CONFIRM_MSG_CAT,INF_TYPE} from '@/constant/data'
import {PRE_IMG} from '@/constant/urls'
import dayjs from 'dayjs';
import {scrollToTop} from '@/util/fn'

import FormCat from '@/component/FormCat'
import FormPostBasic from '@/component/FormPostBasic'
import FormPostOther from '../FormPostOther';
import CardInfo from '@/component/CardInfo'
import CardDetailCat from '@/component/CardDetailCat'

import s from './index.module.less';

const FormPost = (item) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const { user,subType } = store
  const [ status, setStatus] = useState(0);
  const [ cond, setCond ] = useState([0,0,0])
  const [ data, setData ] = useState( null )
  const [ file, setFile ] = useState([])


  const doClose =()=>{
    store.setShow(false,'edit')
  }

  const checkAll =(id,e)=>{
    cond[id] = e.target.checked
    setCond([...cond])
  }

  const doSave =async()=>{
    try {
      const formParams = await form.validateFields();
      // console.log('form',formParams)
      const { addr_dtl, addr_ken, addr_shi, cat, icon} = formParams
      const img = icon[0].url.split('?')[0].replace(PRE_IMG,'')
      cat.img = [img]
      const params = {
        board_id: uuidv4(),
        board_type:'cat',
        category:INF_TYPE[subType],
        addr:{ addr_dtl, addr_ken, addr_shi },
        sub_user:user.user_id,
        cat,
        content: {cnt:'',pre:[]}
      }

      store.setItem(params)
      setStatus(1)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const doSubmit =async()=>{
    const params = store.item
    store.setShow(true,'loading')
    await store.saveCat(params).then(r=>{
      console.log(r)
      store.setShow(false,'loading')
      message.info(r.msg)
      setStatus(2)
    })
  }


  const doNavToHome =()=>{
    store.setShow(false,'edit')
    navigate('/')
    scrollToTop()
  }

  return (
    <div className={s.formpost}>

      {(status===0) &&
      <div className={s.wrap}>
        <CardInfo {...CONFIRM_MSG_CAT[subType]} />

        <Form form={form} layout='vertical' initialValues={{
            cat: {
              lose_time: dayjs(),
            },
          }}>
          <FormPostBasic type={subType}/>
          <FormCat />
          <FormPostOther type={subType} form={form} file={file} />
        </Form>

        <div className={s.cond}>
          <Checkbox onChange={(e)=>checkAll(0,e)}>記入漏れはない</Checkbox>
          <Checkbox onChange={(e)=>checkAll(1,e)}>記入した情報に誤りはない</Checkbox>
          <Checkbox onChange={(e)=>checkAll(2,e)}>出来るだけ詳細に記入した</Checkbox>
          <button className={cls(s.btn,subType)} onClick={doSave} disabled={!(cond[0]&&cond[1]&&cond[2])}>
            {subType === 'lose' ? '投稿する迷子情報を確認' : '投稿する保護情報を確認'}
          </button>
        </div>
        <span className={s.close} onClick={doClose}>キャンセル</span>
      </div>}


      {(status===1) &&
      <div className={s.preview}>
        <div className={s.preWrap}>
          <div className={s.main}>
            <h1>{"この迷子情報を投稿しますか？"}</h1>
            <h2>{"他のユーザーには以下のように表示されます。"}</h2>
            <CardDetailCat btnTxt={subType === 'lose'?'迷子情報を投稿':'保護情報投稿'} btnEvent={doSubmit}/>
            <span>投稿した情報は後から編集できます。</span>
          </div>
        </div>
        
      </div>}

      {(status===2) && 
      <div className={s.info}>
        <div className={s.infoWrap}>
          <CardInfo {...CONFIRM_MSG_CAT[`${subType}_end`]} btn={true} event={doNavToHome} />
        </div>
      </div>}
    </div>
  )

}

export default  observer(FormPost)