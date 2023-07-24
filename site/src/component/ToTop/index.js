import React,{useState,useEffect} from 'react';
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';



const Footer = ({}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"  // 滚动行为设置为平滑
    });
  }

  return (
    <div className={s.top}>
      <span onClick={scrollToTop}></span>
    </div>
  )
}
export default Footer