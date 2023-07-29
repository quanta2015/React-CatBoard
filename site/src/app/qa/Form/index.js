/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin, Form, Button, Row, Col, Select, InputNumber} from 'antd'
import { observer,MobXProviderContext } from 'mobx-react'

import s from './index.module.less';

const { TextArea } = Input

const FormMain = ({setSubmit}) => {
  const { store } = React.useContext(MobXProviderContext)
  

  const doSubmit=()=>{
    setSubmit(true)
  }


  return (
    <div className={s.form}>
      <div className={s.row}>
        <label>タイトル :</label>
        <Input></Input>
      </div>
      <div className={s.row}>
        <label>内容  :</label>
        <TextArea allowClear style={{height: '300px'}} />
      </div>

      <div className={s.row}>
        <div className={s.btn} onClick={doSubmit}>
          質問を投稿
        </div>
      </div>
    </div>
    
  )

}

export default  observer(FormMain)