/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { observer,MobXProviderContext } from 'mobx-react'
import { Button, Input, Form, Upload, message, Modal} from 'antd';
import classnames from 'classnames';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PRE_IMG} from '@/constant/urls'

import s from './index.module.less';


const UploadImg = ({file,img}) => {
  const [form] = Form.useForm();
  const { store } = React.useContext(MobXProviderContext)
  const [fileList, setFileList] = useState(file)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false);
  const [previewImg, setPreviewImg] = useState('');

  const COUNT = 2
  
  console.log(file,'fileList')

  useEffect(()=>{
    setFileList(file)
  },[file])


  const doPreview = async (file) => {
    let url = file.url.split('?')[0]
    setPreviewImg(url);
    setPreview(true);
  };


  const doUpload =(file)=>{
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file)
    store.uploadImg(formData).then(r=>{
      let item = { url: `${PRE_IMG}${r}?width=100` }
      setFileList([...fileList,item])
      setLoading(false);
    })
    return false;
  }


  const doRemove =(file)=>{
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  }


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize: '12px'}} > アップロード </div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={doPreview}
        onRemove ={doRemove}

        beforeUpload ={doUpload}
        >
        {fileList.length >= COUNT ? null :  uploadButton}
      </Upload>

      <Modal open={preview} footer={null} onCancel={() => setPreview(false)}>
        <img style={{ width: '100%'}} src={previewImg} />
      </Modal>
      

    </>
  )

}

export default  observer(UploadImg)