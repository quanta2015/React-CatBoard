export const clone=(obj)=> {
    let copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        let value = obj[key];
        copy[key] = (typeof value === 'object' && value !== null) ? clone(value) : value;
    }
    return copy;
}



export const isN=(e)=>{
  return  ((e===null)||(e==='')||(e===undefined))?true:false
}

export const isMobile =(width)=>{ 
  return document.querySelector('html').clientWidth<width
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