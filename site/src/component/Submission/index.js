/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, message,Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import FormPostBasic from '@/component/FormPostBasic'
import FormPostOther from '../../component/FormPostOther';
import UserConfirm from '../../component/UserConfirm';
import FormCat from '@/component/FormCat'
import { v4 as uuidv4 } from 'uuid';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom'
import {SUB_TYPE} from '@/constant/data'

import s from './index.module.less';

const Submission = () => {
  const { store } = React.useContext(MobXProviderContext)
  const [form] = Form.useForm();
  const type = SUB_TYPE.lose_sub
  const [user,setUser] = useState({})
  const navigate = useNavigate();


  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id =  uuidv4();
      console.log(params)
      await store.regUser(params).then(r=>{
        message.info(r.msg)
        store.setUser(params)
        navigate('/')
        // console.log(r)
      })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  return (
    <div className={s.submission}>
      {/* note */}
      <UserConfirm type={type}/>

      <Form form={form} layout='vertical' initialValues={user}>
        <FormPostBasic type={type}/>
        <FormCat />
        <FormPostOther form={form} file={[]} />

        <div className={cls('btnLg','lose')} onClick={doSave}>迷子情報を投稿</div>
      </Form>
    </div>
  )

}

export default  observer(Submission)