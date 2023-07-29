import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input,Checkbox} from 'antd';
import FormCat from '@/component/FormCat'
import Upload from '@/component/Upload'

import s from './index.module.less';


const { TextArea } = Input

const FormPostOther = ({type,file,form}) => {

  return (
    <>
    
    <Form.Item 
        label={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>{type === '迷子投稿' ? '迷子になってしまった時の状況' : '保護した時の状況'}</span>}
        name={['cat', 'attr']}
        rules={[ {required: false}, ]}>
        <TextArea placeholder="例）窓を開けっぱなしにしてしまっていて、脱走してしまいました。。" 
        allowClear style={{height: '150px'}} />
        <div><strong>150</strong>文字以内で入力してください</div>
      </Form.Item>

      <Form.Item 
        label={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>{'猫ちゃんの写真をアップロード'}</span>}
        name="icon"
        // valuePropName="icon"
        rules={[{ required: true, message: `必ず１枚は写真をアップロードしてください` } ]}>
        <Upload file = {file} form={form}  />
        <div>（サイズは6ＭＢまで。利用可能な拡張子：png gif jpg）画像があるほうが多くの方が見てくれます。</div>
        <div>＊必ず１枚は写真をアップロードしてください。</div>
        <div>＊人の顔・家の外観などが写っていない写真を選んでください。</div>
        <div>＊１枚目には体全体が写っている写真を選んでください。</div>
        <div>＊出来るだけ画質の良い写真を選んでください。</div>
        <div>＊色んな角度から撮った写真をアップロードしてください。</div>
        <div>＊迷子になってしまった猫ちゃんの写真のみアップロードしてください。</div>
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Checkbox>記入漏れはない</Checkbox>
            <Checkbox>記入した情報に誤りはない</Checkbox>
            <Checkbox>出来るだけ詳細に記入した</Checkbox>
        </div>
    </Form.Item>
    </>
  )

}

export default observer(FormPostOther)