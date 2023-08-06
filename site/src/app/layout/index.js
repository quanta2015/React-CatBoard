import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import Loading from 'react-loading-spinkit'
import { message} from 'antd'

import Menu from './Menu'
import FormCat from '@/component/FormCat'
import DetailCat from '@/component/DetailCat'
import DetailNote from '@/component/DetailNote'
import DetailQa from '@/component/DetailQa'
import LoginRequired from '@/component/LoginRequired'
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'


import s from './index.module.less';
import logo from '@/img/logo.svg'
import load from '@/img/loading.png'



const Layout = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const {loading,edit,detail,login,loginReq,note,qa} = store

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'windows phone'];
  const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
  const isSmallScreen = window.innerWidth < 768;
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
          }else{
            message.info(r.msg)
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


          {/*NOTE详情画面*/}
          { qa && <div className={s.qa}><DetailQa /></div>}

          {/*发帖画面*/}
          { edit && <div className={s.edit}><FormCat /></div>}

          {loginReq && <div className={s.loginRequired}><LoginRequired /></div>}
          <Outlet />

          <ToTop />

          <Footer />
        </div>
      </div>
    </>
  )
 
}

export default inject('store')(observer(Layout))
