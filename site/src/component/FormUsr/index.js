/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom'
import Upload from '@/component/Upload'

import s from './index.module.less';



const FormUsr = ({file,form}) => {
  
  return (
    <>
      <Form.Item 
        label="名前" 
        name="name" 
        rules={[{ required: true, message: '名前を入力してください'}]}
        >
        <Input size="large" style={{height: '50px'}} placeholder="名前" allowClear />
      </Form.Item>

      <Form.Item label="ユーザー名" 
        name="user_name" 
        rules={[{ required: true, message: 'ユーザー名を入力してください'}]}
        >
        <Input size="large" style={{height: '50px'}} placeholder="ユーザー名" allowClear />
      </Form.Item>

      <Form.Item label="メールアドレス" 
        name="mail" 
        rules={[
          { type: 'email', message: '有効なメールアドレスを入力してください!' },
          { required: true, message: 'メールアドレスを入力してください'},
          ]}
        >
        <Input size="large" style={{height: '50px'}} placeholder="メールアドレス" allowClear />
      </Form.Item>

      <Form.Item label="パスワード" 
        name="pwd" 
        rules={[{ required: true, message: 'パスワードを入力してください'}]}
        >
        <Input.Password size="large" style={{height: '50px'}} placeholder="パスワード" allowClear />
      </Form.Item>


      <Form.Item 
        label="ユーザーの写真アップロード" 
        name="icon"
        // valuePropName="icon"
        rules={[{ required: true, message: `必ず１枚は写真をアップロードしてください` } ]}>
        <Upload file = {file} form={form}  />
      </Form.Item>
    
    </>
  )

}

export default  observer(FormUsr)