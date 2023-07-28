/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form,  message, Modal} from 'antd';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom'
import Upload from '@/component/Upload'
import warn_lose  from '@/img/icon/warn_lose.svg'
import warn_prot  from '@/img/icon/warn_prot.svg'
import icon_check  from '@/img/icon/check.svg'
import s from './index.module.less';



const UserConfirm = ({type}) => {
  
  return (
    <div className={s.userconfirm}>
        <div className={s.title}>{type}を投稿する前にご確認ください。</div> 
        {type !== '保護情報' && (
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
            src={type === '保護情報' ? warn_prot : warn_lose} 
            alt={type === '保護情報' ? 'protection information' : 'warning lost'} 
            className={s.icon} 
        />
        <div className={s.text}>・電話番号やメールアドレスは入力せず、他のユーザーとの<br></br>連絡はねこならのメッセージ機能をご利用ください。</div>
        <div className={s.text}>・個人情報保護のため個人が特定される情報は入力しないでください。</div>
        <div className={s.text}>・報酬として金品を提示 / 要求しないでください。</div>
        <div className={s.text}>・<a href="/terms" className={s.link}>利用規約</a>に同意の上ご投稿ください。</div>
    </div>
  )

}

export default  observer(UserConfirm)