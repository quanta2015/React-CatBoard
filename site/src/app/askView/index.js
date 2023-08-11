/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,DatePicker, Table, Pagination} from 'antd';
import cls from 'classnames';
import {PRE_IMG} from '@/constant/urls'
import { INF_TYPE,AREA_LIST,DEC_TYPE } from '@/constant/data'
import {formatTime,fixBody} from '@/util/fn'


import s from './index.module.less';
import {SearchOutlined} from '@ant-design/icons'
import icon_edit from '@/img/icon/edit.svg'
import icon_del from '@/img/icon/delete.svg'
import icon_cal from '@/img/icon/calendar.svg'
import icon_map  from '@/img/icon/map.svg'
import icon_ques  from '@/img/icon/question.svg'


const count = 150
const SIZE = 5
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))




const AskView = () => {
  const navigate = useNavigate();
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
    if (!user) {
      navigate('/')
    }else{
      const params = {
        sub_user: user.user_id
      }
      store.setShow(true,'loading')
      store.queryQuestion(params).then(r=>{
        console.log('取得データ',r)
        
        setList(r.data)

        r.data.map(o=>o.type='qa')
        setPageList(getPageList(r.data,1))
        store.setShow(false,'loading')
      })
    }
  },[query,load,refresh])






  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  return (
    <div className={s.askView}>
      <div className={s.wrap}>
        <div className={s.hd} >
          <h1>お問い合わせの管理</h1>
        </div>

        <div className={s.bd}>
          <div className={s.list}>
          {pageList.map((item,i)=>
            <div className={s.quetItem}>
              <h1>{item.title}</h1>
              <h2>
                <span>{item.sub_date}</span>
                <span>{item.mail}</span>
              </h2>
              <p>{item.content}</p>
            </div>
          )}
          </div>

          <div className={s.page}>
            <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
          </div>
        </div>

      </div>
     
    </div>
  )

}

export default  observer(AskView)