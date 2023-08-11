import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input,DatePicker} from 'antd';
import FormCat from '@/component/FormCat'
import Upload from '@/component/Upload'
import {SUB_TYPE} from '@/constant/data'

import s from './index.module.less';


const { TextArea } = Input

const FormPostBasic = ({type}) => {

  return (
    <>
    {type === SUB_TYPE.TYPE1 && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>迷子になってしまった場所</div>
    }
    {type === SUB_TYPE.TYPE2 && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>保護した場所</div>
    }
    <Form.Item 
        label="都道府県" 
        name="addr_ken"
        rules={[
        {
            required: true,
            message: `都道府県を入力してください。`,
        },
        ]}>
        <Input placeholder="例）大阪府" style={{height: '50px'}} />
    </Form.Item>
        
    <Form.Item 
        label="市町村" 
        name="addr_shi"
        rules={[   
        {
            required: true,
            message: `市町村を入力してください。`,
        },
        ]}>
        <Input placeholder="例）大阪市中央区" style={{height: '50px'}}/>
    </Form.Item>
    <i className={s.sm}>＊丁目・番地・号は入力しないでください</i>

    <Form.Item 
        label="付近" 
        name="addr_dtl"
        rules={[
        {
            required: true,
            message: `付近を入力してください。`,
        },
        ]}>
        <Input placeholder="例）大阪城公園" style={{height: '50px'}}/>
    </Form.Item>
    <i className={s.sm}>＊公園・学校・駅・お店などの名前を入力してください</i>
    {type === SUB_TYPE.TYPE1 && 
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>迷子になってしまった日時</div>
    }
    {type === SUB_TYPE.TYPE2 && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>保護した日時</div>
    }

    <Form.Item 
        label="年月日と時間帯" 
        name={['cat', 'lose_time']}
        rules={[
            {
                required: true,
                message: '年月日と時間帯を選択してください',
            },
        ]}
    >
        <DatePicker showTime format="YYYY/MM/DD HH:mm" />
    </Form.Item>
    <div>＊できるだけ詳しい時間を入力してください</div>

    </>
  )

}

export default observer(FormPostBasic)