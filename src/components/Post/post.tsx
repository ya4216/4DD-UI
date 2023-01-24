import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import "./post.scss";
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate, useLocation } from "react-router-dom";
import EditorComponent from "../Utils/index"
import { Formik, Field, Form, ErrorMessage } from "formik";
import BoardService from "../../services/board";
import * as Yup from "yup";
import ReactQuill, { Quill } from 'react-quill';
import e from 'express';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";
import CommentList from "../Comment/commentList";
import { string } from 'prop-types';

function Post() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pureContent, setPureContent] = useState('');
  const [isSwitch, setIsSwitch] = useState(false);
  const getContent = (content: string) => {
    setPureContent(content.replace(/<[^>]*>?/g, ''));
    setContent(content);
  }
  const [open, setOpen] = useState(false);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const userInfo = useSelector((state: RootState) => state.user.info);
  const { name, email, id }: any = userInfo;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  let navigate = useNavigate();  
  
  const { state } = useLocation();


  // Submit 핸들러
  const handleSubmit = (formValue: { title: string }) => {  
    const { title } = formValue;
    const userName = userInfo.name;
    
    if(!title) {
      setMessage("계정 정보를 입력해 주세요.");
      return;
    } 
    let _id = ''; 
    state && (_id = state._id); 
    BoardService.register(
      _id,      
      userName,
      title,
      content
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);
        navigate('/board');
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

  // 포스트 삭제
  const deletePost = () => {      
    setOpen(true);
    const _id = state._id;    
    BoardService.delete(      
      _id
    ).then(
      response => {     
        setSuccessful(true);
        setMessage(response.data);
        navigate('/board');
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }
 
  // Yup을 이용한 Form 제한조건
  const validationSchema = () => {  
       
    return Yup.object().shape({
      title: Yup.string()
        .required("제목을 입력해주세요.")
        .test(
          "len",
          "제목은 1 ~ 30 글자로 입력해주세요.",
          (val: any) => (         
            val &&
            val.toString().length >= 1 &&
            val.toString().length <= 30            
          )
        )
    });
  }

  const initialValues = {    
    title: "",
    content: "",
  };
  return (
    <div id="post">
      <h1>Post</h1>      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >        
        {(props) => {
          const {
            values,		// form에서 공유되는 상태 값
            touched, 	// 사용자의 필드 방문/터치 여부 (boolean)
            errors, 		// form validation 에러
            isSubmitting,	// form 제출 상태 (boolean)
            handleChange,	// input change event handler. values[key] 를 업데이트
            handleBlur,	// onBlur event handler
            handleSubmit,	// submit handler
            setFieldValue
          } = props;
          return (
            <Form style={{height: '683px'}}>
              {(!state || isSwitch) ? (                
              <div>         
                {(state && (userInfo.name === state.userName)) && (
                  <div className='post_switch_box'>
                    <div className='post_switch'>
                      <Switch
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                          setIsSwitch(event.target.checked);
                        }}
                      />
                    </div>
                    <div className='post_edit'>EDIT</div>
                  </div>
                )}                
                <div className="title_container">
                  <Field 
                    name="title" 
                    type="title"
                    placeholder="제목을 30글자 이내로 입력해주세요."                                        
                  />
                </div>
                <div className="editor_container">
                  <EditorComponent
                    getContent={getContent}
                    contents = {isSwitch && state.content}
                  />
                </div>
                <div className="grid_button">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    style={{ width: '150px'}}
                    disabled={!(pureContent && values.title) || values.title.length > 30}
                  >
                    {isSwitch ? "수정하기" : "작성하기"}
                  </Button>
                </div>
              </div>
              ) 
              :
              (
                <div className='post_container'>
                {(userInfo.name === state.userName) && (
                  <div className='post_switch_box'>                    
                    <div className='post_switch'>
                      <Switch
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                          setIsSwitch(event.target.checked);
                          setFieldValue('title', state.title);
                        }}
                      />
                    </div>
                    <div className='post_edit'>EDIT</div>
                  </div>
                )}
                <div className='post_component'>
                  <div>
                    <div className='post_title_box'>
                      <div className='post_title'>
                        {state.title}
                      </div>
                    </div>
                    <hr/>
                    <div>
                      <ReactQuill readOnly className='post_quill' value={state.content}></ReactQuill> 
                    </div>
                  </div>
                </div>
                {(userInfo.name === state.userName) && (
                  <div className="grid_button edit">                    
                    <Button 
                      className="btn_delete"             
                      variant="contained"   
                      onClick={handleClickOpen}                
                    >
                      삭제
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {state.title}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          해당 게시물을 삭제하시겠습니까?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button style={{fontWeight: 'bold', color: '#ffffff', background: '#FF3636'}} onClick={handleClose}>취소</Button>
                        <Button style={{fontWeight: 'bold', color: '#ffffff', background: 'seagreen'}} onClick={deletePost} autoFocus>
                          확인
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
              </div>
              )
            }
            </Form>
          )
        }}
      </Formik>            
      <CommentList postId={state._id}></CommentList>
    </div>
  );
}

export default Post;
