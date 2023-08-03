import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import Loading from 'react-loading-spinkit'
import { message} from 'antd'
import { Form } from 'antd';

import Menu from './Menu'
import FormCat from '@/component/FormCat'
import DetailCat from '@/component/DetailCat'
import DetailNote from '@/component/DetailNote'
import LoginRequired from '@/component/LoginRequired'
import CardDetailCat from '@/component/CardDetailCat'
import FormPost from '@/component/FormPost'
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'


import s from './index.module.less';
import logo from '@/img/logo.svg'
import load from '@/img/loading.png'



const Layout = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const {loading,edit,detail,login,loginReq,note,subType,confirm} = store

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'windows phone'];
  const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
  const [form] = Form.useForm();
  const isSmallScreen = window.innerWidth < 768;
  const title = '情報'
  const btnTxt = 'test'

	store.mobile = isMobileDevice || isSmallScreen



  useEffect(()=>{
    let userLocal = store.getUser()
    let userStore = store.user
    if(userLocal) {
      try {
        store.login(userLocal).then(r=>{
          if (r.code ===0) {
            message.info('登录成功！')
            store.setUser(r.data)
          }
        })
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    }else if(userStore === null) {
      navigate('/')
    }
  },[])

  return (
    <>
      <Menu /> 
      <div className={s.main}>

        <div className={s.wrap}>

          {/*等待画面*/}
          { loading &&  <div className={s.load}> <img src={load} /> </div> }

          {/*CAT详情画面*/}
          { detail && <div className={s.detail}><DetailCat /></div>}

          {/*NOTE详情画面*/}
          { note && <div className={s.note}><DetailNote /></div>}

          {/*发帖画面*/}
          { edit && <div className={s.edit}><FormPost form={form} file={[]}/></div>} 

          {loginReq && <div className={s.loginRequired}><LoginRequired title={title} /></div>}
          
          {/*投稿确认画面*/}
          {confirm && <div className={s.detail}><CardDetailCat btnTxt={btnTxt} /></div> } 
          <Outlet />

          <ToTop />

          <Footer />
        </div>
      </div>
    </>
  )
 
}

export default inject('store')(observer(Layout))
