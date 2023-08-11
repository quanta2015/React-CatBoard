import React,{useState,useEffect} from 'react';
import classnames from 'classnames';
import {API_SERVER} from '@/constant/apis'
import s from './index.module.less';
import {scrollToTop} from '@/util/fn'


const Footer = ({}) => {

  return (
    <div className={s.top}>
      <span onClick={()=>scrollToTop("smooth")}></span>
    </div>
  )
}
export default Footer