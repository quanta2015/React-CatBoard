/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';


import s from './index.module.less';
import CardInfo from '@/component/CardInfo'
import Form from './Form'

import notice from '@/img/icon/warning-g.svg'


const endTitle = 'お問い合わせが送信されました。'
const endList = [{
  icon: notice,
  sect: ["回答にお時間をいただく場合がございます。",
  "あらかじめご了承ください。",
  "また記載されたメールアドレスに不備がある場合、",
  "こちらからの返事が届きません。",
  "数日経ってもこちらからの返事が届かない場合は",
  "お手数ですがもう一度お問い合わせください。"]
}]




const Ask = () => {
  const { store } = React.useContext(MobXProviderContext)

  const [submit,setSubmit] = useState(false)

  const doClose =()=>{
    setSubmit(false)
  }

  return (
  
    <div className={s.ask}>

      {(!submit) && 
        <>
          
          <Form setSubmit={setSubmit} />
        </>
      }

      {(submit) && 
        <>
          <CardInfo list={endList} title={endTitle} btn={true} event={doClose}/>

        </>
      }
    </div>
  )

}

export default  observer(Ask)