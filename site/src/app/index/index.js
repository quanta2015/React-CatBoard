/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin,Carousel} from 'antd'
import {API_SERVER} from '@/constant/apis'
import { observer,MobXProviderContext } from 'mobx-react'
import { getNewsList,ltList,fdList,ptList,neList,qiList,qeList } from '@/constant/data'
import Card  from '@/component/Card'
import CardQ from '@/component/CardQ'



import s from './index.module.less';

import icon_close from '@/img/close.svg'

import slide01 from '@/img/slide01.png'
import slide02 from '@/img/slide02.png'
import slide03 from '@/img/slide03.png'


const Index = () => {
  const { store } = React.useContext(MobXProviderContext)
  
  const contentStyle = {
    margin: 0,
    height: '275px',
    color: '#fff',
    lineHeight: '275px',
    textAlign: 'center',
    background: '#364d79',
  };

  const listS = [1,1,1,1]

  const newsList = getNewsList()

  return (
  
    <div className={s.index}>
      <div className={s.hd}>
        <div className={s.lt}>
          <Carousel >
            {listS.map((item,i)=>
            <div key={i}>
              <h3 style={contentStyle}>
                <img src={slide01} />
              </h3>
            </div>
            )}
          </Carousel>
        </div>
        <div className={s.rt}>
          <img src={slide02} />
          <img src={slide03} />
        </div>
      </div>

      <div className={s.bd}>

        <section>
          <p>
            {newsList.map((item,i)=>
              <Card {...item} />
            )}
          </p>
        </section>
        
        <div className={s.adv}>ADVer</div>

        <section>
          <h1>目撃情報</h1>
          <p>
            {ltList.map((item,i)=> <Card {...item} /> )}
          </p>
        </section>

        <section>
          <h1>迷子情報</h1>
          <p>
            {fdList.map((item,i)=> <Card {...item} /> )}
          </p>
        </section>

        <section>
          <h1>保護情報</h1>
          <p>
            {ptList.map((item,i)=> <Card {...item} /> )}
          </p>
        </section>
        

        <div className={s.adv}>ADVer</div>

        <section>
          <h1>記事</h1>
          <p>
            {neList.map((item,i)=> <Card {...item} /> )}
          </p>
        </section>


        <section>
          <h1>Q&A</h1>
          <p>
            <div className={s.wrap}>
              <span className={s.title}>受付中の質問</span>
              {qiList.map((item,i)=> <CardQ {...item} clr={'#33831F'} /> )}
            </div>
            <div className={s.wrap}>
              <span className={s.title}>受付中の質問</span>
              {qeList.map((item,i)=> <CardQ {...item} clr={'#DE5A5A'} /> )}
            </div>
          </p>
        </section>

        <div className={s.adv}>ADVer</div>

      </div>
      
    </div>
  )

}

export default  observer(Index)