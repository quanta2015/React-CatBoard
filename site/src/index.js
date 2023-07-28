import React from 'react';
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from 'antd'
import Loadable from '@/component/Loadable'
import zhCN from 'antd/es/locale/zh_CN'
import injects from '@/store'


import '@/less/var.less'
import '@/less/com.less'


configure({enforceActions: 'observed'})

let Layout = Loadable({ loader: () => import('./app/layout')})
let Index  = Loadable({ loader: () => import('./app/index')})
let Cat    = Loadable({ loader: () => import('./app/cat')})
let Note   = Loadable({ loader: () => import('./app/note')})
let Qa     = Loadable({ loader: () => import('./app/qa')})
let Ask    = Loadable({ loader: () => import('./app/ask')})

let Reg    = Loadable({ loader: () => import('./app/reg')})
let Login  = Loadable({ loader: () => import('./app/login')})

let UserInfo = Loadable({ loader: () => import('./app/userInfo')})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login"  element={<Login />} />
            <Route path="/reg"  element={<Reg />} />

            <Route path="/"     element={<Index />} />
            <Route path="/cat"  element={<Cat />} />
            <Route path="/note" element={<Note />} />
            <Route path="/qa"   element={<Qa />} />
            <Route path="/ask"  element={<Ask />} />


            <Route path="/userInfo"  element={<UserInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
