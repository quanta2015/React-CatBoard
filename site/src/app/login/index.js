/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import classnames from 'classnames';
import s from './index.module.less';

import { UserOutlined,LockOutlined } from '@ant-design/icons';
import apple    from '@/img/icon/apple.svg'
import email    from '@/img/icon/email.svg'
import google   from '@/img/icon/google.svg'
import facebook from '@/img/icon/facebook.svg'




const Login = () => {
  const { store } = React.useContext(MobXProviderContext)
  const [form] = Form.useForm();


  const [status, setStatus] = useState(0)


  const mainTitle = 'アカウント登録'
  const loginTitle = 'ログイン'

  const btnList = [{
    icon:email,  name:'メールアドレスで登録'
  },{
    icon:google, name:'Googleで登録'
  },{
    icon:facebook, name:'Facebookで登録'
  },{
    icon:apple, name:'Appleで登録'
  }]


  const doLogin =async()=>{
    try {
      const params = await form.validateFields();

      console.log(params)
      // const r = await store.login(urls.API_LOGIN, params)
      // if (r) {
      //   navigate('/')
      // }

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }


  const renderForm =()=>(
    <div className={s.form}>

      <Form form={form} layout='vertical'>

        <Form.Item 
          label="メールアドレス" 
          name="user" 
          rules={[{ required: true, message: 'アカウントを入力してください'}]}
          >
          <Input size="large" style={{height: '50px'}} placeholder="アカウント" allowClear prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item label="メールアドレス" 
          name="pwd" 
          rules={[{ required: true, message: 'パスワードを入力してください'}]}
          >
          <Input size="large" style={{height: '50px'}} placeholder="パスワード" allowClear prefix={<LockOutlined />} />
        </Form.Item>
        
      
        <div className={classnames(s.btn,'lose')} onClick={doLogin}>ログイン</div>
      </Form>
    </div>
  )


  const renderBtn =(item,e)=>(
    <div className={s.btn} onClick={e}>
      <img src={item.icon} />
      <span>{item.name}</span>
    </div>
  )

  const doShowFrom =()=>{
    setStatus(1)
  }

  return (
    <div className={s.login}>
      <div className={s.wrap}>
        <h1>{status?loginTitle:mainTitle}</h1>

        {!status? renderBtn(btnList[0],doShowFrom):renderForm() }


        {btnList.slice(1).map((item,i)=>
          renderBtn(item)
        )}
      </div>
    </div>
  )

}

export default  observer(Login)