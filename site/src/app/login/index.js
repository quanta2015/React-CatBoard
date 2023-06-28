import React from 'react'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import * as urls from '@/constant/urls'
import { useNavigate } from 'react-router-dom'

import style from './index.module.less'

import logo from '@/img/logo.svg'
import edu from '@/img/logo.png'
import mentsys from '@/img/mentsys.png'




const Login = () => {
  const { store } = React.useContext(MobXProviderContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const doLogin =async()=>{
    try {
      const params = await form.validateFields();
      const r = await store.login(urls.API_LOGIN, params)
      if (r) {
        navigate('/')
      }

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  return (
    <div className={style.login}>
      <div className={style.wrap}>
        
        <div className={style.logo}>
          <div className={style.title}>
            <img src={logo} />
            <p>
              <span>信息学院综合导师课外育人管理系统</span>
              <label>Tutor Extracurricular Education System of Information College</label>
            </p>
          </div>
          <div className={style.edu}>
            <img src={edu} />
          </div>
          
          
        </div>
      
        <Form form={form} className={style.login_frm}>
          <label>用户登录</label>
          <Form.Item name="uid" rules={[{ required: true, message: '请输入账号'}]}>
            <Input size="large" style={{height: '45px'}} placeholder="请输入账号" allowClear prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="pwd" rules={[{ required: true, message: '请输入账号'}]}>
            <Input.Password size="large" style={{height: '45px'}} placeholder="请输入密码" prefix={<LockOutlined />}/>
          </Form.Item>
          <p></p>
          <Form.Item>
            <Button type="primary" size="large" className="input-btn" block onClick={doLogin}>登 录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

}

export default observer(Login)
