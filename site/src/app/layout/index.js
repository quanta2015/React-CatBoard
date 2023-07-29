import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import Loading from 'react-loading-spinkit'
import { Form } from 'antd';

import Menu from './Menu'
import FormCat from '@/component/FormCat'
import Detail from '@/component/Detail'
import LoginRequired from '@/component/LoginRequired'
import FormPost from '@/component/FormPost'
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'


import s from './index.module.less';
import logo from '@/img/logo.svg'
import load from '@/img/loading.png'



const Layout = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const {loading,edit,detail,login,loginReq} = store

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'windows phone'];
  const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
  const [form] = Form.useForm();
  const isSmallScreen = window.innerWidth < 768;
  const title = '情報'
  const type = '迷子情報'
	store.mobile = isMobileDevice || isSmallScreen



  useEffect(()=>{
    if (store.user === null) {
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

          {/*发帖画面*/}
          { detail && <div className={s.detail}><Detail /></div>}

          {/*发帖画面*/}
          { edit && <div className={s.edit}><FormPost form={form} file={[]}/></div>}

          {loginReq && <div className={s.loginRequired}><LoginRequired title={title} /></div>}
          <Outlet />

          <ToTop />

          <Footer />
        </div>
      </div>
    </>
  )
 
}

export default inject('store')(observer(Layout))
