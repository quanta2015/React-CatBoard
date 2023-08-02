/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,DatePicker, Pagination} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { INF_TYPE,AREA_LIST } from '@/constant/data'
import {formatTime} from '@/util/fn'

import Card  from '@/component/Card'
import cls from 'classnames';

import s from './index.module.less';
import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_clock from '@/img/icon/clock.svg'


const { RangePicker } = DatePicker;

const count = 150
const SIZE = 9
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const Note = () => {
  
  const { store } = React.useContext(MobXProviderContext)

  const [list,setList] = useState([])
  const [fav,setFav] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)



  useEffect(()=>{
    store.setShow(true,'loading')
    store.queryNote({count}).then(r=>{
      console.log('取得データ',r)
      setFav(r.fav)
      setList(r.data)

      r.fav.map(o=>o.type='note')
      r.data.map(o=>o.type='note')
      setPageList(getPageList(r.data,1))
      store.setShow(false,'loading')
    })
  },[])



  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,(item.type==='note')?'note':'detail')
  }



  const renderNote =(item,i,rank=null) => (
    <div className={cls(s.noteitem,rank)} key={i} onClick={()=>doShowDetail(item)}>
      {rank && <em>{i}</em>}
      <h1>{item.title}</h1>
      <div className={s.desc}>
        <p>
          <img src={icon_clock} />
          <span>{formatTime(item.sub_date)}</span>
        </p>
        <p>
          <img src={icon_eye} />
          <span>{item.view.length} views</span>
        </p>
        <p>
          <img src={icon_heart} />
          <span>いいね {item.fav.length}</span>
        </p>
      </div>
    </div>

  )


  return (
    <div className={s.note}>
      <div className={s.wrap}>
        <div className={s.hd} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg02.webp)` }}  >
          <h1>ねこ記事</h1>
          <p>
            <span>猫ちゃんに関する記事を掲載しています</span>
            <Input placeholder="キーワードで検索" />
          </p>
        </div>



        <div className={s.bd}>
          <div className={s.sect}>
            <h1>
              <span>ランキング</span>
              <em>MOST LIKED</em>
            </h1>
            <div className={s.list}>
              {fav.map((item,i)=>
                renderNote(item,i+1,'rank')
              )}
            </div>
          </div>


          <div className={s.sect}>
            <h1>
              <span>記事一覧</span>
            </h1>
            <div className={s.list}>
              {pageList.map((item,i)=>
                renderNote(item,i)
              )}
            </div>

            <div className={s.page}>
              <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )

}

export default  observer(Note)