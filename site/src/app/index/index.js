/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin,Carousel,Button} from 'antd'
import {API_SERVER} from '@/constant/apis'
import { observer,MobXProviderContext } from 'mobx-react'
import Resizer from "react-image-file-resizer";
import { getNewsList,neList,qiList,qeList,qList } from '@/constant/data'

import Card  from '@/component/Card'
import CardQ1 from '@/component/CardQ1'
import CardQ2 from '@/component/CardQ2'
import Footer from '@/component/Footer'
import ToTop from '@/component/ToTop'

import s from './index.module.less';

import icon_close from '@/img/close.svg'
import icon_right from '@/img/right.svg'

import slide01 from '@/img/slide01.png'
import slide02 from '@/img/slide02.png'
import slide03 from '@/img/slide03.png'


const Index = () => {
  const { store } = React.useContext(MobXProviderContext)
  const [findList, setFindList] = useState([])
  const [loseList, setLoseList] = useState([])
  const [protList, setProtList] = useState([])
  const [noteList, setNoteList] = useState([])
  const [qaiList,  setQaiList] = useState([])
  const [qasList,  setQasList] = useState([])
  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    store.queryCats().then(r=>{
      console.log('取得データ',r)

      r.cat_find.map(o=>o.type = 'find' )
      r.cat_lose.map(o=>o.type = 'lose' )
      r.cat_prot.map(o=>o.type = 'prot' )
      r.note.map(o=>o.type = 'note' )
      r.qa_i.map(o=>o.type = '受付中' )
      r.qa_s.map(o=>o.type = '解決' )


      setFindList(r.cat_find)
      setLoseList(r.cat_lose)
      setProtList(r.cat_prot)
      setNoteList(r.note)
      setQaiList(r.qa_i)
      setQasList(r.qa_s)

      //Retrieve the latest 9 records
      let combinedList = [...r.cat_find, ...r.cat_lose, ...r.cat_prot, ...r.note, ...r.qa_i, ...r.qa_s];
      combinedList.sort((a, b) => new Date(b.sub_date) - new Date(a.sub_date)); // now using `sub_date`
      let newList = combinedList.slice(0, 9);
      setNewsList(newList)

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

  return (
    <>
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
      <div><Button type="primary" className={s.searchButton}>投稿</Button></div>
      <div className={s.bd}>

        <section>
          <div>
            {newsList.map((item,i)=>
              <Card {...item} key={i}/>
            )}
          </div>
        </section>
        
        <div className={s.adv}>ADVer</div>

        <section>
          {Header('迷子情報')}
          <div>{loseList.map((item,i)=> <Card key={i} {...item} /> )}</div>

        </section>

        <section>
          {Header('保護情報')}
          <div>{protList.map((item,i)=> <Card key={i} {...item} /> )}</div>
        </section>
        

        <div className={s.adv}>ADVer</div>

        <section>
          {Header('記事')}
          <div>{noteList.map((item,i)=> <Card key={i} {...item} /> )}</div>
        </section>


        <section>
          {Header('Q&A')}
          <div>
            <div className={s.wrap}>
              <span className={s.title}>受付中の質問</span>
              {qaiList.map((item,i)=> <CardQ1 key={i} {...item} clr={'#33831F'} /> )}
            </div>
            <div className={s.wrap}>
              <span className={s.title}>受付中の質問</span>
              {qasList.map((item,i)=> <CardQ1 key={i} {...item} clr={'#DE5A5A'} fit={'var(--fil-grey)'} /> )}
            </div>
          </div>
        </section>

        <div className={s.adv}>ADVer</div>


          
        <section>
          {Header('記事 ランキング')}
          <div>
            {neList.map((item,i)=> <Card key={i} {...item} id={i+1} /> )}
          </div>
        </section>


        <ToTop />

        <Footer />
      </div>
    </div>
    </>
  )
}


export default  observer(Index)