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
import { number, string } from 'yup/lib/locale';

interface CommentForm {
  post_id: string;
  userName: string;
  content: string;
  comment_level: number;
  comment_id?: string;
  parents_comment_id? : string;
}

const CommentList = ({comInfo}:any) => {  
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [myLike, setMyLike] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [updateCmt, setUpdateCmt] = useState('');
  const [commentInfo, setCommentInfo] = useState([{
    id: '',
    comment_level: 0,
    content: '',
    dateTimeOfComment: '',
    post_id: '',
    userName: ''
  }]);  
  const userInfo = useSelector((state: RootState) => state.user.info);  
  const { name, email, id }: any = userInfo;

  useEffect(() => {
    console.log("### userInfo : ", userInfo);
    
    if(comInfo){
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
    // setCommentInfo(state.commentInfo);
  },[]);


  const commentSubmit = (type: string, _id: string) => {     
    switch (type) {
      // case('reply'): tmp = BoardService.replyComment(comInfo); break;
      case('edit'): setUpdateCmt(_id); break;
      case('reply'): setUpdateCmt(_id); break;
      case('delete'): {
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
        break;
      } 
    }         
  }

  const like = (id: number) => {
    // 서버에 좋아요 추가/수정 후 전체 카운트 갱신
    setMyLike(1);
  }

  const dislike = (id: number) => {
    // 서버에 싫어요 추가/수정 후 전체 카운트 갱신
    setMyLike(-1);
  }

  const fieldContent = (e: any) => {
    setComment(e.target.value);
  }

  // Submit 핸들러
  const addComment = () => {  
    const commentForm = {
      post_id: commentInfo[0].post_id,
      userName: userInfo.name,
      content: comment,
      comment_level : 0,
      // comment_id: '',
      // parents_comment_id : ''
    } 
    
    BoardService.addComment(
      commentForm
    ).then(
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
                          <Reply fontSize='small' style={{ color: 'cadetblue'}} onClick={() => commentSubmit('reply', com.id)}/>                          
                          <Edit fontSize='small' style={{ color: 'mediumseagreen'}} onClick={() => commentSubmit('edit', com.id)}/>
                          <Delete fontSize='small' style={{ color: 'tomato'}} onClick={() => commentSubmit('delete', com.id)}/>
                        </div>
                      ) : (
                        <div className='comment_title_btn'>
                          <Reply fontSize='small' style={{ color: 'cadetblue'}} onClick={() => commentSubmit('reply', com.id)}/>
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
                          <Button variant="contained" onClick={addComment}>수정</Button>          
                        </div>  
                      </div>
                    ) : 
                    <p style={{ textAlign: "left" }}>
                      {com.content}
                    </p>
                    }
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
          <Button variant="contained" onClick={addComment}>댓글 +</Button>          
        </div>        
      </div>
    </>
  );
}

export default CommentList;
