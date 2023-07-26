import React,{useState,useEffect} from 'react';import { inject,observer,MobXProviderContext } from 'mobx-react'import classnames from 'classnames';import {message} from 'antd'import {API_SERVER} from '@/constant/apis'import s from './index.module.less';import { useNavigate } from 'react-router-dom'import {usr, list1, list2, list3} from '@/constant/data'import User    from '@/component/User'import NewList from '@/component/NewList'import NavBtn from '@/component/NavBtn'const Nav = ({}) => {  const { store } = React.useContext(MobXProviderContext)  const navigate = useNavigate();  const [open,setOpen] = useState(0)  const [show, setShow] = useState(true)  const mobile = document.querySelector('html').clientWidth<768  useEffect(()=>{      },[])  const uploadFile =async(e)=>{    const file = e.target.files[0]        if (!file) {      return;    }    const formData = new FormData();    formData.append('file', file);        store.uploadImg(formData).then(r=>{      // console.log(r)      message.info(r)    })  }  const doClick=()=>{    store.setShow(true,'edit')  }    return (    <nav>      <NavBtn         btnType={'edit'}        btnTitle={'新規投稿'}        icoL={true}        icoR={false}         style={{background: 'var(--clr-sub)', height: '40px', 'fontSize':'18px', color: '#fff', border: 'none', width: '100%'}}        onClick={doClick}        />            <User {...{usr}} />      <NewList {...list1} />      <NewList {...list2} />      <NewList {...list3} />    </nav>  )}export default observer(Nav)