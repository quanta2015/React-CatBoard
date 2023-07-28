import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input,DatePicker} from 'antd';
import FormCat from '@/component/FormCat'
import Upload from '@/component/Upload'

import s from './index.module.less';


const { TextArea } = Input

const FormPost = ({type,file,form}) => {

  return (
    <>
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
    </Form.Item>
    <FormCat />
    <Form.Item 
        label="迷子になってしまった時の状況" 
        name={['cat', 'attr']}
        rules={[ {required: false}, ]}>
        <TextArea placeholder="例）窓を開けっぱなしにしてしまっていて、脱走してしまいました。。" 
        allowClear style={{height: '150px'}} />
      </Form.Item>
      <i className={s.sm}><strong>150</strong>文字以内で入力してください</i>
      <Form.Item 
        label="猫ちゃんの写真をアップロード" 
        name="icon"
        // valuePropName="icon"
        rules={[{ required: true, message: `必ず１枚は写真をアップロードしてください` } ]}>
        <Upload file = {file} form={form}  />
        <i className={s.sm}>（サイズは6ＭＢまで。利用可能な拡張子：png gif jpg）画像があるほうが多くの方が見てくれます。</i>
        <i className={s.sm}>＊必ず１枚は写真をアップロードしてください。</i>
        <i className={s.sm}>＊人の顔・家の外観などが写っていない写真を選んでください。</i>
        <i className={s.sm}>＊１枚目には体全体が写っている写真を選んでください。</i>
        <i className={s.sm}>＊出来るだけ画質の良い写真を選んでください。</i>
        <i className={s.sm}>＊色んな角度から撮った写真をアップロードしてください。</i>
        <i className={s.sm}>＊迷子になってしまった猫ちゃんの写真のみアップロードしてください。</i>
      </Form.Item>
    </>
  )

}

export default observer(FormPost)