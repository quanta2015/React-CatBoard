var fs = require('fs')
var path = require('path')
var axios = require('axios')
var dayjs = require('dayjs')
var dotenv = require('dotenv')
var express = require('express')
var jwt = require('jsonwebtoken')
// const { v4: uuidv4 } = require('uuid');
var router = express.Router()
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // 设置上传文件的存储路径

const { DynamoDBClient,DynamoDB,UpdateItemCommand, QueryCommand,PutItemCommand,ScanCommand } = require("@aws-sdk/client-dynamodb")
const { marshall, unmarshall} = require("@aws-sdk/util-dynamodb");

dotenv.config()

var root = path.resolve(__dirname,'../')


const KEY_IMG = '59ec42222c1208e4fbd4eb1ba5f4526da77a3fc4'
const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);


const ums = (list)=> list.map(item => unmarshall(item))



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
    return ret.Items.map(item => unmarshall(item))
  } catch (err) {
    console.error(err);
    return null
  }
}

router.post('/queryCat', async (req, res, next) =>{

  const cat_lose = await queryBoard("cat","迷子")
  const cat_prot = await queryBoard("cat","保護")
  const note  = await queryBoard("note","NULL")
  const qa_s  = await queryBoard("qa","解決",4)
  const qa_i  = await queryBoard("qa","受付中",4)

  res.status(200).json({code: 0, qa_s, qa_i, note, cat_lose, cat_prot  })
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

router.post('/login', async (req, res, next) =>{
  let { mail,pwd } = req.body
  // console.log(req.body);
  const params = {
      TableName: 'Nekonara_usr',
      FilterExpression: 'mail = :m and pwd = :p',
      ExpressionAttributeValues: {
          ':m': { S: mail },
          ':p': { S: pwd }
      },
  };
  const command = new ScanCommand(params);

  try {
    const r = await client.send(command);
    if (r.Items && r.Items.length > 0) {
      const data = (ums(r.Items))[0]
      res.status(200).json({code: 0, data});
    }else{
      res.status(200).json({code: 1, msg: '用户不存在或者密码错误！'});
    }
  } catch (err) {
      console.error(err);
  }
})


router.post('/reg', async (req, res, next) =>{
  const item = req.body
  const params = {
    TableName: "Nekonara_usr",
    Item: marshall(item)
  };
  const command = new PutItemCommand(params);

  try {
    const r = await client.send(command);
    res.status(200).json({code: 0, msg:'注册成功！'});
  } catch (err) {
    console.error(err);
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