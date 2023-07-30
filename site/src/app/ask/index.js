/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';


import s from './index.module.less';
import CardInfo from '@/component/CardInfo'
import Form from './Form'

import notice from '@/img/icon/warning-g.svg'


const initTitle = '質問する前にご確認ください。'
const initList = [{
  icon: notice,
  sect: ["**病気の診断**や薬または療法食の処方についてなど\n獣医師の判断が必要な内容は投稿せず受診してください。",
  "個人情報保護のため個人が特定される情報は&&投稿[http://baidu.com]&&しないでください。",
  "他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や\n他人を不快にさせる内容は投稿しないでください。",
  "商業目的や広告目的の内容は投稿しないでください。\n犯罪行為などを誘発 / 助長する内容は投稿しないでください。",
  "投稿が不適切だと判断した場合、削除することがあります。",
  "利用規約に同意の上ご投稿ください。"]
}]

const endTitle = '質問が投稿されました！'
const endList = [{
  icon: null,
  sect: ["他のユーザーからのリアクション・回答があると通知が届きます。",
  "通知は右上のベルボタンから確認できます。",
  "また新しい回答が届いた場合、\n登録されているメールアドレス宛にメールが届きます。"]
}]







const Ask = () => {
  const { store } = React.useContext(MobXProviderContext)

  const [submit,setSubmit] = useState(false)

 

  return (
   
    <div className={s.ask}>

      {(!submit) && 
        <>
          <CardInfo list={initList} title={initTitle} />
          <Form setSubmit={setSubmit} />
        </>
      }

      {(submit) && 
        <>
          <CardInfo list={endList} title={endTitle} />
        </>
      }
    </div>
  )

}

export default  observer(Ask)