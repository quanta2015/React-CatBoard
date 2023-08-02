/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import cls from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PRE_IMG} from '@/constant/urls'
import Upload from '@/component/Upload'
import FormUsr from '@/component/FormUsr'
import FormCat from '@/component/FormCat'


import s from './index.module.less';

import icon_user from '@/img/icon/menu-user.svg'



const UserInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)
  
  const [user,setUser] = useState({})
  

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id =  uuidv4();
      params.icon = [params.icon[0].url]
      params.user_type = 1
      console.log(params)
      await store.regUser(params).then(r=>{
        message.info(r.msg)
        if (r.code === 0) {
          store.setUser(params)
          navigate('/')
        }
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
          <span>アカウント登録</span>
        </h1>


        <Form form={form} layout='vertical' initialValues={user}>

          <FormUsr form={form} file={[]} />
          <span className="sep"></span>
          <div className={s.catinfo}>
            <h1>猫ちゃんを飼われている方は下記の内容も入力してください。</h1>
            <span>迷子情報を投稿する際に反映されます。</span>
          </div>
          {/*<FormCat />*/}
        
          <div className={cls('btnLg','lose')} onClick={doSave}>新規登録する</div>
          <div className={s.desc}>「アカウント登録」をクリックすることで、利用規約・プライバシーポリシー
に同意するものとします。</div>
        </Form>

      </div>
    </div>
  )

}

export default  observer(UserInfo)