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
import '@/less/fn.less'

configure({enforceActions: 'observed'})




const Layout = Loadable({ loader: () => import('./app/layout')})
const Index  = Loadable({ loader: () => import('./app/index')})
const Cat    = Loadable({ loader: () => import('./app/cat')})
const Note   = Loadable({ loader: () => import('./app/note')})
const Qa     = Loadable({ loader: () => import('./app/qa')})
const Ask    = Loadable({ loader: () => import('./app/ask')})

const Reg    = Loadable({ loader: () => import('./app/reg')})
const Login  = Loadable({ loader: () => import('./app/login')})

const UserInfo = Loadable({ loader: () => import('./app/userInfo')})
const Edit = Loadable({ loader: () => import('./app/edit')})
const Collect = Loadable({ loader: () => import('./app/collect')})

const Chat   = Loadable({ loader: () => import('./app/chat')})

const AskView    = Loadable({ loader: () => import('./app/askView')})
const NoteView    = Loadable({ loader: () => import('./app/noteView')})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/reg"      element={<Reg />} />

            <Route path="/"         element={<Index />} />
            <Route path="/cat"      element={<Cat />} />
            <Route path="/note"     element={<Note />} />
            <Route path="/qa"       element={<Qa />} />
            <Route path="/ask"      element={<Ask />} />


            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/edit"     element={<Edit />} />
            <Route path="/collect"  element={<Collect />} />
            

            <Route path="/chat"     element={<Chat />} />


            <Route path="/askView"  element={<AskView />} />
            <Route path="/noteView" element={<NoteView />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
