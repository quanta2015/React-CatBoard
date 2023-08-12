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
import {scrollToTop,encodeImg2} from '@/util/fn'

import FormCat from '@/component/FormCat'
import FormPostBasic from '@/component/FormPostBasic'
import FormPostOther from '@/component/FormPostOther';
import CardInfo from '@/component/CardInfo'

import s from './index.module.less';

const FormPost = ({setShowEdit}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const { user,subType,item } = store
  const [ data, setData ] = useState( null )
  const [ file, setFile ] = useState(encodeImg2(item.cat.img))


  const doClose =()=>{
    setShowEdit(false)
  }


  const doSave =async()=>{
    try {
      const formParams = await form.validateFields();
      // console.log('form',formParams)
      const { addr_dtl, addr_ken, addr_shi, cat, icon} = formParams
      const img = icon[0].url.split('?')[0].replace(PRE_IMG,'')
      cat.img = [img]
      const params = {
        board_id: item.board_id,
        board_type:'cat',
        category:INF_TYPE[subType],
        addr:{ addr_dtl, addr_ken, addr_shi },
        sub_user:user.user_id,
        cat,
        content: {cnt:'',pre:[]}
      }
      // console.log(params,'params')
      store.setShow(true,'loading')
      await store.saveCat(params).then(r=>{
        // console.log(r)
        store.setShow(false,'loading')
        store.setRefresh()
        message.info(r.msg)
        setShowEdit(false)
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }


  return (
    <div className={s.formpost}>

      
      <div className={s.wrap}>
        <CardInfo {...CONFIRM_MSG_CAT[subType]} />

        <Form form={form} layout='vertical' initialValues={{
          addr_ken: item.addr.addr_ken,
          addr_shi: item.addr.addr_shi,
          addr_dtl: item.addr.addr_dtl,
          cat: {
            lose_time: dayjs(item.cat.lose_time),
            name: item.cat.name,
            clr: item.cat.clr,
            type: item.cat.type,
            sex: item.cat.sex,
            age: item.cat.age,
            size: item.cat.size,
            collar: item.cat.collar,
            attr: item.cat.attr,
            status: item.cat.status,
            necklace: item.cat.necklace,
          },
          file: encodeImg2(item.cat.img),

          }}>
          <FormPostBasic type={subType}/>
          <FormCat />
          <FormPostOther type={subType} form={form} file={file} />
        </Form>

        <div className={s.cond}>
          <button className={cls(s.btn,subType)} onClick={doSave} >
            {subType === 'lose' ? '迷子情報投稿保存' : '保護情報投稿保存'}
          </button>
        </div>
        <span className={s.close} onClick={doClose}>キャンセル</span>
      </div>

    </div>
  )

}

export default  observer(FormPost)