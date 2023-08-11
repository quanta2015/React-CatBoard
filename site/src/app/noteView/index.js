/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,message, Pagination, Modal} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { INF_TYPE,AREA_LIST } from '@/constant/data'
import {formatTime} from '@/util/fn'


import Card  from '@/component/Card'
import cls from 'classnames';

import s from './index.module.less';
import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_clock from '@/img/icon/clock.svg'
import {SearchOutlined,ExclamationCircleFilled} from '@ant-design/icons'
const { confirm } = Modal;

const count = 999999
const SIZE = 9
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const NoteView = () => {
  
  const { store } = React.useContext(MobXProviderContext)

  const [list,setList] = useState([])
  const [fav,setFav] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)
  const [key,setKey]= useState(null)
  const [queryKey,setQueryKey] = useState(null)
  const [query,setQuery]= useState(false)

  useEffect(()=>{
    store.setShow(true,'loading')
    store.queryNote({count,key}).then(r=>{
      console.log('取得データ',r)
      setFav(r.fav)
      setList(r.data)

      r.fav.map(o=>o.type='note')
      r.data.map(o=>o.type='note')
      setPageList(getPageList(r.data,1))
      store.setShow(false,'loading')
    })
  },[query,store.refresh])



  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,'addNote')
  }

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
          <span>{item.see.length} views</span>
        </p>
        <p>
          <img src={icon_heart} />
          <span>いいね {item.fav.length}</span>
        </p>
      </div>
      <div className={s.btn} onClick={(e)=>showDeleteConfirm(e,item)}>記事の削除</div>
    </div>

  )


  const doShowNoteForm =()=>{
    store.setShow(true,'addNote')
  }

  const showDeleteConfirm =(e,o)=>{
    e.stopPropagation()
    confirm({
      title: 'レコードの削除を確認します?',
      icon: <ExclamationCircleFilled />,
      okType: 'danger',
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        doDelNote(o)
      },
    });
  }

  const doDelNote = async(o)=>{
    store.setShow(true,'loading')
    await store.deleteBoard({ board_id: o.board_id }).then(r=>{
      store.setShow(false,'loading')
      store.setRefresh()
      message.info(r.msg)
    })
  }


  return (
    <div className={s.noteView}>
      <div className={s.wrap}>
        <div className={s.hd} >
          <h1>ねこ記事の管理</h1>
        </div>

        <div className={s.bd}>
          <div className={s.sect}>
            <h1>
              <em>{!query?'記事一覧':`「${queryKey}」の結果：`}</em>
              <Input 
                prefix={<SearchOutlined />} 
                placeholder="キーワードで検索" 
                onChange={doChgKey}
                onKeyDown={handleKeyDown}
                size="small"
                style = {{ width: '300px', padding: '0 20px ', borderRadius: '20px', color: '#ccc'}}
                allowClear
                />
              <div className="btnIn" onClick={doShowNoteForm}>
                ねこ記事の投稿
              </div>
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

export default  observer(NoteView)