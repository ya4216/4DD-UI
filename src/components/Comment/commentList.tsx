import React, { useEffect, useState} from 'react';
import "./commentList.scss";
import { Paper, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";
import Button from '@mui/material/Button';
import Comment from "./comment";
import BoardService from "../../services/board";
import { initButtonState } from '../../modules/commentModule';

// 리덕스 버튼 type, content, selectedId 추가해서 관리

type CommentForm = {
  childComment: any;
  content: string;
  dateTimeOfComment: string;
  parentsComment: any;
  post_id: string;
  userName: string;
  isDeleted: boolean;
  _id: string;
}

const CommentList = ({postId}:any) => {  
  const [comment, setComment] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [commentForm, setCommentForm] = useState<CommentForm[]>([{
    childComment: null,
    content: '',
    dateTimeOfComment: '',
    parentsComment: null,
    post_id: '',
    userName: '',
    isDeleted: false,
    _id: ''
  }]); 
  const [treeComment, setTreeComment] = useState<JSX.Element[]>([]);
  const commentInfo = useSelector((state: RootState) => state.commentModule); 
  const userInfo = useSelector((state: RootState) => state.user.info);  
  const dispatch = useDispatch();

  useEffect(() => {    
    getComments(); 
    return () => {
      dispatch(initButtonState());
    };   
  },[]);  

  useEffect(() => {        
    if(!commentInfo.type) return;
    if(commentInfo.type === 'add'){
      addComment('', commentInfo.selectedId);
    }else if(commentInfo.type === 'edit'){
      addComment(commentInfo.selectedId);
    }else if(commentInfo.type === 'delete'){
      deleteComment(commentInfo.selectedId);
    }    
  },[commentInfo]);   
  

  // 댓글 데이터 가져오기
  const getComments = () => {   
    // postId 관련 모든 댓글 가져오기    
    BoardService.getCommentTree(postId).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);    
        setCommentForm(response.data.data);
        commentTree(response.data.data);                                   
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

  // Submit 핸들러
  const addComment = (_id?:string, parentId?: string) => {    
    const content = (!_id && !parentId) ? comment : commentInfo.content;
    const commentForm = {
      post_id: postId,
      userName: userInfo.name,
      content: content,
      comment_level : 0,
      comment_id: _id,
      parentsComment : parentId
    }     
    BoardService.addComment(
      commentForm
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);               
        getComments();
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );    
  }

  // 댓글 삭제
  const deleteComment = (_id: string) => {
    BoardService.deleteComment(_id).then(
      response => {
        setSuccessful(true);
        setMessage(response.data);
        getComments();
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

  // 댓글 입력내용
  const fieldContent = (e: any) => {
    setComment(e.target.value);
  }

  // 댓글 트리구조 만들기
  let innerHtml: JSX.Element[] = [];
  let tmp:string[] = [];
  const commentTree = (data:CommentForm[], isChild: boolean = false) => {    
    data.map((com, idx)=>{
      if(tmp.includes(com._id)) return;
      tmp.push(com._id);
      innerHtml.push(
        <Comment key={com._id} comInfo={com} isChild={isChild} />
      );
      com.childComment[0]?._id && commentTree(com.childComment, true);
    });
    setTreeComment(innerHtml);
  }

  return (
    <>
      <div id="commentList">
        <Paper className="comment_container">
          {treeComment}
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
