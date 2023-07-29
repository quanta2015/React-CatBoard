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
    {type === SUB_TYPE.lose_sub && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>迷子になってしまった場所</div>
    }
    {type === SUB_TYPE.prot_sub && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>保護した場所</div>
    }
    <Form.Item 
        label="都道府県" 
        name="prefecture"
        rules={[
        {
            required: true,
            message: `请填写都道府県`,
        },
        ]}>
        <Input placeholder="例）大阪府" />
    </Form.Item>
        
    <Form.Item 
        label="市町村" 
        name="city"
        rules={[
        {
            required: true,
            message: `请填写市町村`,
        },
        ]}>
        <Input placeholder="例）大阪市中央区" />
        <i className={s.sm}>＊丁目・番地・号は入力しないでください</i>
    </Form.Item>

    <Form.Item 
        label="付近" 
        name="vicinity"
        rules={[
        {
            required: true,
            message: `请填写付近`,
        },
        ]}>
        <Input placeholder="例）大阪城公園" />
        <i className={s.sm}>＊公園・学校・駅・お店などの名前を入力してください</i>
    </Form.Item>
    {type === SUB_TYPE.lose_sub && 
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>迷子になってしまった日時</div>
    }
    {type === SUB_TYPE.prot_sub && 
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>保護した日時</div>
    }

    <Form.Item 
        label="日期と時間帯" 
        name="dateTime"
        rules={[
            {
                required: true,
                message: '请选择日期和时间',
            },
        ]}
    >
        <DatePicker showTime format="YYYY/MM/DD HH:mm" />
        <div>＊できるだけ詳しい時間を入力してください</div>
    </Form.Item>

    </>
  )

}

export default observer(FormPostBasic)