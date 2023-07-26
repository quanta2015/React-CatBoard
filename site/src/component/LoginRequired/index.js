import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'

import s from './index.module.less';


const LoginRequired = () => {

  return (
    <div className={s.loginReq} >
       <div className={s.wrap}>
          <div className={s.TextRow1}>
            <p>情報を投稿する前に<br></br>アカウント登録をお願いいたします。</p>
          </div>
          <div>
            <button className={s.btn}>新規登録</button>
          </div>
          <div className={s.TextRow3}>
            <p>投稿内容の編集 / 削除・他のユーザーとの連絡・ねこ記事の保存・Q＆Aに投稿<br></br>のためにアカウントが必要です。</p>
          </div>
          <div className={s.TextRow4}>
            <p>既にアカウントをお持ちの方はこちらからログインしてください</p>
          </div>
          <div >
            <button className={s.btn}>ログイン</button>
          </div>
        </div> 
        <ToTop />
        <Footer />
    </div>

  )

}

export default observer(LoginRequired)