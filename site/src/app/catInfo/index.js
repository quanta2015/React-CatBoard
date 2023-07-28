/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PRE_IMG} from '@/constant/urls'
import Upload from '@/component/Upload'
import FormCat from '@/component/FormCat'

import s from './index.module.less';

import icon_cat from '@/img/icon/menu-cat.svg'


const clone = (e)=> {
  return JSON.parse(JSON.stringify(e))
}


const CatInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)
  // let { user } = store


  const [user, setUser] = useState(null)

  useEffect(()=>{

    if (store.user) {
      let _user = {
        cat: JSON.parse(store.user?.cat)
      }
      setUser(_user)
    }
    
  },[])



  // let usr = {
  //   cat: JSON.parse(user.cat)
  // }
  console.log(user,'user')
  
  

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      params.user_id = user.user_id
      params.icon = [params.icon[0].url]
      console.log(params)
      await store.saveUserInfo(params).then(r=>{
        message.info(r.msg)
        store.setUser(params)
      })
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }


  return (
    <div className={s.userinfo}>
      <div className={s.wrap}>
        
        <h1>
          <img src={icon_cat} />
          <span>猫ちゃん情報</span>
        </h1>

        {user &&
        <Form form={form} layout='vertical' initialValues={user}>

          <FormCat />
        
          <div className={classnames('btnLg','lose')} onClick={doSave}>情報を変更する</div>


          <div className={s.del}>アカウントを削除する</div>
        </Form>}

        

      </div>
    </div>
  )

}

export default  observer(CatInfo)