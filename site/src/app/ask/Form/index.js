/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin, Form, Button, Row, Col, Select, InputNumber} from 'antd'
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import s from './index.module.less';

const FormMain = ({ setSubmit }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);

const FormMain = ({setSubmit}) => {
  const { store } = React.useContext(MobXProviderContext)
  const [form] = Form.useForm();

  const doSubmit=async()=>{

    try {
      const params = await form.validateFields();
      // await store.login(params).then(r=>{
      //   if (r.code ===0) {
      //     setSubmit(true)
      //   }
      // })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }

    
  }





  return (

    <div className={s.form}>
      <h1>お問い合わせ</h1>

      <Form form={form} layout='vertical'>

        <Form.Item 
          label="メールアドレス" 
          name="mail" 
          rules={[{ required: true, message: 'アカウントを入力してください'}]}
          >
          <Input size="large" style={{height: '50px'}} placeholder="アカウント" allowClear  />
        </Form.Item>

        <Form.Item label="タイトル" 
          name="title" 
          rules={[{ required: true, message: 'タイトルを入力してください'}]}
          >
          <Input size="large" style={{height: '50px'}} placeholder="タイトル" allowClear />
        </Form.Item>
        
        <Form.Item label="内容" 
          name="content" 
          rules={[{ required: true, message: '内容を入力してください'}]}
          >
          <Input.TextArea size="large" style={{height: '300px'}} placeholder="内容" allowClear />
        </Form.Item>
      </Form>
      <div className={'btnIn'} onClick={doSubmit}>送信</div>
    </div>
    
  )

}

export default FormMain;