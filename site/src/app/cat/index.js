/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,DatePicker, Pagination} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { INF_TYPE,AREA_LIST } from '@/constant/data'
import Card  from '@/component/Card'
import cls from 'classnames';

import s from './index.module.less';


const { RangePicker } = DatePicker;


const SIZE = 15
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const Cat = () => {
  
  const { store } = React.useContext(MobXProviderContext)
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [list,setList] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)


  useEffect(()=>{
    const count = 150

    store.setShow(true,'loading')
    store.queryCats({type,count}).then(r=>{
      console.log('取得データ',r)
      r.data.map(o=>o.type = type )
      setList(r.data)
      setPageList(getPageList(r.data,1))

      store.setShow(false,'loading')
    })
  },[type])


  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  return (
    <div className={cls(s.cat,`g-${type}`)}>
      <div className={s.wrap}>
        <div className={s.hd} >
          <h1>猫ちゃんの迷子情報はこちらから投稿できます。</h1>
          <span>{INF_TYPE[type]}情報を投稿</span>
        </div>



        <div className={s.bd}>
          <h1>{INF_TYPE[type]}情報一覧</h1>

          <div className={s.menu}>
            <Select placeholder="都道府県を選択してください">
              {AREA_LIST.map((o, i) => (
                <Select.Option key={i} value={o}>{o}</Select.Option>
              ))}
            </Select>

            <RangePicker />
          </div>

          <div className={s.list}>
            {pageList.map((item,i)=> <Card key={i} {...item} /> )}

            <div className={s.page}>
              <Pagination defaultCurrent={1} pageSize={SIZE} total={list.length} onChange={(e)=>setPage(e)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default  observer(Cat)