/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';


import s from './index.module.less';
import CardInfo from '@/component/CardInfo'
const { TextArea } = Input

const list = [
  "病気の診断や薬または療法食の処方についてなど\n獣医師の判断が必要な内容は投稿せず受診してください。",
  "個人情報保護のため個人が特定される情報は投稿しないでください。",
  "他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や\n他人を不快にさせる内容は投稿しないでください。",
  "商業目的や広告目的の内容は投稿しないでください。\n犯罪行為などを誘発 / 助長する内容は投稿しないでください。",
  "投稿が不適切だと判断した場合、削除することがあります。",
  "利用規約に同意の上ご投稿ください。"
]

const title = '質問する前にご確認ください。'

const Ask = () => {
  const { store } = React.useContext(MobXProviderContext)


  return (
  
    <div className={s.ask}>
      <CardInfo list={list} title={title} />

      <div className={s.form}>
        <div className={s.row}>
          <label>タイトル :</label>
          <Input></Input>
        </div>
        <div className={s.row}>
          <label>内容  :</label>
          <TextArea allowClear style={{height: '300px'}} />
        </div>

        <div className={s.row}>
          <div className={s.btn}>
            質問を投稿
          </div>
        </div>
      </div>
    </div>
  )

}

export default  observer(Ask)