var fs = require('fs')
const {callP} = require("../db/db")
var path = require('path')
var axios = require('axios')
var dayjs = require('dayjs')
var dotenv = require('dotenv')
var express = require('express')
var jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
var router = express.Router()
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const {clone,initName,toJson,INF_TYPE,SECRET_KEY,KEY_IMG} = require('../util/fn')

dotenv.config()


const getUsers = async (res)=>{
  const sql = `CALL PROC_QUERY_USER(?)`
  return await callP(sql, null , res)
}

router.post('/queryByMe', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  const sql = `CALL PROC_QUERY_BY_ME(?)`
  const users = await getUsers(res)
  const data   = await initName(users,toJson(await callP(sql,params,res)))
  res.status(200).json({code: 0, data})
})


router.post('/queryAll', async (req, res, next) =>{
  
  const sql1 = `CALL PROC_QUERY_BOARD(?)`
  const sql2 = `CALL PROC_QUERY_CAT(?)`
  const users = await getUsers(res)

  const cat      = await initName(users,toJson(await callP(sql2, { bt:"cat", li:12, od:"sub_date" }, res)))
  const cat_lose = await initName(users,toJson(await callP(sql1, { bt:"cat", ca:"迷子", li:3, od:"sub_date" }, res)))
  const cat_prot = await initName(users,toJson(await callP(sql1, { bt:"cat", ca:"保護", li:3, od:"sub_date" }, res)))
  const note     = await initName(users,toJson(await callP(sql1, { bt:"note", ca:"NULL", li:3, od:"sub_date" }, res)))
  const qa_s     = await initName(users,toJson(await callP(sql1, { bt:"qa", ca:"解決", li:4, od:"sub_date" }, res)))
  const qa_i     = await initName(users,toJson(await callP(sql1, { bt:"qa", ca:"受付中", li:4, od:"sub_date" }, res)))

  res.status(200).json({code: 0, qa_s, qa_i, note, cat, cat_lose, cat_prot })
})


router.post('/queryCat', async (req, res, next) =>{
  let { type,area,fr,to,count } = req.body

  const params = {
    boardType: 'cat',
    category: INF_TYPE[type],
    areaCondition: area ? ` AND JSON_UNQUOTE(JSON_EXTRACT(addr, '$.addr_ken')) = '${area}'` : '',
    dateCondition: fr && to ? ` AND sub_date > '${fr}' AND sub_date < '${to}'` : '',
    limit: count,
  };

  const sql = `
    SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see, close
    FROM tab_board
    WHERE board_type = '${params.boardType}' AND category = '${params.category}'
    ${params.areaCondition}
    ${params.dateCondition}
    ORDER BY sub_date DESC
    LIMIT ${params.limit}
  `;

  const sql1 = `CALL PROC_QUERY(?)`
  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql1, {sql}, res)))
  res.status(200).json({code: 0, data })
})


router.post('/queryNote', async (req, res, next) =>{
  const {count,key} = req.body
  const keyCondition = key ? ` AND title like '%${key}%'` : ''

  const sql = `
    SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see
    FROM tab_board
    WHERE board_type = 'note' AND category = 'NULL'
    ${keyCondition}
    ORDER BY sub_date DESC
    LIMIT ${count}
  `;

  const sql1 = `CALL PROC_QUERY(?)`
  const sql2 = `CALL PROC_QUERY_BOARD(?)`

  // console.log(sql)
  const users = await getUsers(res)

  const data = await initName(users,toJson(await callP(sql1, {sql}, res)))
  const fav = await initName(users,toJson(await callP(sql2, { bt:"note", ca:"NULL", li:3, od:"favCount" }, res)))
  res.status(200).json({code: 0, data, fav })
})


const formatReply =(list,users)=>{
  return list.map(item=>{
    item.content.rep = item.content.rep.map(o=>{
      o =  JSON.parse(o);
      users.forEach(user => {
        if (o.user_id === user.user_id) {
          o.sub_user = item.sub_user;
        }
      });
      return o;
    });
    return item;
  });
}


const repName =(item,users)=>{
  users.forEach(user => {
    if (item.user_id === user.user_id) {
      item.sub_user = user.user_name;
    }
  });
  return item
}

router.post('/queryQA', async (req, res, next) =>{
  const {count,key} = req.body
  const keyCondition = key ? ` AND title like '%${key}%'` : ''

  const sql = `
    SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see
    FROM tab_board
    WHERE board_type = 'qa'
    ${keyCondition}
    ORDER BY sub_date DESC
    LIMIT ${count}
  `;

  const sql1 = `CALL PROC_QUERY(?)`
  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql1, {sql}, res)))
  

  data.map(item=>{
    let {rep} = item.content;
    rep = rep.map(o=>{
      o = repName(o,users);
      if (o.rep) {
        o.rep = o.rep.map(q=> repName(q,users));
      }
      return o;
    });
    item.content.rep = rep;
    return item;
  });


  res.status(200).json({code: 0, data })
})


router.post('/saveContent', async (req, res, next) =>{
  const params = req.body
  // console.log(params)
  let sql = `CALL PROC_SAVE_CONTENT(?)`

  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))

  res.status(200).json({code: 0,data: data[0], msg:'修改content成功！'})
})


router.post('/closePost', async (req, res, next) =>{
  const params = req.body
  // console.log(params)
  let sql = `CALL PROC_CLOSE_POST(?)`
  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))

  res.status(200).json({code: 0, data:data[0], msg:'帖子关闭成功'})
})


router.post('/closeBoard', async (req, res, next) =>{
  const params = req.body
  // console.log(params)
  let sql = `CALL PROC_CLOSE_BOARD(?)`
  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))

  res.status(200).json({code: 0, data:data[0], msg:'帖子关闭成功'})
})



router.post('/favNote', async (req, res, next) =>{
  let params = req.body
  console.log(params)
  const sql = `CALL PROC_UPDATE_BOARD_FAV(?)`
  const users = await getUsers(res)
  const r = await callP(sql, params, res)
  const data = await initName(users,toJson(r))
  console.log(r)



  res.status(200).json({code: 0,data, msg:'更新成功！' })
})


router.post('/initChatId', async (req, res, next) =>{
  const chat_id = uuidv4()
  const sub_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const params = { chat_id,sub_date,content:[], ...req.body }
  // console.log(params,ret)
  const sql = `CALL PROC_INIT_CHAT_ID(?)`
  const data = await callP(sql, params, res)
  console.log(data)
  // const data = checkAndInsert(params);
  res.status(200).json({code: 0, data: data[0].chat_id });
})


router.post('/queryChat', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  const sql1 = `CALL PROC_QUERY_CHAT_FR(?)`
  const sql2 = `CALL PROC_QUERY_CHAT_TO(?)`
  const chatFr = await callP(sql1, params, res)
  const chatTo = await callP(sql2, params, res)
  chatFr.map(o=> {
    o.fr_icon = JSON.parse(o.fr_icon)
    o.to_icon = JSON.parse(o.to_icon)
    o.content = JSON.parse(o.content)
  })
  chatTo.map(o=> {
    o.fr_icon = JSON.parse(o.fr_icon)
    o.to_icon = JSON.parse(o.to_icon)
    o.content = JSON.parse(o.content)
  })
  console.log(chatTo,chatFr)
  res.status(200).json({code: 0, chat: [chatFr,chatTo]});
})

router.post('/saveChat', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  const sql = `CALL PROC_SAVE_CHAT(?)`
  const chat = await callP(sql, params, res)
  

  res.status(200).json({code: 0, chat});
})


router.post('/saveUserInfo', async (req, res, next) =>{
  const params = req.body
  let sql = `CALL PROC_SAVE_USER(?)`
  let r = await callP(sql, params, res)
  r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data:r[0], msg:'修改信息成功'})
})


router.post('/loadMsg', async (req, res, next) =>{
  const params = req.body
  let sql = `CALL PROC_LOAD_MSG(?)`

  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))

  res.status(200).json({code: 0, data, msg:'获取消息成功'})
})


router.post('/readMsg', async (req, res, next) =>{
  const params = req.body
  let sql = `CALL PROC_READ_MSG(?)`
  // console.log(params)
  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))

  res.status(200).json({code: 0, data, msg:'获取消息成功'})
})




router.post('/saveQa', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_SAVE_QA(?)`
  let r = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, msg:'添加QA成功！'})
})

router.post('/addQuestion', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_ADD_QUESTION(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({code: 0, msg:'添加问题成功！'})
})



router.post('/resetUnread', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_RESET_UNREAD(?)`
  let r = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, msg:'重置UNREAD成功！'})
})


router.post('/saveCat', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_SAVE_CAT(?)`
  let r = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, msg:'发布猫信息成功！'})
})
   

router.post('/queryQuestion', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_QUERY_QUESTION(?)`
  let data = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data, msg:'检索问题信息成功！'})
})



router.post('/saveNote', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_SAVE_NOTE(?)`
  let data = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data, msg:'保存記事成功！'})
})


router.post('/delBoard', async (req, res, next) =>{
  const params = req.body
  // console.log(params)
  let sql = `CALL PROC_DEL_BOARD(?)`
  let data = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, msg:'删除数据成功！'})
})


router.post('/saveCollect', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_SAVE_COLLECT(?)`
  let data = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data, msg:'收藏记事成功！'})
})


router.post('/queryCollect', async (req, res, next) =>{
  const params = req.body
  console.log(params)

  
  let sql = `CALL PROC_QUERY_COLLECT(?)`

  const users = await getUsers(res)
  const data = await initName(users,toJson(await callP(sql, params, res)))
  // let data = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data, msg:'收藏记事成功！'})
})




router.post('/login', async (req, res, next) =>{
  let params = req.body
  // console.log(params)
  let sql1 = `CALL PROC_LOGIN(?)`
  let sql2 = `CALL PROC_QUERY_COLLECT(?)`
  let r = await callP(sql1, params, res)
  if (r.length > 0) {
    let s = await callP(sql2, { user_id:r[0].user_id }, res)
    r[0].icon = JSON.parse(r[0].icon)
    res.status(200).json({code: 0, data: r[0], collect: s})
  } else {
    res.status(200).json({code: 1, msg: '用户不存在或者密码错误！'})
  }
})



router.post('/reg', async (req, res, next) =>{
  const params = req.body
  let sql = `CALL PROC_REG(?)`
  let r = await callP(sql, params, res)
  if (r) {
    res.status(200).json({code: 0, msg:'注册成功！'})
  }else{
    res.status(200).json({code: 1, msg: '该邮箱已经注册'})
  }
})



router.post('/uploadImg', upload.single('file'), async (req, res, next) =>{

  const fileData = fs.readFileSync(req.file.path)
  const headers = {
    'Content-Type':'application/octet-stream'
  };
  const url = `https://api.imageresizer.io/v1/images?key=${KEY_IMG}`

  try {
    const r = await axios.post(url, fileData, { headers });
    // console.log(r.data);
    res.status(200).json({code: 0, data: r.data.response});
  } catch (error) {
    console.error(error);
    res.status(500).json({code: 1, error: error.message});
  }
})






module.exports = router