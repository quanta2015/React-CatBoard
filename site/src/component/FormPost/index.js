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
import notice from '@/img/icon/warning-g.svg'
import CardInfo from '@/component/CardInfo'
import {SUB_TYPE,CONFIRM_MESSAGE} from '@/constant/data'
import warn_lose  from '@/img/icon/warn_lose.svg'
import warn_prot  from '@/img/icon/warn_prot.svg'
import icon_check  from '@/img/icon/check.svg'

import s from './index.module.less';

const FormPost = (item) => {
  const { store } = React.useContext(MobXProviderContext)
  const {subType} = store
  const [form] = Form.useForm();
  const [user,setUser] = useState({})
  const navigate = useNavigate();
  const { type,cat,sub_date,sub_user,addr,title,sub,period,view,fav,id } = item
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [areAllChecked, setAreAllChecked] = useState(false);
  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,(type==='note')?'note':'detail')
  }

  const checkAllBoxes = async () => {
    try {
      const values = await form.validateFields(['checkbox1', 'checkbox2', 'checkbox3']);
      setAreAllChecked(values.checkbox1 && values.checkbox2 && values.checkbox3);
    } catch {
      setAreAllChecked(false);
    }
  };

  let icon = subType === SUB_TYPE.TYPE1 ? icon_check : warn_prot;
  let confirmMessage = CONFIRM_MESSAGE(icon).find(item => item.type === subType);
  let initTitle, initList;
  if (confirmMessage) {
    initTitle = confirmMessage.title;
    initList = confirmMessage.initList;
  }

  const doNewArticle =(type)=>{　
    store.setShow(true,'confirm')
  }


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

  const Popup = ({ onClose }) => (
    <div>
      <h2>这是一个弹窗</h2>
      <button onClick={onClose}>关闭</button>
    </div>
  );
  

  return (
    <div className={s.formpost}>
      <div className={s.wrap}>
      <CardInfo list={initList} title={initTitle} />

      <Form form={form} layout='vertical' initialValues={user}>
        <FormPostBasic type={subType}/>
        <FormCat />
        <FormPostOther type={subType} form={form} file={[]} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,marginTop:'20px'}}>
          <Form.Item name="checkbox1" valuePropName="checked" rules={[{ required: true, message: '確認してください' }]}>
            <Checkbox onChange={checkAllBoxes}>記入漏れはない</Checkbox>
          </Form.Item>
          <Form.Item name="checkbox2" valuePropName="checked" rules={[{ required: true, message: '確認してください' }]}>
            <Checkbox onChange={checkAllBoxes}>記入した情報に誤りはない</Checkbox>
          </Form.Item>
          <Form.Item name="checkbox3" valuePropName="checked" rules={[{ required: true, message: '確認してください' }]}>
            <Checkbox onChange={checkAllBoxes}>出来るだけ詳細に記入した</Checkbox>
          </Form.Item>
        </div>

        <button 
          className={`${s.btn} ${subType === SUB_TYPE.TYPE2 ? s['btn-protect'] : ''}`} 
          onClick={() => {
            // doSave();
            setPopupVisible(true);
            doNewArticle('lose')
          }}
          disabled={!areAllChecked}
        >
          {subType === SUB_TYPE.TYPE1 ? '投稿する迷子情報を確認' : '投稿する保護情報を確認'}
        </button>
        {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />}
      </Form>
      </div>
      <div className="confirm">

      </div>
    </div>
  )

}

export default  observer(FormPost)