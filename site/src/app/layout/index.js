import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { inject,observer,MobXProviderContext } from 'mobx-react'
import Loading from 'react-loading-spinkit'
import Menu from '@/component/Menu'
import Nav from '@/component/Nav'
import LoadingPage from '@/component/LoadingPage'

import s from './index.module.less';
import logo from '@/img/logo.svg'
import loading from '@/img/loading.png'


const Layout = () => {
  const { store } = React.useContext(MobXProviderContext)

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'windows phone'];
  const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
  const isSmallScreen = window.innerWidth < 768;
	store.mobile = isMobileDevice || isSmallScreen



  return (
    <>
      <Menu />
      <div className={s.main}>
        <Nav />

        <div className={s.wrap}>
          {store.loading && 
            <div className={s.load}> <img src={loading} /> </div>
           }
          <Outlet />
        </div>
      </div>
    </>
  )
 
}

export default inject('store')(observer(Layout))
