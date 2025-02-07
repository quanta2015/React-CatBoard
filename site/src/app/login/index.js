/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, Button, Input, message} from 'antd';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom'
import s from './index.module.less';

import { UserOutlined,LockOutlined } from '@ant-design/icons';
import apple    from '@/img/icon/apple.svg'
import email    from '@/img/icon/email.svg'
import google   from '@/img/icon/google.svg'
import facebook from '@/img/icon/facebook.svg'




const Login = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const [form] = Form.useForm();


  const [mail,setMail] = useState('')
  const [pwd,setPwd] = useState('')
  const [status, setStatus] = useState(0)

  const init = {
    mail: store.getUser()?.mail||'',
    pwd: store.getUser()?.pwd||'',
  }

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
      await store.login(params).then(r=>{
        if (r.code ===0) {
          message.info('登录成功！')
          store.setCollect(r.collect)
          store.setUser(r.data)
          navigate('/')
          // console.log('user info:', r.data);
        }else{
          message.info(r.msg)
        }
      })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }


  const renderForm =()=>(
    <div className={s.form} >

      <Form form={form} layout='vertical' initialValues={init}>

        <Form.Item 
          label="メールアドレス" 
          name="mail" 
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


  const doShowFrom =()=>{
    console.log('aaa')
    setStatus(1)
  }


  const renderBtn =(item,i,e)=>(
    <div className={s.btn} onClick={doShowFrom} key={i}>
      <img src={item.icon} />
      <span>{item.name}</span>
    </div>
  )



  return (
    <div className={s.login}>
      <div className={s.wrap}>
        <h1>{status?loginTitle:mainTitle}</h1>

        {!status? renderBtn(btnList[0],0,doShowFrom):renderForm() }


        {btnList.slice(1).map((item,i)=>
          renderBtn(item,i)
        )}
      </div>
    </div>
  )

}

export default  observer(Login)