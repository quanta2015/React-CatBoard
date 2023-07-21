import React,{useState,useEffect} from 'react';import { observer,MobXProviderContext } from 'mobx-react'import NavBtn from '@/component/NavBtn'import s from './index.module.less';const User = ({usr}) => {      return (    <div className={s.usr}>      <div className={s.wrap}>        <img src={usr.icon} alt="" />        <span>{usr.name}</span>        <NavBtn {...{btnType:"conf", btnTitle:"編集する", icoL: true, icoR: false }}/>      </div>          </div>  )}export default observer(User)