/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { INF_TYPE,AREA_LIST } from '@/constant/data'

import cls from 'classnames';

import s from './index.module.less';

const Cat = () => {
  
  const { store } = React.useContext(MobXProviderContext)
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');


  return (
    <div className={cls(s.cat,`g-${type}`)}>
      <div className={s.wrap}>
        <div className={s.hd} >
          <h1>猫ちゃんの迷子情報はこちらから投稿できます。</h1>
          <span>{INF_TYPE[type]}情報を投稿</span>
        </div>



        <div className={s.bd}>
          <h1>{INF_TYPE[type]}情報一覧</h1>

          <div className={s.menu}>
            <Select placeholder="都道府県を選択してください">
              {AREA_LIST.map((o, i) => (
                <Select.Option key={i} value={o}>{o}</Select.Option>
              ))}
            </Select>
          </div>
        </div>
s
      </div>
    </div>
  )

}

export default  observer(Cat)