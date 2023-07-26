import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import Loading from 'react-loading-spinkit'
import Menu from '@/component/Menu'
import Nav from '@/component/Nav'
import FormCat from '@/component/FormCat'
import Detail from '@/component/Detail'
import LoginRequired from '@/component/LoginRequired'
import LoadingPage from '@/component/LoadingPage'

import s from './index.module.less';
import logo from '@/img/logo.svg'
import load from '@/img/loading.png'



const Layout = () => {
  const { store } = React.useContext(MobXProviderContext)
  const {loading,edit} = store

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'windows phone'];
  const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
  const isSmallScreen = window.innerWidth < 768;
	store.mobile = isMobileDevice || isSmallScreen



  return (
    <>
      <Menu />
      <div className={s.main}>

        <div className={s.wrap}>

          {/*等待画面*/}
          {loading &&  <div className={s.load}> <img src={load} /> </div> }

          {/*发帖画面*/}
          { detail && <div className={s.detail}><Detail /></div>}

          {/*发帖画面*/}
          { edit && <div className={s.edit}><FormCat /></div>}
          {loginRequired && <div className={s.loginRequired}><LoginRequired /></div>}
          <Outlet />
        </div>
      </div>
    </>
  )
 
}

export default inject('store')(observer(Layout))
