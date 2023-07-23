import React,{useState,useEffect} from 'react';import { observer,MobXProviderContext } from 'mobx-react'import s from './index.module.less';import icon_gear  from '@/img/gear.svg'import icon_right from '@/img/right.svg'import icon_plus  from '@/img/plus.svg'import icon_edit  from '@/img/icon/edit.svg'const NavBtn = ({btnType, btnTitle, icoL, icoR, style, onClick }) => {  const { store } = React.useContext(MobXProviderContext)  const [selectedFile, setSelectedFile] = useState(null);  let icon   switch(btnType) {    case 'conf': icon = icon_gear;break;    case 'plus': icon = icon_plus;break;    case 'edit': icon = icon_edit;break;  }      return (    <div className={s.btn} style={style} onClick={onClick}>      {icoL && <img src={icon} alt="" />}      <i>{btnTitle}</i>      {icoR && <img className={s.icon} src={icon_right} /> }          </div>  )}export default observer(NavBtn)