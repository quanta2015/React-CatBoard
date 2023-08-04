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


async function checkAndInsert(params) {
  const { board_id, user_fr } = params;

  // const _params = {
  //     TableName: "Nekonara_chat2",
  //     IndexName: "boardid-userfr-index",
  //     KeyConditionExpression: "#bc = :bc_value",
  //     ExpressionAttributeNames: {
  //         "#bc": "board_id#user_fr",
  //     },
  //     ExpressionAttributeValues: {
  //         ":bc_value": { S: `${board_id}#${user_fr}` }
  //     },
  //     ScanIndexForward: false,
  // };

  // try {
  //   const data = await client.send(new QueryCommand(_params));

  //   if (data.Items.length === 0) {
  //     const insertParams = {
  //       TableName: 'Nekonara_chat2',
  //       Item: marshall(params),
  //     };

  //     await client.send(new PutItemCommand(insertParams));
  //     console.log('inserted...');
  //     return params.chat_id
  //   } else {
  //     // Return chat_id since the record already exists
  //     const existingChatId = unmarshall(data.Items[0]).chat_id;
  //     console.log('exists');
  //     return existingChatId
  //   }
  // } catch (err) {
  //   console.error('Error:', err);
  // }
}



const getUsers = async (res)=>{
  const sql = `CALL PROC_QUERY_USER(?)`
  return await callP(sql, null , res)
}

router.post('/queryAll', async (req, res, next) =>{
  
  const sql1 = `CALL PROC_QUERY_BOARD(?)`
  const users = await getUsers(res)

  const cat_lose = await initName(users,toJson(await callP(sql1, { bt:"cat", ca:"迷子", li:3, od:"sub_date" }, res)))
  const cat_prot = await initName(users,toJson(await callP(sql1, { bt:"cat", ca:"保護", li:3, od:"sub_date" }, res)))
  const note     = await initName(users,toJson(await callP(sql1, { bt:"note", ca:"NULL", li:3, od:"sub_date" }, res)))
  const qa_s     = await initName(users,toJson(await callP(sql1, { bt:"qa", ca:"解決", li:4, od:"sub_date" }, res)))
  const qa_i     = await initName(users,toJson(await callP(sql1, { bt:"qa", ca:"受付中", li:4, od:"sub_date" }, res)))

  res.status(200).json({code: 0, qa_s, qa_i, note, cat_lose, cat_prot })
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
    SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see
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

  console.log(sql)

  const data = await toJson(await callP(sql1, {sql}, res))
  const fav = await toJson(await callP(sql2, { bt:"note", ca:"NULL", li:3, od:"favCount" }, res))
  res.status(200).json({code: 0, data, fav })
})



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
  res.status(200).json({code: 0, data })
})


router.post('/favNote', async (req, res, next) =>{
  let params = req.body
  // console.log(params)
  const sql = `CALL PROC_UPDATE_BOARD_FAV(?)`
  const data = await callP(sql, params, res)
  res.status(200).json({code: 0, msg:'更新成功！' })
})


router.post('/initChatId', async (req, res, next) =>{
  const chat_id = uuidv4()
  const sub_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const params = { chat_id,sub_date,content:[], ...req.body }

  // const data = checkAndInsert(params);
  // res.status(200).json({code: 0, data });
})


router.post('/saveUserInfo', async (req, res, next) =>{
  const params = req.body
  let sql = `CALL PROC_SAVE_USER(?)`
  let r = await callP(sql, params, res)
  r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, data:r[0], msg:'修改信息成功'})
})



router.post('/addQa', async (req, res, next) =>{
  const params = req.body
  console.log(params)
  let sql = `CALL PROC_ADD_QA(?)`
  let r = await callP(sql, params, res)
  // r[0].icon = JSON.parse(r[0].icon)
  res.status(200).json({code: 0, msg:'添加QA成功！'})
})



router.post('/login', async (req, res, next) =>{
  let params = req.body
  let sql = `CALL PROC_LOGIN(?)`
  let r = await callP(sql, params, res)

  if (r.length > 0) {
    r[0].icon = JSON.parse(r[0].icon)
    res.status(200).json({code: 0, data: r[0]})
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