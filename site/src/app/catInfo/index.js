/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form, message} from 'antd';
import classnames from 'classnames';
import {PRE_IMG} from '@/constant/urls'
import Upload from '@/component/Upload'
import FormCat from '@/component/FormCat'

import s from './index.module.less';

import icon_cat from '@/img/icon/menu-cat.svg'



const CatInfo = () => {
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)

  const [user, setUser] = useState(null)

  useEffect(()=>{
    if (store.user) {
      let _user = {
        cat: store.user?.cat
      }
      setUser(_user)
    }
  },[])

  const doSave =async()=>{
    try {
      const params = await form.validateFields();
      const _cat = {...params.cat}
      const _usr = store.user
      params.user_id = store.user.user_id
      // console.log(params)
      await store.saveCatInfo(params).then(r=>{
        message.info(r.msg)
        _usr.cat = _cat
        store.setUser(_usr)
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