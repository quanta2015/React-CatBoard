import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import s from './index.module.less';

const { TextArea } = Input


const sexList = ["オス", "メス", "不明"]
const ageList = ["子猫", "成猫", "老猫"]
const sizeList = ["大型猫", "中型猫", "小型猫"]
const info = {
  lose: '迷子',
  find: '目撃',
  prot: '保護',
  note: '記事',
}
const _info = Object.entries(info).map(([key, val]) => ({key, val}))


const FormCat = ({}) => {

  const [form] = Form.useForm();


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }])

  const handlePreview = async (file) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    // setPreviewImage(file.url || file.preview);
    // setPreviewOpen(true);
    // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );



  return (
    <div className={s.formCat} >
      <div className={s.menu}>
      
        {_info.map((item,i)=> 
          <span key={i} style={{background: `var(--clr-${item.key})`}}>{item.val}</span>
         )}
      </div>
      <Form form={form} layout='vertical' className={s.form}>
        <div className={s.sect}>
          <div className={s.row}>
            <h1><span>概要</span></h1>
          </div>

          <div className={s.row}>
              <Form.Item 
                label="迷子になった年月日時" 
                name="dt"
                rules={[
                  {
                    required: true,
                    message: `请填写迷子になった年月日時`,
                  },
                ]}>
                <DatePicker showTime />
              </Form.Item>
            
          </div>

          <div className={s.row}>
            <Form.Item 
              label="キャッチタイトル" 
              name="title"
              rules={[
                {
                  required: true,
                  message: `请填写キャッチタイトル`,
                },
              ]}>
              <Input placeholder="例）人なれしたキジシロです" />
            </Form.Item>
          </div>

        </div>

        <div className={s.sect}>
          <div className={s.row}>
            <h1><span>猫の情報</span></h1>
          </div>

          <div className={s.row}>
            <div className={s.col}>
              <Form.Item 
                label="猫の名前" 
                name="name"
                rules={[
                  {
                    required: true,
                    message: `请填写猫の名前`,
                  },
                ]}>
                <Input placeholder="例）みー" />
              </Form.Item>
            </div>

            <div className={s.col}>
              <Form.Item 
                label="猫の種類" 
                name="type"
                rules={[
                  {
                    required: true,
                    message: `请填写猫の種類`,
                  },
                ]}>
                <Input placeholder="（例：キジトラ、ベンガル）" />
              </Form.Item>
            </div>

            <div className={s.col}>
              <Form.Item 
                label="猫の毛色" 
                name="color"
                rules={[
                  {
                    required: true,
                    message: `请填写毛色`,
                  },
                ]}>
                <Input placeholder="例）2" />
              </Form.Item>
            </div>
          </div>

          <div className={s.row}>
            <div className={s.col}>
              <Form.Item 
                label="猫の性別" 
                name="sex"
                rules={[
                  {
                    required: true,
                    message: `请填写キャッチタイトル`,
                  },
                ]}>
                <Radio.Group value='inline'>
                  {sexList.map((v, i) => (
                    <Radio.Button value={v} key={i}>{v}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>

            <div className={s.col}>
              <Form.Item 
                label="猫の年齢" 
                name="age"
                rules={[
                  {
                    required: true,
                    message: `请填写年齢`,
                  },
                ]}>
                <Radio.Group value='inline'>
                  {ageList.map((v, i) => (
                    <Radio.Button value={v} key={i}>{v}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>

            <div className={s.col}>
              <Form.Item 
                label="猫の大きさ" 
                name="size"
                rules={[
                  {
                    required: true,
                    message: `请填写大きさ`,
                  },
                ]}>
                <Radio.Group value='inline'>
                  {sizeList.map((v, i) => (
                    <Radio.Button value={v} key={i}>{v}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
          </div>


          <div className={s.row}>
            <Form.Item 
              label="猫の特徴（ポスターに表示されるのは140字までです。）" 
              name="attr"
              rules={[
                {
                  required: true,
                  message: `请填写特徴`,
                },
              ]}>
              <TextArea placeholder="猫の特徴" allowClear style={{height: '100px'}} />
            </Form.Item>
          </div>

        </div>


        <div className={s.sect}>
          <div className={s.row}>
            <Form.Item 
              label="猫の画像" 
              name="attr"
              rules={[
                {
                  required: true,
                  message: `请填写特徴`,
                },
              ]}>
              <i className={s.sm}>（サイズは6ＭＢまで。利用可能な拡張子：png gif jpg）画像があるほうが多くの方が見てくれます。</i>
              <i className={s.sm}>個人情報（電話番号・メールアドレス・人の顔・外観など）が分かる画像は選ばないで下さい。イメージ写真は使用しないでください。</i>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            
          </div>
        </div>
      </Form>
      
      
    </div>
  )

}

export default observer(FormCat)