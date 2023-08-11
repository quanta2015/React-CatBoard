/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { observer } from 'mobx-react'
import warn_lose  from '@/img/icon/warn_lose.svg'
import warn_prot  from '@/img/icon/warn_prot.svg'
import icon_check  from '@/img/icon/check.svg'
import s from './index.module.less';
import {SUB_TYPE} from '@/constant/data'



const UserConfirm = ({type}) => {
  
  return (
    <div className={s.userconfirm} style={{height: type === SUB_TYPE.qa_sub ? '600px' : '520px'}}>
        <div className={`${s.title} ${type !== SUB_TYPE.lose_sub ? s.titleWithMargin : ''}`}>
            {type}を投稿する前にご確認ください。
        </div>
        {type === SUB_TYPE.lose_sub && (
            <div>
                <img 
                    src={icon_check} 
                    className={s.icon} 
                    alt=""
                />
            <div className={`${s.text} ${s.largeText}`}><strong>警察</strong>に届出をしましたか？</div>
        <div className={`${s.text} ${s.largeText}`}><strong>保健所・動物愛護センター</strong>に問い合わせましたか？</div>
        </div>
        )}
        <img 
            src={type === SUB_TYPE.prot_sub ? warn_prot : warn_lose} 
            alt={type === SUB_TYPE.prot_sub ? 'protection information' : 'warning lost'} 
            className={s.icon} 
        />
        {type !== SUB_TYPE.qa_sub && (
            <div>
                <div className={s.text}>・電話番号やメールアドレスは入力せず、他のユーザーとの<br></br>連絡はねこならのメッセージ機能をご利用ください。</div>
                <div className={s.text}>・個人情報保護のため個人が特定される情報は入力しないでください。</div>
                <div className={s.text}>・報酬として金品を提示 / 要求しないでください。</div>
            </div>
        )}
        {type === SUB_TYPE.qa_sub && (
            <div>
                <div className={s.text}>・病気の診断や薬または療法食の処方についてなど<br></br>獣医師の判断が必要な内容は投稿せず受診してください。</div>
                <div className={s.text}>・個人情報保護のため個人が特定される情報は入力しないでください。</div>
                <div className={s.text}>・他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や<br></br>他人を不快にさせる内容は投稿しないでください。</div>
                <div className={s.text}>・商業目的や広告目的の内容は投稿しないでください。</div>
                <div className={s.text}>・犯罪行為などを誘発 / 助長する内容は投稿しないでください。</div>
                <div className={s.text}>・投稿が不適切だと判断した場合、削除することがあります。</div>
            </div>
        )}
        <div className={s.text}>・<a href="/terms" className={s.link}>利用規約</a>に同意の上ご投稿ください。</div>
    </div>
  )

}

export default  observer(UserConfirm)