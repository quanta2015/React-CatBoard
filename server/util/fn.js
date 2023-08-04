module.exports.SECRET_KEY = 'NEKONARA-SYSTEM'
module.exports.KEY_IMG = '59ec42222c1208e4fbd4eb1ba5f4526da77a3fc4'


module.exports.INF_TYPE = {
  lose: '迷子',
  find: '目撃',
  prot: '保護',
  note: '記事',
}





module.exports.clone=(obj)=> {
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
      let value = obj[key];
      copy[key] = (typeof value === 'object' && value !== null) ? clone(value) : value;
  }
  return copy;
} 



module.exports.initName =  async (userList, items) => {
  items.forEach(item => {
    userList.forEach(user => {
      if (item.sub_user === user.user_id) {
        item.sub_user_id = item.sub_user;
        item.sub_user = user.user_name;
        item.sub_icon = user.icon[0];
      }
    });
  });
  return items;
};



module.exports.toJson = (list) => {
  return list.map(o => {
    o.addr = JSON.parse(o.addr);
    o.cat = JSON.parse(o.cat);
    o.fav = JSON.parse(o.fav);
    o.content = JSON.parse(o.content);
    return o; 
  });
};



