/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import s from './index.module.less';


const list = [
  "病気の診断や薬または療法食の処方についてなど 獣医師の判断が必要な内容は投稿せず受診してください。",
  "個人情報保護のため個人が特定される情報は投稿しないでください。",
  "他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や 他人を不快にさせる内容は投稿しないでください。",
  "商業目的や広告目的の内容は投稿しないでください。 犯罪行為などを誘発 / 助長する内容は投稿しないでください。",
  "投稿が不適切だと判断した場合、削除することがあります。",
  "利用規約に同意の上ご投稿ください。"
]

const Ask = () => {
  const { store } = React.useContext(MobXProviderContext)


  return (
  
    <div className={s.ask}>
      <div className={s.wrap}>
        <h1>質問する前にご確認ください。</h1>

        <div className={s.list}>
          {list.map((item,i)=> 
            <span >{item}</span>
          )}
        </div>
        

      </div>
    </div>
  )

}

export default  observer(Ask)