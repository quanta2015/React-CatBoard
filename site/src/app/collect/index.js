/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,Radio,message,Modal, Pagination} from 'antd';
import cls from 'classnames';
import {PRE_IMG} from '@/constant/urls'
import { INF_TYPE,AREA_LIST,DEC_TYPE } from '@/constant/data'
import {formatTime,fixBody} from '@/util/fn'


import CardCat from '@/component/CardCat'

import s from './index.module.less';
import {SearchOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import icon_edit from '@/img/icon/edit.svg'
import icon_del from '@/img/icon/delete.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_map  from '@/img/icon/map.svg'
import icon_ques  from '@/img/icon/question.svg'
import icon_eye   from '@/img/icon/eye.svg'
import icon_heart from '@/img/icon/heart.svg'
import icon_clock from '@/img/icon/clock.svg'
import icon_flag from '@/img/icon/menu-flag.svg'



const { confirm } = Modal;


const count = 150
const SIZE = 5
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const Collect = () => {
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
  const [cond, setCond] = useState('lose')

  useEffect(()=>{
    if (!user) {
      navigate('/')
    }else{
      const params = {
        user_id: user.user_id,
        cond,
        key,
      }
      store.setShow(true,'loading')
      store.queryCollect(params).then(r=>{
        console.log('取得データ',r)
        setList(r.data)

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




  const doShowDetail =(item)=>{

    console.log(item,'item')
    store.setItem(item)
    store.setShow(true,'note')
  }


  const doSelType =(e)=>{
    setCond(e.target.value)
    setQuery(!query)
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
          <span>views</span>
        </p>
        <p>
          <img src={icon_heart} />
          <span>いいね </span>
        </p>
      </div>
    </div>

  )

  return (
    <div className={s.edit}>

      <div className={s.wrap}>
        <div className={s.hd} >
          <img src={icon_flag} />
          <h1>保存した内容</h1>
        </div>

        <div className={s.query}>
          <Radio.Group 
            options={[
              { value: 'lose', label: '迷子情報' },
              { value: 'prot', label: '保護投稿' },
              { value: 'note', label: '记事' },
            ]}
            value={cond} 
            optionType="button" 
            onChange={doSelType}
            />

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
          
        </div>

        <div className={s.bd}>   
          <div className={s.sect}>
            
            {pageList.length>0 && 
            <div className={s.list}>
              {pageList.map((item,i)=>
                item.board_type==='cat' ? 
                  <CardCat {...{item,i,doEdit:null,doDel:null}} />
                  :
                  renderNote(item,i)
              )}
            </div>}

            {pageList.length===0 && <div className={s.none}>データがありません</div>}


            <div className={s.page}>
              <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
            </div>
          </div> 
        </div>
      </div>
      



    </div>
  )

}

export default  observer(Collect)