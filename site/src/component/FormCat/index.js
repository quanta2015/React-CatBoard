import React,{useState,useEffect} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import classnames from 'classnames';
import { Button, Form, Input, Radio,Select,Upload,Modal,DatePicker,TimePicker,Checkbox} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import s from './index.module.less';

import icon_check  from '@/img/icon/check.svg'
import icon_warn  from '@/img/icon/warning.svg'

const { TextArea } = Input

const { Option } = Select;
const sexList = ["男の子", "男の子（去勢済）", "女の子", "女の子（避妊済）"]
const ageList = ["子猫", "成猫", "老猫"]
const sizeList = ["小型猫", "中型猫", "大型猫"]
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
  const [checkboxLabels, setCheckboxLabels] = useState(['复选框 1', '复选框 2', '复选框 3']);


  return (
    <div className={s.formCat} >
      <div className={s.menu}>
        <div className={s.title}>迷子情報を投稿する前にご確認ください。</div> 
        <img src={icon_check} className={s.icon} />
        <div className={`${s.text} ${s.largeText}`}><strong>警察</strong>に届出をしましたか？</div>
        <div className={`${s.text} ${s.largeText}`}><strong>保健所・動物愛護センター</strong>に問い合わせましたか？</div>
        <img src={icon_warn} className={s.icon} />
        <div className={s.text}>・電話番号やメールアドレスは入力せず、他のユーザーとの<br></br>連絡はねこならのメッセージ機能をご利用ください。</div>
        <div className={s.text}>・個人情報保護のため個人が特定される情報は入力しないでください。</div>
        <div className={s.text}>・報酬として金品を提示 / 要求しないでください。</div>
        <div className={s.text}>・<a href="/terms" className={s.link}>利用規約</a>に同意の上ご投稿ください。</div>
      </div>
      <Form form={form} layout='vertical' className={s.form}>
        <div className={s.sect}>
          <div className={s.row}>
            <h1><span>迷子になってしまった場所</span></h1>
          </div>
          <div className={s.row}>
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
          </div>
          <div className={s.row}>
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
          </div>
          <div className={s.row}>
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
          </div>

        </div>
        <div className={s.sect}>
          <div className={s.row}>
            <h1><span>迷子になってしまった日時</span></h1>
          </div>

          <div className={s.row}>
            <Form.Item 
              label="年月日" 
              name="date"
              rules={[
                {
                  required: true,
                  message: `年月日を選択してください`,
                },
              ]}>
              <DatePicker format="YYYY/MM/DD"/>
            </Form.Item>
          </div>

          <div className={s.row}>
            <Form.Item 
              label="時間帯" 
              name="timePeriod"
              rules={[
                {
                  required: true,
                  message: `時間帯を選択してください`,
                },
              ]}>
              <TimePicker format="HH:mm"/>
            </Form.Item>
          </div>
        </div>

        <div className={s.sect}>
          <div className={s.row}>
            <h1><span>迷子になってしまった猫ちゃんの情報</span></h1>
          </div>

          <div className={s.row}>
            <div className={s.col}>
              <Form.Item 
                label="名前" 
                name="name"
                rules={[
                  {
                    required: true,
                    message: `猫ちゃんの名前を記入してください`,
                  },
                ]}>
                <Input placeholder="例）みー" />
              </Form.Item>
            </div>
            <div className={s.col}>
              <Form.Item 
                label="毛色・柄" 
                name="color"
                rules={[
                  {
                    required: true,
                    message: `猫ちゃんの毛色・柄を記入してください`,
                  },
                ]}>
                <Input placeholder="（例）薄い茶色で縞模様" />
              </Form.Item>
            </div>
            <div className={s.col}>
              <Form.Item 
                label="猫種" 
                name="type"
                rules={[
                  {
                    required: true,
                    message: `猫種を記入してください`,
                  },
                ]}>
                <Input placeholder="（例：キジトラ、ベンガル）" />
              </Form.Item>
            </div>
            <div className={s.col}>
              <Form.Item 
                label="首輪の有無" 
                name="collar"
                rules={[
                  {
                    required: true,
                    message: `首輪の有無を選択してください`,
                  },
                ]}>
                <Radio.Group options={['有', '無']} />
                
              </Form.Item>
            </div>
            <div className={s.col}>
              <Form.Item 
                label="首輪の色・柄" 
                name="necklace"
                rules={[
                  {
                    required: true,
                    message: `首輪の色・柄を記入してください`,
                  },
                ]}>
                <Input placeholder="例）赤の花柄の首輪" />
                <i className={s.sm}>＊首輪をつけている場合は色・柄などを入力してください</i>
              </Form.Item>
            </div>
          </div>

          <div className={s.row}>
          <div className={s.col}>
            <Form.Item 
              label="性別" 
              name="sex"
              rules={[
                {
                  required: true,
                  message: `性別を選択してください`,
                },
              ]}>
              <Radio.Group value='inline'>
                {sexList.map((v, i) => (
                  <Radio value={v} key={i}>{v}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

            <div className={s.col}>
              <Form.Item 
                label="年齢" 
                name="age"
                rules={[
                  {
                    required: true,
                    message: `年齢を選択してください`,
                  },
                ]}>
                <Radio.Group value='inline'>
                  {ageList.map((v, i) => (
                    <Radio value={v} key={i}>{v}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>

            <div className={s.col}>
              <Form.Item 
                label="大きさ" 
                name="size"
                rules={[
                  {
                    required: true,
                    message: `大きさを選択してください`,
                  },
                ]}>
                <Radio.Group value='inline'>
                  {sizeList.map((v, i) => (
                    <Radio value={v} key={i}>{v}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
          </div>


          <div className={s.row}>
            <Form.Item 
              label="その他特徴" 
              name="attr"
              rules={[
                {required: false},
              ]}>
              <TextArea placeholder="例）目は青いです。尻尾がかぎしっぽです。サクラ耳です。右足に小さい傷跡があります。人見知りで怖がりなので触りに行こうとすると逃げてしまうと思いますが、名前を呼んだら反応してくれると思います。" 
                allowClear style={{height: '100px'}} />
                <i className={s.sm}>目の色・耳の形（サクラ耳など）・体型・尻尾の形（かぎしっぽなど）・性格・アレルギー・持病など出来るだけ詳しく<strong>150</strong>文字以内で入力してください</i>
            </Form.Item>
          </div>
          <div className={s.row}>
            <Form.Item 
              label="迷子になってしまった時の状況" 
              name="attr"
              rules={[
                {required: false},
              ]}>
              <TextArea placeholder="例）窓を開けっぱなしにしてしまっていて、脱走してしまいました。" allowClear style={{height: '100px'}} />
              <i className={s.sm}>120文字以内で入力してください</i>
            </Form.Item>
          </div>
        </div>


        <div className={s.sect}>
          <div className={s.row}>
            <Form.Item 
              label="猫ちゃんの写真アップロード" 
              name="attr"
              rules={[
                {
                  required: true,
                  message: `必ず１枚は写真をアップロードしてください`,
                },
              ]}>

              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <i className={s.sm}>（サイズは6ＭＢまで。利用可能な拡張子：png gif jpg）画像があるほうが多くの方が見てくれます。</i>
              <i className={s.sm}>＊必ず１枚は写真をアップロードしてください。</i>
              <i className={s.sm}>＊人の顔・家の外観などが写っていない写真を選んでください。</i>
              <i className={s.sm}>＊１枚目には体全体が写っている写真を選んでください。</i>
              <i className={s.sm}>＊出来るだけ画質の良い写真を選んでください。</i>
              <i className={s.sm}>＊色んな角度から撮った写真をアップロードしてください。</i>
              <i className={s.sm}>＊迷子になってしまった猫ちゃんの写真のみアップロードしてください。</i>
            </Form.Item>
          </div>

        </div>
        <div>
            <Form.Item
              name="checkbox-group"
              rules={[
                { 
                  validator: (_, value) =>
                    value && value.length === checkboxLabels.length ? Promise.resolve() : Promise.reject(new Error(`需要全选: ${checkboxLabels.join(', ')}`)),
                },
              ]}
            >
              <Checkbox.Group>
                <div className="checkbox-container">
                  <Checkbox value="A">选项 A</Checkbox>
                  <Checkbox value="B">选项 B</Checkbox>
                  <Checkbox value="C">选项 C</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
        </div>
      </Form>
      
      
    </div>
  )

}

export default observer(FormCat)