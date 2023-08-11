/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import cls from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, message,Input, Radio,Select} from 'antd';
import {SUB_TYPE,CONFIRM_MSG_CAT,INF_TYPE} from '@/constant/data'
import {PRE_IMG} from '@/constant/urls'
import dayjs from 'dayjs';
import {scrollToTop,extractImg,encodeImg,clone,noProp} from '@/util/fn'
import Upload from '@/component/Upload'

import s from './index.module.less';

const { TextArea } = Input

const FormNote = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const { user,item } = store

  console.log(clone(item),'item')
  const [ file, setFile ] = useState(noProp(item)?[]:encodeImg(item.cat.img[0]))
  const [ init, setInit ] = useState(noProp(item)?{}:{
    period: item.cat.period,
    title: item.title,
    content: item.content.cnt,
  })


  const doClose =()=>{
    store.setItem({})
    store.setShow(false,'addNote')
  }


  const doSave =async()=>{
    try {
      const formParams = await form.validateFields();
      const params = {
        board_id: noProp(item)?uuidv4():item.board_id,
        sub_user:user.user_id,
        content: {cnt:formParams.content, pre:[]},
        cat: { 
          period: formParams.period, 
          img: [extractImg(formParams.icon[0].url)]
        },
        title: formParams.title,
      }

      // console.log(params)

      store.setShow(true,'loading')
      await store.saveNote(params).then(r=>{
        store.setShow(false,'loading')
        store.setShow(false,'addNote')
        store.setRefresh()
        message.info(r.code===0?r.msg:'記事投稿失败')
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }



  return (
    <div className={s.formpost}>

      
      <div className={s.wrap}>

        <div className={s.form}>
          <Form form={form} layout='vertical' initialValues={init}>
            <Form.Item 
              label="この記事を読み終わるのに必要な時間" 
              name={"period"}
              rules={[{ required: true, message: `必要な時間を記入してください` }]}>
              <Input placeholder="10文字以内で入力　　例）5分" style={{height: '50px'}} />
            </Form.Item>
            <Form.Item 
              label="タイトル" 
              name={"title"}
              rules={[
                { required: true, message: '必要な時間を記入してください' },
                { max: 30, message: '最多输入30个字符' }
              ]}>
              <Input placeholder="30文字以内で入力" style={{height: '50px'}} />
            </Form.Item>
            <Form.Item 
                label={"内容"}
                name={'content'}
                rules={[
                  { required: true, message: '必要な内容を記入してください' },
                  { max: 30, message: '2000文字以内で入力してください' }
                ]}>
                <TextArea placeholder="2000文字以内で入力してください" 
                allowClear 
                style={{height: '200px'}}
                maxLength={150} /> 
            </Form.Item>
            <Form.Item 
              label="ねこの写真アップロード" 
              name="icon"
              rules={[{ required: true, message: `必ず１枚は写真をアップロードしてください` } ]}>
              <Upload file = {file} form={form}  />
            </Form.Item>
          </Form>
          <div className="btnIn" onClick={doSave}>ねこ記事の投稿</div>
          <span className={s.close} onClick={doClose}>キャンセル</span>
        </div>
      </div>


    </div>
  )

}

export default  observer(FormNote)