// export const clone=(obj)=> {
//     let copy = Array.isArray(obj) ? [] : {};
//     for (let key in obj) {
//         let value = obj[key];
//         copy[key] = (typeof value === 'object' && value !== null) ? clone(value) : value;
//     }
//     return copy;
// }

import dayjs from 'dayjs'
import * as urls from '@/constant/urls'
import { Modal} from 'antd';
import {ExclamationCircleFilled} from '@ant-design/icons'

const { confirm } = Modal;


export const clone=(o)=>  JSON.parse(JSON.stringify(o))




export const cfm =(msg,event,params=null)=>{

  confirm({
    title: msg,
    icon: <ExclamationCircleFilled />,
    okType: 'danger',
    okText: 'はい',
    cancelText: 'いいえ',
    onOk() {
      event(params)
    },
  });
}


export const publishMsg =(msg,client)=> {
  client.publish(urls.TOPIC, msg, (err) => {
    if (err) {
      console.error('PUB MSG ERROR:', err);
    }else{
      // console.log('PUB MSG SUCC:', msg);
    }
  });
}


export const noProp =(obj) => (Object.keys(obj).length === 0)


export const encodeImg2 = (list)=>{
  return list.map(code=> `${urls.PRE_IMG}${code}` )
}


export const encodeImg = (code)=>{
  return [`${urls.PRE_IMG}${code}`]
}


export const extractImg = (url)=>{
  
  return url.replace(urls.PRE_IMG,'')

  
}




export const now=()=> dayjs().format('YYYY-MM-DD HH:mm:ss')

export const isN=(e)=>{
  return  ((e===null)||(e==='')||(e===undefined))?true:false
}

export const isMobile =(width)=>{ 
  return document.querySelector('html').clientWidth<width
}


export const scrollToTop = (method)=>{
  window.scrollTo({ top: 0, behavior:method });
}

export const scrollToBottom =(direction)=> {
  setTimeout(() =>{
    const el = document.getElementById("chatContent")
    if(el) {
      el.scrollTop = el.scrollHeight;
    }
  }, 100)
}


export const filterData =(data,type)=>{
  let condSet, ret =[]
  switch(type) {
    case 'sign':
      condSet = new Set(['json', 'auto_user', 'auto_date'])
      ret = data.filter(item => true ^  condSet.has(item.type))
      break;
    case 'json':
      condSet = new Set(['json'])
      ret = data.filter(item => false ^  condSet.has(item.type))
      break;
    case 'auto':
      ret = data.filter(item => item.type.startsWith('auto_'))
      break;
  }
  return ret 
}


export const getKeyField =(e)=>{
  let list =  e.filter(item=> item.key )
  return list[0].dataIndex
}


export const fixBody =(condition)=>{
  let bodyCls = document.querySelector('body').classList


  condition?bodyCls.add('fixed'):bodyCls.remove('fixed')
}

function getDateTimeStamp(dateStr) {
  return new Date(dateStr).getTime();
}

export const formatTime=(dateStr)=> {
  var publishTime
  if (dateStr && dateStr.toString().length <= 10) {
    publishTime = dateStr
  } else if (dateStr && dateStr.toString().length > 10){
    publishTime = getDateTimeStamp(dateStr) / 1000
  }
  
    var d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,
    date = new Date(publishTime * 1000),
    Y = date.getFullYear().toString().slice(2),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  d = timeNow - publishTime;
  
  if (H < 10) {
    H = "0" + H;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  d_days = parseInt(d / 86400)
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);
  if (d_days > 0 && d_days < 3) {
    if(d_days == 1){
        return "昨天";
    }else if(d_days == 2){
        return "前天";
    }
  } else if (d_days <= 0 && d_hours > 0) {
    // return d_hours + "小时前";
    if (new Date().getHours() !==  d_hours && new Date().getHours() < d_hours) {
      return '昨天'
    } 
    return  H + ':' + m
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + "分钟前";
  } else if (d_seconds < 60) {
      return '刚刚'
  } else if (d_days >= 3 && d_days < 30) {
    return Y + "/" + M + "/" + D ;
  } else if (d_days >= 30) {
    return Y + "/" + M + "/" + D;
  }
}