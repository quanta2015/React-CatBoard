var fs = require('fs')
var path = require('path')
var axios = require('axios')
var dayjs = require('dayjs')
var dotenv = require('dotenv')
var express = require('express')
var jwt = require('jsonwebtoken')
// var formidable = require('formidable')
var router = express.Router()
// var db = require("../db/db")
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // 设置上传文件的存储路径

const { DynamoDBClient,DynamoDB, QueryCommand,ScanCommand } = require("@aws-sdk/client-dynamodb")
const { unmarshall} = require("@aws-sdk/util-dynamodb");

dotenv.config()

var root = path.resolve(__dirname,'../')


const KEY_IMG = '59ec42222c1208e4fbd4eb1ba5f4526da77a3fc4'
const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);


const ums = (list)=> list.Items.map(item => unmarshall(item))


// const queryBoard =async(board_type,category,Limit=10)=>{
//   const params = {
//     TableName: "Nekonara_board2",
//     IndexName: "type-category-index",
//     KeyConditionExpression: "board_type = :board_type_value AND category = :category_value",
//     ExpressionAttributeValues: {
//       ":board_type_value": { S: board_type },
//       ":category_value": { S: category }
//     },
//     ScanIndexForward: false,
//     Limit,
//   };

//   try {
//     const ret = await client.send(new QueryCommand(params));
//     return ums(ret)
//   } catch (err) {
//     console.error(err);
//     return null
//   }
// }


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

const { UpdateCommand } = require("@aws-sdk/client-dynamodb");


router.post('/queryCat', async (req, res, next) =>{
  const cat_lose = await queryBoard("cat","迷子")
  const cat_find = await queryBoard("cat","目撃")
  const cat_prot = await queryBoard("cat","保護")
  const note  = await queryBoard("note","NULL")
  const qa_s  = await queryBoard("qa","解決",4)
  const qa_i  = await queryBoard("qa","受付中",4)

  res.status(200).json({code: 200, qa_s, qa_i, note, cat_lose, cat_find, cat_prot  })
})

router.post('/uploadImg', upload.single('file'), async (req, res, next) =>{

  const fileData = fs.readFileSync(req.file.path)
  const headers = {
    'Content-Type':'application/octet-stream'
  };
  const url = `https://api.imageresizer.io/v1/images?key=${KEY_IMG}`

router.post('/updateCatImage', async (req, res, next) => {
  const { tableName, key, updatedValues } = req.body;
  const updateResult = await updateItem(tableName, key, updatedValues);
  if (updateResult) {
    res.status(200).json({ code: 200, message: "Successfully updated item" });
  } else {
    res.status(500).json({ code: 500, message: "Error updating item" });
  }
});

  try {
    const r = await axios.post(url, fileData, { headers });
    console.log(r.data);
    res.status(200).json({code: 200, data: r.data.response});
  } catch (error) {
    console.error(error);
    res.status(500).json({code: 500, error: error.message});
  }
})



module.exports = router