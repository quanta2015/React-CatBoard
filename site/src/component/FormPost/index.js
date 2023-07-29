/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Form, message,Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import FormPostBasic from '@/component/FormPostBasic'
import FormPostOther from '../FormPostOther';
import UserConfirm from '../UserConfirm';
import FormCat from '@/component/FormCat'
import { v4 as uuidv4 } from 'uuid';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom'
import {SUB_TYPE} from '@/constant/data'
import notice from '@/img/icon/warning-g.svg'
import CardInfo from '@/component/CardInfo'
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'

import s from './index.module.less';

const FormPost = () => {
  const { store } = React.useContext(MobXProviderContext)
  const [form] = Form.useForm();
  const type = SUB_TYPE.lose_sub
  const [user,setUser] = useState({})
  const navigate = useNavigate();

  const initTitle = '質問する前にご確認ください。'
  const initList = [{
    icon: notice,
    sect: ["病気の診断や薬または療法食の処方についてなど\n獣医師の判断が必要な内容は投稿せず受診してください。",
    "個人情報保護のため個人が特定される情報は投稿しないでください。",
    "他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や\n他人を不快にさせる内容は投稿しないでください。",
    "商業目的や広告目的の内容は投稿しないでください。\n犯罪行為などを誘発 / 助長する内容は投稿しないでください。",
    "投稿が不適切だと判断した場合、削除することがあります。",
    "利用規約に同意の上ご投稿ください。"]
  }]


  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id =  uuidv4();
      console.log(params)
      await store.regUser(params).then(r=>{
        message.info(r.msg)
        store.setUser(params)
        navigate('/')
        // console.log(r)
      })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  return (
    <div className={s.formpost}>
      <div className={s.wrap}>
      <CardInfo list={initList} title={initTitle} />

      <Form form={form} layout='vertical' initialValues={user}>
        <FormPostBasic type={type}/>
        <FormCat />
        <FormPostOther form={form} file={[]} />

        <div className={cls('btnLg','lose')} style={{width: '400px', margin: '0 auto'}} onClick={doSave}>迷子情報を投稿</div>
      </Form>
      <ToTop />
      <Footer />    
      </div>

  


    </div>
  )

}

export default  observer(FormPost)