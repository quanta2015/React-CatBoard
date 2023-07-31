/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input,Select,DatePicker, Pagination} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { INF_TYPE,AREA_LIST } from '@/constant/data'
import Card  from '@/component/Card'
import cls from 'classnames';
import dayjs from 'dayjs';


import s from './index.module.less';

const { Option } = Select;
// const { RangePicker } = DatePicker;

const count = 150
const SIZE = 15
const getPageList = (o,p) => o.filter((o,i)=> (i>=SIZE*(p-1))&&(i<=p*SIZE-1))

const Cat = () => {
  
  const { store } = React.useContext(MobXProviderContext)
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [list,setList] = useState([])
  const [pageList,setPageList]= useState([])
  const [page,setPage]= useState(1)
  const [area,setArea]= useState(null)
  const [fr,setFr]= useState(null)
  const [to,setTo]= useState(null)
  const [query,setQuery]= useState(false)



  useEffect(()=>{
    let params = {
      type,
      count,
      area,
      fr,to
    }

    store.setShow(true,'loading')
    store.queryCats(params).then(r=>{
      console.log('取得データ',r)
      r.data.map(o=>o.type = type )
      setList(r.data)
      setPageList(getPageList(r.data,1))

      store.setShow(false,'loading')
    })
  },[type,query])



  // 页面变化
  useEffect(() => {
    setPageList(getPageList(list,page))
  }, [page]);


  const doSelArea =(e)=>{
    setArea(e)
  }

  const doSelPeriod = (value) => {
    let fr, to;

    switch (value) {
      case "today":
        fr = dayjs().startOf('day');
        to = dayjs().endOf('day');
        break;
      case "3days":
        fr = dayjs().subtract(3, 'day').startOf('day');
        to = dayjs().endOf('day');
        break;
      case "1week":
        fr = dayjs().subtract(1, 'week').startOf('day');
        to = dayjs().endOf('day');
        break;
      case "3weeks":
        fr = dayjs().subtract(3, 'weeks').startOf('day');
        to = dayjs().endOf('day');
        break;
      case "1month":
        fr = dayjs().subtract(1, 'month').startOf('day');
        to = dayjs().endOf('day');
        break;
      case "before":
        fr = dayjs().subtract(10, 'year').startOf('day'); // For "before", just return a far enough past date
        to = dayjs().subtract(1, 'month').endOf('day'); // Until the end of last month
        break;
      default:
        fr = to = null;
    }

    setFr(fr)
    setTo(to)
  }


  const doQuery=()=>{
    setQuery(!query)
  }


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
            <Select 
              onChange={doSelArea}
              placeholder="都道府県を指定" 
              allowClear 
              style={{'width':'300px'}}
              >
              {AREA_LIST.map((o, i) => (
                <Select.Option key={i} value={o} >{o}</Select.Option>
              ))}
            </Select>

            <Select 
              style={{ width: 200 }} 
              placeholder="日時を指定" 
              onChange={doSelPeriod}
              allowClear
              >
              <Option value="today">今日</Option>
              <Option value="3days">３日以内</Option>
              <Option value="1week">１週間以内</Option>
              <Option value="3weeks">３週間以内</Option>
              <Option value="1month">１ヶ月以内</Option>
              <Option value="before">それ以前</Option>
            </Select>

            <Button onClick={doQuery}>検索</Button>
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