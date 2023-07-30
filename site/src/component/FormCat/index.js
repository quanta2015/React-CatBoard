import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { observer,MobXProviderContext } from 'mobx-react'
import cls from 'classnames';
import { Button, Form, Input, Radio, Select,Checkbox} from 'antd';

import s from './index.module.less';


const { TextArea } = Input
const { Option } = Select;

const sexList = ["男の子", "男の子（去勢済）", "女の子", "女の子（避妊済）"]
const ageList = ["子猫", "成猫", "老猫"]
const sizeList = ["小型猫", "中型猫", "大型猫"]


const FormCat = ({}) => {
  

  return (
    <>
      <Form.Item 
        label="名前" 
        name={['cat', 'name']}
        rules={[{ required: true, message: `猫ちゃんの名前を記入してください` }]}>
        <Input placeholder="例）みー" style={{height: '50px'}} />
      </Form.Item>
           
      <Form.Item 
        label="毛色・柄" 
        name={['cat', 'color']}
        rules={[{ required: true, message: `猫ちゃんの毛色・柄を記入してください` }]}>
        <Input placeholder="（例）薄い茶色で縞模様" style={{height: '50px'}} />
      </Form.Item>
            
      <Form.Item 
        label="猫種" 
        name={['cat', 'type']}
        rules={[{ required: true, message: `猫種を記入してください` }]}>
        <Input placeholder="（例：キジトラ、ベンガル）" style={{height: '50px'}} />
      </Form.Item>
            
      <Form.Item 
        label="首輪の有無" 
        name={['cat', 'collar']} 
        rules={[{ required: true, message: `首輪の有無を選択してください` }]}>
        <Radio.Group options={['有', '無']} style={{height: '50px'}} />
      </Form.Item>
            
      <Form.Item 
        label="首輪の色・柄" 
        name={['cat', 'necklace']}
        rules={[{ required: true, message: `首輪の色・柄を記入してください` }]}>
        <Input placeholder="例）赤の花柄の首輪" style={{height: '50px'}} />
      </Form.Item>
      <i className={s.sm}>＊首輪をつけている場合は色・柄などを入力してください</i>
           
      <Form.Item 
        label="性別" 
        name={['cat', 'sex']}
        rules={[{ required: true, message: `性別を選択してください` }]}>
        <Radio.Group value='inline'>
          {sexList.map((v, i) => <Radio value={v} key={i}>{v}</Radio>)}
        </Radio.Group>
      </Form.Item>
          
      <Form.Item 
        label="年齢" 
        name={['cat', 'age']}
        rules={[{ required: true, message: `年齢を選択してください` }]}>
        <Radio.Group value='inline'>
          {ageList.map((v, i) => <Radio value={v} key={i}>{v}</Radio>)}
        </Radio.Group>
      </Form.Item>
    
      <Form.Item 
        label="大きさ" 
        name={['cat', 'size']} 
        rules={[{ required: true, message: `大きさを選択してください` }]}>
        <Radio.Group value='inline'>
          {sizeList.map((v, i) => (
            <Radio value={v} key={i}>{v}</Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item 
        label="その他特徴" 
        name={['cat', 'attr']}
        rules={[ {required: false}, ]}>
        <TextArea placeholder="例）目は青いです。尻尾がかぎしっぽです。サクラ耳です。右足に小さい傷跡があります。人見知りで怖がりなので触りに行こうとすると逃げてしまうと思いますが、名前を呼んだら反応してくれると思います。" 
          allowClear 
          style={{height: '150px'}}
          maxLength={150} />
      <div className={s.sm}>目の色・耳の形（サクラ耳など）・体型・尻尾の形（かぎしっぽなど）・性格・アレルギー・持病など出来るだけ詳しく<strong>150</strong>文字以内で入力してください</div>
      </Form.Item>
    </>
  )

}

export default observer(FormCat)