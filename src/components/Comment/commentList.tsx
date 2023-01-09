import React, {createElement, useEffect, useState} from 'react';
import axios from "axios";
import "./commentList.scss";
import { Divider, Avatar, Grid, Paper, TextField } from "@material-ui/core";
import { Reply, Edit, Delete } from "@material-ui/icons";
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from "../../modules";
import Button from '@mui/material/Button';
import BoardService from "../../services/board";
import NestedModal from "../Common/modal";
import { Modal, CreateAndUpdate } from '../Common/index';
import { number, string } from 'yup/lib/locale';
import { functions } from 'lodash';

interface CommentForm {
  post_id: string;
  userName: string;
  content: string;
  comment_level: number;
  comment_id?: string;
  parentsComment? : string;
}

interface modalForm {
  title: string;
  content: string;
  _id: string;
  type: string;
  callback: any;
}

const CommentList = ({comInfo}:any) => {  
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [updateCmt, setUpdateCmt] = useState('');
  const [replyCmt, setReplyCmt] = useState('');
  const [modalForm, setModalForm] = useState<modalForm>({
    title: '',
    content: '',
    _id: '',
    type: '',
    callback: null
  });
  const [commentInfo, setCommentInfo] = useState([{
    id: '',
    comment_level: 0,
    content: '',
    dateTimeOfComment: '',
    post_id: '',
    userName: ''
  }]);  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user.info);  
  const { name, email, id }: any = userInfo;

  useEffect(() => {
    console.log("### userInfo : ", userInfo);
    comInfo && getComments();
    // setCommentInfo(state.commentInfo);
    console.log("### comInfo : ", comInfo);
    
  },[openModal]);

  // 댓글 데이터 가져오기
  const getComments = () => {    
    // BoardService.getCommentAll().then(
    //   response => {
    //     setSuccessful(true);
    //     setMessage(response.data);      
    //     console.log("### response.data : ", response.data);                             
    //   },
    //   error => {
    //     const resMessage = error.response.data?.message;
    //     setSuccessful(false);
    //     setMessage(resMessage);
    //   }
    // );
    
    BoardService.getComments(
      comInfo
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);      
        setCommentInfo(response.data.data);
        console.log("### commentInfo : ", commentInfo);
                             
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

  // 댓글 수정 Editor Open
  const openEditor = (type: string, _id: string) => {
    if(type === 'edit'){
      updateCmt === _id ? setUpdateCmt('') : setUpdateCmt(_id);
    }else{
      replyCmt === _id ? setReplyCmt('') : setReplyCmt(_id);
    }
  }

  // modal callback 함수
  const callbackfunc = (prop: any) =>{
    setOpenModal(false);
    if(prop.type === 'delete'){
      deleteComment(prop._id);      
    }else if(prop.type === 'edit') {
      addComment(prop._id);
    }
  }      

  // 댓글 버튼 controller
  const commentSubmit = (type: string, _id: string) => {
    
    switch (type) {
      // case('reply'): tmp = BoardService.replyComment(comInfo); break;
      case('edit'): {        
        setOpenModal(true);
        setModalForm({
          title: '댓글 수정',
          content: '해당 댓글을 수정하시겠습니까?',
          _id: _id,
          type: 'edit',
          callback: {callbackfunc}
        });
        break;
      }
      case('delete'): {
        setOpenModal(true);
        setModalForm({
          title: '댓글 삭제',
          content: '해당 댓글을 삭제하시겠습니까?',
          _id: _id,
          type: 'delete',
          callback: {callbackfunc}
        });                
        break;
      } 
    }             
  } 

  // 댓글 입력내용
  const fieldContent = (e: any) => {
    setComment(e.target.value);
  }

  // Submit 핸들러
  const addComment = (_id?: string, parentId?: string) => { 
    const commentForm = {
      post_id: comInfo,
      userName: userInfo.name,
      content: comment,
      comment_level : 0,
      comment_id: _id,
      parentsComment : parentId
    } 
    console.log("### commentForm : ", commentForm);

    BoardService.getCommentTree(parentId).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);      
        console.log("### response.data : ", response.data);                             
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
    // BoardService.addComment(
    //   commentForm
    // ).then(
    //   response => {
    //     setSuccessful(true);
    //     setMessage(response.data);
    //     setUpdateCmt('');
    //     getComments();
    //   },
    //   error => {
    //     const resMessage = error.response.data?.message;
    //     setSuccessful(false);
    //     setMessage(resMessage);
    //   }
    // );
  }

  // 댓글 삭제
  const deleteComment = (_id: string) => {
    BoardService.deleteComment(_id).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

  return (
    <>
      <div id="commentList">
        <Paper className="comment_container">
          {commentInfo.map( (com) => {
            return(
              <div style={{padding: '10px'}} key={com.id}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    {/* <Avatar alt="Remy Sharp" /> */}
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <div className='comment_title'>
                      <div className='comment_title_name'>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{com.userName}</h4>                
                        <p>
                          {com.dateTimeOfComment}
                        </p>
                      </div>
                      {(com.userName === name) ? (
                        <div className='comment_title_btn'>
                          {/* <Reply fontSize='small' style={{ color: 'cadetblue'}} onClick={() => openEditor('reply', com.id)}/>                           */}
                          <Edit fontSize='small' style={{ color: 'mediumseagreen'}} onClick={() => openEditor('edit', com.id)}/>
                          <Delete fontSize='small' style={{ color: 'tomato'}} onClick={() => commentSubmit('delete', com.id)}/>
                          {openModal && <NestedModal props={modalForm}/>}
                        </div>
                      ) : (
                        <div className='comment_title_btn'>
                          <Reply fontSize='small' style={{ color: 'cadetblue'}} onClick={() => openEditor('reply', com.id)}/>
                        </div>
                      )}
                    </div>                           
                    {updateCmt === com.id ? (
                      <div>
                        <div className='textfield_container_edit'>
                          <TextField
                            className='textfield_field'
                            variant="outlined"
                            multiline
                            minRows={3}
                            onChange={fieldContent}
                            defaultValue={com.content}
                          />
                        </div>
                        <div className='textfield_button_edit'>
                          <Button variant="contained" onClick={() => commentSubmit('edit', com.id)}>수정</Button>          
                        </div>  
                      </div>
                    ) : 
                    <p style={{ textAlign: "left" }}>
                      {com.content}
                    </p>
                    }
                    {replyCmt === com.id && (
                    <div>
                      <div className='textfield_container_edit'>
                        <TextField
                          className='textfield_field'
                          variant="outlined"
                          multiline
                          minRows={3}
                          onChange={fieldContent}
                        />
                      </div>
                      <div className='textfield_button_reply'>
                        <Button variant="contained" onClick={() => addComment('',com.id)}>댓글 +</Button>          
                      </div>  
                    </div>
                  )}
                  </Grid>
                </Grid>
                {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
              </div>
            )
          })}
        </Paper>
        <div className='textfield_container'>
          <TextField
            className='textfield_field'
            variant="outlined"
            multiline
            minRows={3}
            onChange={fieldContent}
          />
        </div>
        <div className='textfield_button'>
          <Button variant="contained" onClick={() => addComment()}>댓글 +</Button>          
        </div>        
      </div>
    </>
  );
}

export default CommentList;
