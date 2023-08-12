/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,message,Modal, Pagination} from 'antd';
import cls from 'classnames';
import {PRE_IMG} from '@/constant/urls'
import { INF_TYPE,AREA_LIST,DEC_TYPE } from '@/constant/data'
import {formatTime,fixBody,cfm} from '@/util/fn'

import CardCat from '@/component/CardCat'
import CardQa  from '@/component/CardQa'
import FormQa  from './FormQa'
import FormPost from './FormPost'


import s from './index.module.less';
import {SearchOutlined} from '@ant-design/icons'


const count = 150
const SIZE = 5
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const Edit = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(MobXProviderContext)
  const { user,refresh } = store

  const [list,setList] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)
  const [key,setKey]= useState('')
  const [queryKey,setQueryKey] = useState(null)
  const [query,setQuery]= useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [type, setType] = useState(null)
  const [cond, setCond] = useState('all')

  useEffect(()=>{
    if (!user) {
      navigate('/')
    }else{
      const params = {
        sub_user: user.user_id,
        cond,
        key,
      }
      store.setShow(true,'loading')
      store.queryByMe(params).then(r=>{
        console.log('取得データ',r)
        setList(r.data)

        r.data.map(o=>o.type='qa')
        setPageList(getPageList(r.data,1))
        store.setShow(false,'loading')
      })
    }
  },[query,refresh])



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
      setQuery(!query)
    }
    setKey(val)
  }


  const doSelType =(e)=>{
    // console
    setCond(e)
    setQuery(!query)
  }


  const doShowDetail =(item)=>{
    store.setItem(item)
    store.setShow(true,'qa')
  }


  const doEditCat =(item)=>{
    // console.log('item',item)
    store.setItem(item)
    store.subType = DEC_TYPE[item.category]
    setType('cat')
    setShowEdit(true)
  }

  const doEditQa =(item)=>{
    // console.log('item',item)
    store.setItem(item)
    // store.subType = DEC_TYPE[item.category]
    setType('qa')
    setShowEdit(true)
  }

  

  const doDelBoard =async(item)=>{
    store.setShow(true,'loading')
    await store.deleteBoard({board_id: item.board_id}).then(r=>{
      store.setShow(false,'loading')
      store.setRefresh()
      message.info(r.msg)
    })
  }

  const showDeleteConfirm =(o)=>{
    cfm('レコードの削除を確認します?',doDelBoard,o)
  }


  return (
    <div className={s.edit}>

      {!showEdit && 
      <div className={s.wrap}>
        <div className={s.hd} >
          <h1>投稿した内容</h1>

          <div className={s.query}>
            <Input 
              prefix={<SearchOutlined />} 
              placeholder="キーワードで検索" 
              onChange={doChgKey}
              onKeyDown={handleKeyDown}
              size="small"
              style = {{ 
                borderRadius: '25px', 
                color: '#ccc', 
                width: '200px', 
                padding: '5px 25px',
                marginRight: '20px'
              }}
              allowClear
              />
            <Select
              defaultValue="all"
              style={{ width: 100 }}
              onChange={doSelType}
              options={[
                { value: 'all', label: '全て' },
                { value: 'lose', label: '迷子情報' },
                { value: 'prot', label: '保護投稿' },
                { value: 'qa', label: '質問未解决' },
                { value: 'qae', label: '質問解决' },
              ]}
              />
          </div>
          
        </div>

        <div className={s.bd}>   
          <div className={s.sect}>

            {pageList.length>0 && 
            <div className={s.list}>
              {pageList.map((item,i)=>
                item.board_type==='cat' ? 
                  <CardCat {...{item,i,doEdit:doEditCat,doDel:showDeleteConfirm}} />
                  :
                  <CardQa {...{item,i,doEditQa,showDeleteConfirm}} />
              )}
            </div>}

            {pageList.length===0 && <div className={s.none}>データがありません</div>}

            <div className={s.page}>
              <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
            </div>
          </div> 
        </div>
      </div>}
      

      {showEdit && 
      <div className={s.editForm}>
        {type==='cat'?
          <FormPost setShowEdit={setShowEdit} />
          :
          <FormQa setShowEdit={setShowEdit} />
        }
      </div>}


    </div>
  )

}

export default  observer(Edit)