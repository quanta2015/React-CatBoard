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


let Index  = Loadable({ loader: () => import('./app/index')})
let Layout = Loadable({ loader: () => import('./app/layout')})
// let Ware   = Loadable({ loader: () => import('./app/ware')})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"        element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
