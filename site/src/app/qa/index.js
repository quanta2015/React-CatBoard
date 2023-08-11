/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,DatePicker, Pagination} from 'antd';
import { useSearchParams } from 'react-router-dom';
import cls from 'classnames';
import { INF_TYPE,AREA_LIST } from '@/constant/data'
import {formatTime,fixBody,scrollToTop} from '@/util/fn'
import FormQa from './FormQa'
import CardQ3 from '@/component/CardQ3'


import s from './index.module.less';
import {SearchOutlined} from '@ant-design/icons'



const count = 150
const SIZE = 9
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const QA = () => {
  
  const { store } = React.useContext(MobXProviderContext)
  const { user,refresh } = store

  const [list,setList] = useState([])
  const [fav,setFav] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)
  const [key,setKey]= useState(null)
  const [queryKey,setQueryKey] = useState(null)
  const [query,setQuery]= useState(false)
  const [load, setLoad] = useState(false)

  const [showform,setShowForm] = useState(false)

  useEffect(()=>{
    store.setShow(true,'loading')
    store.queryQA({count,key}).then(r=>{
      console.log('取得データ',r)
      setList(r.data)

      r.data.map(o=>o.type='qa')
      setPageList(getPageList(r.data,1))
      store.setShow(false,'loading')
      scrollToTop()
    })
  },[query,load,refresh])



  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setQuery(!query)
      setQueryKey(key)
    }
  };


  const doChgKey =(e)=> {
    const val = e.target.value
    if (val==='') {
      setQuery(false)
    }
    setKey(val)
  }

  const doShowForm =()=>{
    setShowForm(true)
    fixBody(true)
    window.scrollTo(0, 0);
  }


  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,'qa')
  }

  return (
    <div className={s.qa}>
      <div className={s.wrap}>
        <div className={s.hd} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg01.webp)` }}  >
          <h1>Q＆A</h1>
          <p>
            <span>ユーザー同士で質問・回答することができます。</span>
            <Input 
              prefix={<SearchOutlined />} 
              placeholder="キーワードで検索" 
              onChange={doChgKey}
              onKeyDown={handleKeyDown}
              size="small"
              style = {{ borderRadius: '25px', color: '#ccc', alignSelf: 'flex-end', width: '300px', padding: '10px 25px', boxSizing:'border-box'}}
              allowClear
              />
          </p>
        </div>

        <div className={s.bd}>

          { user && 
          <div className={s.fn}>
            <span onClick={doShowForm}>質問を投稿</span>
          </div>}

          <div className={s.sect}>
            <h1>
              <span>{!query?'質問一覧':`「${queryKey}」の結果：`}</span>
            </h1>
            <div className={s.list}>
              {pageList.map((item,i)=>
                <CardQ3 key={i} {...item} onClick={()=>doShowDetail(item)} />
              )}
            </div>

            <div className={s.page}>
              <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
            </div>
          </div>
          
          
        </div>
      </div>

      {showform && 
      <div className={s.form}>
        <FormQa {...{ setShowForm, setLoad, load }} />
      </div>}
    </div>
  )

}

export default  observer(QA)