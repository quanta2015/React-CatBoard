import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import s from './index.module.less';



const Login = ({}) => {
  const { store } = React.useContext(MobXProviderContext)



  return (
    <div className={s.login} >

    </div>
  )

}

export default observer(Login)