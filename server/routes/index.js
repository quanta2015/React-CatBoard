var fs = require('fs')
var path = require('path')
var axios = require('axios')
var dayjs = require('dayjs')
var dotenv = require('dotenv')
var express = require('express')
var jwt = require('jsonwebtoken')
var formidable = require('formidable')
var router = express.Router()
var db = require("../db/db")

dotenv.config()

var root = path.resolve(__dirname,'../')
var clone =(e)=> {
  return JSON.parse(JSON.stringify(e))
}

const callSQLProc = (sql, params, res) => {
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

const callP = async (sql, params, res) => {
  return  await callSQLProc(sql, params, res)
}

const jsonToObj = (list)=>{
  let ret = []

  list.map(o=>{
    o.data = JSON.parse(o.data_json);
    o.app = JSON.parse(o.app_json);
    o.attr = JSON.parse(o.attr_json)
    o.asset = JSON.parse(o.asset_json)
    let {data_json, app_json, attr_json,asset_json, ...n} = o
    ret.push(n)
  })
  return ret
}


router.post('/queryParts', async (req, res, next) =>{
  let params = req.body
  let sql = `CALL PROC_QUERY_PARTS(?)`
  let r = await callP(sql, params, res)
  let ret = jsonToObj(r)
  res.status(200).json({code: 0, data: ret })
})


const convert =(input)=>{
  var elements = input.split(', ');
  var result = elements.map((element,i)=> {
      var obj = {};
      var pairs = element.split('#');
      pairs.forEach(function(pair) {
          var keyValue = pair.split(': ');
          obj[keyValue[0]] = keyValue[1];
      });
      obj.key = i+1
      return obj;
  });
  return result
}

router.post('/queryTable', async (req, res, next) =>{
  let params = req.body

  let sql = `CALL PROC_QUERY_TABLE(?)`
  let r = await callP(sql, params, res)
  r.map(o=>o.sub = (o.sub)?convert(o.sub):[])

  res.status(200).json({code: 0, data: r })
})


router.post('/saveTable', async (req, res, next) =>{
  let {table, def} = req.body

  let fields = def.map(item => item.dataIndex).join(', ');
  let values = def.map(item => `'${item.val}'`).join(', '); 
  let sql = `INSERT INTO ${table} (${fields}) VALUES (${values});`;
  let r = await callP(sql, null, res)

  res.status(200).json({code: 0 })
})


router.post('/deleteRecord', async (req, res, next) =>{
  let {table, key, val} = req.body
  let sql = `delete from ${table} where ${key}='${val}'`
  // console.log(sql);
  let r = await callP(sql, null, res)

  res.status(200).json({code: 0 })
})




module.exports = router