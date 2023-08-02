var fs = require('fs')
var db = require("../db/db")
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


const SECRET_KEY = 'NEKONARA-SYSTEM'

const { DynamoDBClient,DynamoDB,UpdateItemCommand,SendCommand, GetItemCommand, QueryCommand,PutItemCommand,ScanCommand } = require("@aws-sdk/client-dynamodb")
const { marshall, unmarshall} = require("@aws-sdk/util-dynamodb");

const clone=(obj)=> {
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
      let value = obj[key];
      copy[key] = (typeof value === 'object' && value !== null) ? clone(value) : value;
  }
  return copy;
} 



var callSQLProc = (sql, params, res) => {
  return new Promise (resolve => {
    db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
      if (err) {
        res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
      }else{
        resolve(ret)
      }
    })
  })
}

var callP = async (sql, params, res) => {
  return  await callSQLProc(sql, params, res)
}

dotenv.config()


const KEY_IMG = '59ec42222c1208e4fbd4eb1ba5f4526da77a3fc4'
const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);


const ums = (list)=> list.map(item => unmarshall(item))

const INF_TYPE = {
  lose: '迷子',
  find: '目撃',
  prot: '保護',
  note: '記事',
}




const queryBoard =async(board_type,category,Limit=9)=>{
  const params = {
      TableName: "Nekonara_board2",
      IndexName: "type-category-date-index",
      KeyConditionExpression: "#bc = :bc_value",
      ExpressionAttributeNames: {
          "#bc": "board_type#category",
      },
      ExpressionAttributeValues: {
          ":bc_value": { S: `${board_type}#${category}` }
      },
      ScanIndexForward: false,
      Limit,
  };

  try {
    const ret = await client.send(new QueryCommand(params));
    const data = ret.Items.map(item => unmarshall(item))
    return await replaceUserName(data)
  } catch (err) {
    console.error(err);
    return null
  }
}

const queryCat = async (board_type, category, area, fr, to, Limit=9) => {
  const params = {
    TableName: "Nekonara_board2",
    IndexName: "type-category-date-index",
    KeyConditionExpression: "#bc = :bc_value",
    ExpressionAttributeNames: {
      "#bc": "board_type#category",
    },
    ExpressionAttributeValues: {
      ":bc_value": { S: `${board_type}#${category}` },
    },
    ScanIndexForward: false,
    Limit,
  };

  if (fr && to) {
    params.KeyConditionExpression += " AND #sub_date BETWEEN :fr AND :to"
    params.ExpressionAttributeNames["#sub_date"] = "sub_date";
    params.ExpressionAttributeValues[":fr"] = { S: fr };
    params.ExpressionAttributeValues[":to"] = { S: to };
  }

  if (area) {
    params.FilterExpression = "#addr.addr_ken = :addr_ken",
    params.ExpressionAttributeNames["#addr"] = "addr";
    params.ExpressionAttributeValues[":addr_ken"] = { S: area }
  }

  try {
    const ret = await client.send(new QueryCommand(params));
    // return ret.Items.map(item => unmarshall(item))
    const data = ret.Items.map(item => unmarshall(item))
    return await replaceUserName(data)
  } catch (err) {
    console.error(err);
    return null
  }
}


const queryFav =async(board_type,category,Limit=3)=>{
  const params = {
      TableName: "Nekonara_board2",
      IndexName: "type-category-fav-index",
      KeyConditionExpression: "#bc = :bc_value",
      ExpressionAttributeNames: {
          "#bc": "board_type#category",
      },
      ExpressionAttributeValues: {
          ":bc_value": { S: `${board_type}#${category}` }
      },
      ScanIndexForward: false,
      Limit,
  };

  try {
    const ret = await client.send(new QueryCommand(params));
    return ret.Items.map(item => unmarshall(item))
  } catch (err) {
    console.error(err);
    return null
  }
}


async function checkAndInsert(params) {
  const { board_id, user_fr } = params;

  const _params = {
      TableName: "Nekonara_chat2",
      IndexName: "boardid-userfr-index",
      KeyConditionExpression: "#bc = :bc_value",
      ExpressionAttributeNames: {
          "#bc": "board_id#user_fr",
      },
      ExpressionAttributeValues: {
          ":bc_value": { S: `${board_id}#${user_fr}` }
      },
      ScanIndexForward: false,
  };

  try {
    const data = await client.send(new QueryCommand(_params));

    if (data.Items.length === 0) {
      const insertParams = {
        TableName: 'Nekonara_chat2',
        Item: marshall(params),
      };

      await client.send(new PutItemCommand(insertParams));
      console.log('inserted...');
      return params.chat_id
    } else {
      // Return chat_id since the record already exists
      const existingChatId = unmarshall(data.Items[0]).chat_id;
      console.log('exists');
      return existingChatId
    }
  } catch (err) {
    console.error('Error:', err);
  }
}


const toJson = (list) => {
  return list.map(o => {
    o.addr = JSON.parse(o.addr);
    o.cat = JSON.parse(o.cat);
    o.fav = JSON.parse(o.fav);
    return o; // return the modified object
  });
};


const initName = async (userList, items) => {
  items.forEach(item => {
    console.log('处理项目:', item);

    userList.forEach(user => {
      console.log('处理用户:', user);

      if (item.sub_user === user.user_id) {
        item.sub_user_id = item.sub_user;
        item.sub_user = user.user_name;
        item.sub_icon = user.icon[0];
        console.log('找到匹配。已更新项目:', item);
      }
    });
  });

  console.log('处理后的项目:', items);
  return items;
};

router.post('/queryAll', async (req, res, next) =>{
  
  const sql1 = `CALL PROC_QUERY_BOARD(?)`
  const sql2 = `CALL PROC_QUERY_USER(?)`
  const userList = await callP(sql2, null , res)


  
  

  // console.log(userList)
  const cat_lose = await initName(userList,toJson(await callP(sql1, { bt:"cat", ca:"迷子", li:3 }, res)))
  const cat_prot = await initName(userList,toJson(await callP(sql1, { bt:"cat", ca:"保護", li:3 }, res)))
  const note     = await initName(userList,toJson(await callP(sql1, { bt:"note", ca:"NULL", li:3 }, res)))
  const qa_s     = await initName(userList,toJson(await callP(sql1, { bt:"qa", ca:"解決", li:4 }, res)))
  const qa_i     = await initName(userList,toJson(await callP(sql1, { bt:"qa", ca:"受付中", li:4 }, res)))




  res.status(200).json({code: 0, qa_s, qa_i, note, cat_lose, cat_prot })
})


router.post('/queryCat', async (req, res, next) =>{
  let { type,count,area,fr,to } = req.body
  console.log(area,fr,to,'params')
  const data = await queryCat("cat",INF_TYPE[type],area,fr,to,count)
  res.status(200).json({code: 0, data })
})

router.post('/queryNote', async (req, res, next) =>{
  const {count} = req.body
  const fav = await queryFav("note","NULL")
  const data  = await queryBoard("note","NULL",count)
  res.status(200).json({code: 0, data, fav })
})


router.post('/favNote', async (req, res, next) =>{
  let {sub_date,board_id,fav,favCount} = req.body
  fav = fav.map(o=> ({"S":o}))
  // console.log(fav)

  const params = {
    TableName: "Nekonara_board2",
    Key: {
        'board_id': { "S": board_id },
        'sub_date': { "S": sub_date }, 
    },
    UpdateExpression: "SET fav = :f, favCount = :fc",
    ExpressionAttributeValues: { 
      ":f": { 'L': fav},
      ":fc": { 'N': favCount.toString() } ,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    const command = new UpdateItemCommand(params);
    await client.send(command);
    res.status(200).json({code: 0, msg:'更新成功！' })
  } catch (err) {
      console.error(err);
  }
})


router.post('/saveUserInfo', async (req, res, next) =>{
  let { name, user_name, mail, pwd, icon, user_id } = req.body
  console.log(req.body,'params');
  const params = {
    TableName: 'Nekonara_usr',
    Key: {
      "user_id": { S: user_id }
    },
    ExpressionAttributeNames: {
      "#n": "name",
      "#u": "user_name",
      "#m": "mail",
      "#p": "pwd",
      "#i": "icon"
    },
    ExpressionAttributeValues: {
      ":n": { S: name },
      ":u": { S: user_name },
      ":m": { S: mail },
      ":p": { S: pwd },
      ":i": { L: icon.map(url => ({ "S": url })) }
    },
    UpdateExpression: "SET #n = :n, #u = :u, #m = :m, #p = :p, #i = :i",
    ReturnValues: "UPDATED_NEW"
  };
 
  try {
    const data = await client.send(new UpdateItemCommand(params));
    res.status(200).json({code: 0, msg:'更新数据成功'});
  } catch (err) {
    console.error("Error updating item:", err);
  }
})


router.post('/initChatId', async (req, res, next) =>{
  const chat_id = uuidv4()
  const sub_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const params = { chat_id,sub_date,content:[], ...req.body }

  const data = checkAndInsert(params);
  res.status(200).json({code: 0, data });
})




router.post('/login', async (req, res, next) =>{
  let params = req.body
  let sql = `CALL PROC_LOGIN(?)`
  let r = await callP(sql, params, res)

  if (r.length > 0) {
    let ret = clone(r[0])
    res.status(200).json({code: 0, data: ret})
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