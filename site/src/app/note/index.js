/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';

import s from './index.module.less';

const Note = () => {
  const { store } = React.useContext(MobXProviderContext)

  return (
    <div className={s.note}>
      note
    </div>
  )

}

export default  observer(Note)