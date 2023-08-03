/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PRE_IMG} from '@/constant/urls'
import Upload from '@/component/Upload'
import FormUsr from '@/component/FormUsr'
import s from './index.module.less';

import icon_user from '@/img/icon/menu-user.svg'



const UserInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)
  const [icon, setIcon] = useState([])
  const { user }=store

  
  useEffect(()=>{
    let url = user.icon[0]
    setIcon([url])
  },[])
  
  

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id = user.user_id
      params.icon = [params.icon[0].url]
      // console.log(params)
      await store.saveUserInfo(params).then(r=>{
        message.info(r.msg)
        store.setUser(r.data)
      })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }



  return (
    <div className={s.userinfo}>
      <div className={s.wrap}>
        
        <h1>
          <img src={icon_user} />
          <span>アカウント情報</span>
        </h1>


        <Form form={form} layout='vertical' initialValues={user}>

          <FormUsr form={form} file={user.icon} />
        
          <div className={classnames('btnLg','lose')} onClick={doSave}>情報を変更する</div>


          <div className={s.del}>アカウントを削除する</div>
        </Form>

      </div>
    </div>
  )

}

export default  observer(UserInfo)