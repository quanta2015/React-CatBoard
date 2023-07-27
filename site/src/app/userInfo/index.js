/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import classnames from 'classnames';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PRE_IMG} from '@/constant/urls'
import Upload from '@/component/Upload'

import s from './index.module.less';

import user from '@/img/icon/menu-user.svg'



const UserInfo = () => {
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)
  const [fileList, setFileList] = useState([])
  

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      // await store.login(params).then(r=>{

      // })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }



  return (
    <div className={s.userinfo}>

      

      <div className={s.wrap}>
        
      
        <h1>
          <img src={user} />
          <span>アカウント情報</span>
        </h1>


        <Form form={form} layout='vertical'>

          <Form.Item 
            label="名前" 
            name="nick_name" 
            rules={[{ required: true, message: '名前を入力してください'}]}
            >
            <Input size="large" style={{height: '50px'}} placeholder="名前" allowClear />
          </Form.Item>

          <Form.Item label="ユーザー名" 
            name="user" 
            rules={[{ required: true, message: 'ユーザー名を入力してください'}]}
            >
            <Input size="large" style={{height: '50px'}} placeholder="ユーザー名" allowClear />
          </Form.Item>

          <Form.Item label="メールアドレス" 
            name="email" 
            rules={[{ required: true, message: 'メールアドレスを入力してください'}]}
            >
            <Input size="large" style={{height: '50px'}} placeholder="メールアドレス" allowClear />
          </Form.Item>

          <Form.Item label="パスワード" 
            name="pwd" 
            rules={[{ required: true, message: 'パスワードを入力してください'}]}
            >
            <Input size="large" style={{height: '50px'}} placeholder="パスワード" allowClear />
          </Form.Item>


          <Form.Item 
            label="ユーザーの写真アップロード" 
            name="attr"
            rules={[{ required: true, message: `必ず１枚は写真をアップロードしてください` } ]}>
            <Upload file = {fileList} />
          </Form.Item>
        
          <div className={classnames('btnLg','lose')} onClick={doSave}>情報を変更する</div>
        </Form>

      </div>
    </div>
  )

}

export default  observer(UserInfo)