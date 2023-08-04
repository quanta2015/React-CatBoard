import React from 'react';
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from 'antd'
import Loadable from '@/component/Loadable'
import zhCN from 'antd/es/locale/zh_CN'
import injects from '@/store'
import mqtt from "mqtt";

import '@/less/var.less'
import '@/less/com.less'
import '@/less/fn.less'

configure({enforceActions: 'observed'})



const client = mqtt.connect('ws://121.40.124.170:1884');
client.on('connect', () => {
  console.log('Connected to MQTT broker.');

  client.subscribe('/cat/chat');
});

client.on('error', (err) => {
  console.error('Error:', err);
});

client.on("message", function(top, msg) {
  console.log(top,msg)
});





let Layout = Loadable({ loader: () => import('./app/layout')})
let Index  = Loadable({ loader: () => import('./app/index')})
let Cat    = Loadable({ loader: () => import('./app/cat')})
let Note   = Loadable({ loader: () => import('./app/note')})
let Qa     = Loadable({ loader: () => import('./app/qa')})
let Ask    = Loadable({ loader: () => import('./app/ask')})

let Reg    = Loadable({ loader: () => import('./app/reg')})
let Login  = Loadable({ loader: () => import('./app/login')})

let UserInfo = Loadable({ loader: () => import('./app/userInfo')})
let CatInfo = Loadable({ loader: () => import('./app/catInfo')})

let Rep = Loadable({ loader: () => import('./app/rep')})






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
            <Route path="/catInfo"   element={<CatInfo />} />

            <Route path="/rep"   element={<Rep />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
