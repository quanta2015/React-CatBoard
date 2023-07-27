/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';

import s from './index.module.less';

const Cat = () => {
  const { store } = React.useContext(MobXProviderContext)

  return (
    <div className={s.cat}>
      cat
    </div>
  )

}

export default  observer(Cat)