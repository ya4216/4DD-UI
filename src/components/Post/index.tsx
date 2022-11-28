import React, { useState } from 'react';
import Navbar from "../Navbar";
import "./post.scss";
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";
import EditorComponent from "../Utils/index"
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../../services/auth";
import * as Yup from "yup";


function Post() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  let navigate = useNavigate();  

  // Submit 핸들러
  const handleSubmit = (formValue: { title: string; content: string }) => {         
    const { title, content } = formValue;
    console.log("##### title : "+ title);
    console.log("##### content : "+ content);
    
    if(!title || !content) {
      setMessage("계정 정보를 입력해 주세요.");
      return;
    } 
    // AuthService.post(      
    //   title,
    //   content
    // ).then(
    //   response => {
    //     console.log("##### response : "+ response);        
    //     setSuccessful(true);
    //     setMessage(response.data);
    //     navigate('/board');
    //   },
    //   error => {
    //     const resMessage = error.response.data?.message;
    //     setSuccessful(false);
    //     setMessage(resMessage);
    //   }
    // );
  }

  // Yup을 이용한 Form 제한조건
  const validationSchema = () => {
    console.log("### validate ");
    
    return Yup.object().shape({
      title: Yup.string()
        .required("제목을 입력해주세요.")
        .test(
          "len",
          "제목은 1 ~ 30 글자로 입력해주세요.",
          (val: any) =>
            val &&
            val.toString().length >= 1 &&
            val.toString().length <= 30
        ),
      content: Yup.string()
        .required("내용을 입력해주세요.") 
    });
  }

  const initialValues = {    
    title: "",
    content: "",
  };
  return (
    <body>
      <Navbar />
      <h1>Post</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="title_container">
            <Field 
              name="title" 
              type="title"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className="editor_container">
            <EditorComponent/>
          </div>
          <div className="grid_button">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ width: '150px'}}
              disabled={
                Object.keys(Error).length > 0
              }
            >
              작성하기
            </Button>
          </div>
        </Form>
      </Formik>
      <footer className="footer">
        <p className="footer-by">
          A project by{" "}
          <a
            href="https://naver.com/"
            rel="noopener"
            className="small-link"
          >
            HWI ONE
          </a>
          <a
            href="https://naver.com/"
            rel="noopener"
            target="_blank"
            className="no-link icon-twitter"
            aria-label="Follow me on Twitter"
          ></a>
        </p>
      </footer>
    </body>
  );
}

export default Post;
