/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, message,Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import FormPostBasic from '@/component/FormPostBasic'
import FormPostOther from '../FormPostOther';
import UserConfirm from '../UserConfirm';
import FormCat from '@/component/FormCat'
import { v4 as uuidv4 } from 'uuid';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom'
import notice from '@/img/icon/warning-g.svg'
import CardInfo from '@/component/CardInfo'
import {SUB_TYPE,CONFIRM_MESSAGE} from '@/constant/data'
import warn_lose  from '@/img/icon/warn_lose.svg'
import warn_prot  from '@/img/icon/warn_prot.svg'
import icon_check  from '@/img/icon/check.svg'

import s from './index.module.less';

const FormPost = () => {
  const { store } = React.useContext(MobXProviderContext)
  const {subType} = store
  const [form] = Form.useForm();

  const [user,setUser] = useState({})
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false); 
  const [submit,setSubmit] = useState(false)

  let icon = subType === SUB_TYPE.TYPE1 ? icon_check : warn_prot;
  let confirmMessage = CONFIRM_MESSAGE(icon).find(item => item.type === subType);


  let initTitle, initList;
  if (confirmMessage) {
    initTitle = confirmMessage.title;
    initList = confirmMessage.initList;
  }

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id =  uuidv4();
      console.log(params)
      const allChecked = params.checkbox1 && params.checkbox2 && params.checkbox3;
      setAllChecked(allChecked);

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
    <div className={s.formpost}>
      <div className={s.wrap}>
      <CardInfo list={initList} title={initTitle} />

      <Form form={form} layout='vertical' initialValues={user}>
        <FormPostBasic type={subType}/>
        <FormCat />
        <FormPostOther type={subType} form={form} file={[]} />



        <div 
          className={cls('btnLg','lose')} 
          style={{width: '400px', margin: '0 auto'}} 
          onClick={doSave}
          disable={true}
        >
          {subType === SUB_TYPE.TYPE1 ? '投稿する迷子情報を確認' : '投稿する保護情報を確認'}</div>
      </Form>
      </div>
      <div className="confirm">

      </div>
    </div>
  )

}

export default  observer(FormPost)