/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin, Form, Button, Row, Col, Select, InputNumber} from 'antd'
import { observer,MobXProviderContext } from 'mobx-react'
import {fixBody} from '@/util/fn'
import CardInfo from '@/component/CardInfo'
import {CONFIRM_MSG_QA} from '@/constant/data'
import s from './index.module.less';

const { TextArea } = Input

const FormMain = ({setShowForm}) => {
  const { store } = React.useContext(MobXProviderContext)
  

  const doSubmit=()=>{
    // setSubmit(true)

    fixBody(false)
    setShowForm(false)
    // window.scrollTo(0, 0);
  }

  return (
    <div className={s.formQa}>
      <CardInfo {...CONFIRM_MSG_QA}/>
      <div className={s.row}>
        <label>タイトル :</label>
        <Input></Input>
      </div>
      <div className={s.row}>
        <label>内容  :</label>
        <TextArea allowClear style={{height: '400px'}} />
      </div>

      <div className={s.row}>
        <div className={s.btn} onClick={doSubmit}>
          投稿する質問内容を確認
        </div>
      </div>
    </div>
    
  )

}

export default  observer(FormMain)