/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin,Carousel,Button} from 'antd'
import {API_SERVER} from '@/constant/apis'
import { observer,MobXProviderContext } from 'mobx-react'
import { neList } from '@/constant/data'
import { combineAndSortLists } from '@/util/fn'

import Card  from '@/component/Card'
import CardQ1 from '@/component/CardQ1'
import CardQ3 from '@/component/CardQ3'


import s from './index.module.less';

import icon_close from '@/img/close.svg'
import icon_right from '@/img/right.svg'

import slide01 from '@/img/slide01.png'
import slide02 from '@/img/slide02.png'
import slide03 from '@/img/slide03.png'


const Index = () => {
  const { store } = React.useContext(MobXProviderContext)

  const [loseList, setLoseList] = useState([])
  const [protList, setProtList] = useState([])
  const [noteList, setNoteList] = useState([])
  const [qaiList,  setQaiList] = useState([])
  const [qasList,  setQasList] = useState([])
  const [catList,  setCatList] = useState([])

  useEffect(()=>{
    store.setShow(true,'loading')
    store.queryAll().then(r=>{
      console.log('取得データ',r)
      const {cat_lose,cat_prot,note,qa_i,qa_s,cat} = r
      cat.map(o=> o.type = o.category==='保護'?'prot':'lose')
      cat_lose.map(o=>o.type = 'lose' )
      cat_prot.map(o=>o.type = 'prot' )
      note.map(o=>o.type = 'note' )
      qa_i.map(o=>o.type = '受付中' )
      qa_s.map(o=>o.type = '解決' )
      
      setCatList(cat);
      setLoseList(r.cat_lose)
      setProtList(r.cat_prot)
      setNoteList(r.note)
      setQaiList(r.qa_i)
      setQasList(r.qa_s)

      store.setShow(false,'loading')
    })
  },[])

  const contentStyle = {
    margin: 0,
    height: '275px',
    color: '#fff',
    lineHeight: '275px',
    textAlign: 'center',
    background: '#364d79',
  };

  const listS = [1,1,1,1]

  const [name, setName] = useState('')

  const Header = (title)=>(
    <div className={s.header}>
      <h1>{title}</h1>
      <span>{`${title}　一覧を見る`}</span>
      <img src={icon_right} />
    </div>
  )


  const doNewArticle =(type)=>{
    store.setShow(true,'edit')
  }

  return (
    
      <div className={s.index}>
        
        <div className={s.hd}>
          <div className={s.lt}>
            <Carousel autoplay autoplaySpeed={5000}>
              {listS.map((item,i)=>
              <div key={i}>
                <h3 style={contentStyle}>
                  <img src={slide01} />
                </h3>
              </div>
              )}
            </Carousel>
          </div>
        </div>
        <div className={s.rectangle}>
          <p className={s.text}>愛猫の迷子情報・迷子の猫ちゃんを保護した情報はこちらから投稿できます。</p>
          <div className={s.buttonContainer}>
            <button className={`${s.btn} ${s.btn1}`} onClick={()=>doNewArticle('lose')}>迷子情報を投稿</button>
            <button className={`${s.btn} ${s.btn2}`} onClick={()=>doNewArticle('prot')}>保護情報を投稿</button>
          </div>
        </div>
        <div className={s.bd}>

          <section>
          <h1 style={{fontSize: "40px"}}>{'新着情報'}</h1>
            <div>
              {catList.map((item,i)=>
                <Card {...item} key={i}/>
              )}
            </div>
          </section>
          
          <div className={s.adv}></div>
          <section>
            {Header('迷子情報')}
            <div>{loseList.slice(0, 3).map((item,i)=> <Card key={i} {...item} /> )}</div>
          </section>
          <div className={s.adv}></div>
          <section>
            {Header('保護情報')}
            <div>{protList.slice(0, 3).map((item,i)=> <Card key={i} {...item} /> )}</div>
          </section>
          <div className={s.adv}></div>
          <section>
            {Header('記事')}
            <div>{noteList.slice(0, 3).map((item,i)=> <Card key={i} {...item} /> )}</div>
          </section>
          <div className={s.adv}></div>
          <section>
            {Header('Q&A')}
            <div>
              <div className={s.wrap}>
                <span className={s.title}>受付中の質問</span>
                {qaiList.map((item,i)=> <CardQ3 key={i} {...item} clr={'#33831F'} /> )}
              </div>
              <div className={s.wrap}>
                <span className={s.title}>受付中の質問</span>
                {qasList.map((item,i)=> <CardQ3 key={i} {...item} clr={'#DE5A5A'} fit={'var(--fil-grey)'} /> )}
              </div>
            </div>
          </section>
          <div className={s.adv}></div>
          
        </div>
      </div>
    
  )
}


export default  observer(Index)