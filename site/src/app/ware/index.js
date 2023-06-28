/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import {Input, Table, Space, Pagination, Spin, Form, Button, Row, Col,Modal} from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined,ExclamationCircleFilled } from '@ant-design/icons';
import {API_SERVER} from '@/constant/apis'
import { observer,MobXProviderContext } from 'mobx-react'
import FormMain from './FormMain'
import {json_w1,json_w2,jsonList} from '@/constant/data'
import {filterData,getKeyField,clone} from '@/util/fn'
import s from './index.module.less';
import { useSearchParams } from 'react-router-dom';

const { confirm } = Modal;



const Ware = () => {
  const { store } = React.useContext(MobXProviderContext)

  const [searchParams] = useSearchParams();
  const index = searchParams.get('index');
  // console.log(index,'index')
  const dataJson  = jsonList[index]
  const define    = dataJson.define
  const defineSub = dataJson.sub.define

  

  const [method, setMethod] = useState('Insert')
  const [loading,setLoading] = useState(false)
  const [refresh,setRefresh] = useState(false)
  const [ds,setDs] = useState(false)
  const [sub,setSub] = useState([])
  const [showSub,setShowSub] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const [colM,setColM] = useState([])
  const [colJ,setColJ] = useState([])

  // 普通字段
  const col_m = filterData(define,'sign')  
  // json字段
  const col_j = filterData(define,'json')
  // auto字段
  const col_a = filterData(define,'auto')



  const col_s = filterData(defineSub,'sign') 

  const col = col_m.concat({
    title: '功能',
    width: 150,
    render: (item) => (
      <Space>
        <a onClick={()=>doDetail(item)}>详情</a>
        <a onClick={()=>doEdit(item)}>修改</a>
        <a onClick={()=>showDeleteConfirm(item)}>删除</a>
      </Space>
    ),
  })



  const showDeleteConfirm = (e) => {
    confirm({
      title: '确认要删除记录?',
      icon: <ExclamationCircleFilled />,
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        doDel(e)
      },
    });
  };

  const doDetail =(e)=>{
    setSub(e.sub)
    setShowSub(true)
  }


  const doEdit=(e)=>{
    let m = clone(col_m)
    let j = clone(col_j)

    m.map((item,i)=>{
      item.val = e[item.dataIndex]
    })
    j.map((item,i)=>{
      item.val = JSON.parse(e[item.dataIndex])
    })
    setColM(m)
    setColJ(j)

    setMethod('update')
    setShowForm(true)
  }


  const doAdd =()=>{


    setColM(col_m)
    setColJ(col_j)
    setMethod('insert')
    setShowForm(true)

  }


  const doDel =(e)=>{
    let key = getKeyField(define)
    let params = {
      key,
      table: dataJson.table,
      val: e[key],
    }

    setLoading(true)
    store.deleteRecord(params).then(r=>{
      setLoading(false)
      setRefresh(true)
    })
  }


  useEffect(() => {
    let {define,sub,...table} = dataJson
    let subTable = sub.table
    let ref = sub.ref
    let params = {
      table: dataJson.table,
      subTable: dataJson.sub.table,
      ref: dataJson.sub.ref,
    }
    setLoading(true)
    store.queryTable(params).then(r=>{
      setLoading(false)
      setDs(r)
      setRefresh(false)

      // console.log(r,'rrr')
    })
  }, [refresh,index]);


  console.log(col_m,'col_m')

  return (
  
    <div className={s.index}>
      <Spin spinning={loading}>
        <div className={s.main}>
          <div className={s.fun}>
            <Button type="primary" icon={<PlusCircleOutlined/>} danger onClick={()=>doAdd()}>添加</Button>
          </div>
          <Table dataSource={ds} columns={col} />
        </div>


        {showForm && <FormMain {...{colM, colJ, col_a, method, setShowForm, setRefresh,setLoading, table:dataJson.table}} />}

        {showSub &&
        <div className={s.pop}>
          <div className={s.wrap}>
            <div className={s.del} onClick={()=>setShowSub(false)}></div>
            <Table dataSource={sub} columns={col_s} />
          </div>
        </div>}
      </Spin >
    </div>
  )

}

export default  observer(Ware)