import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './index.scss';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState('');
  const [message, setMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  let navigate = useNavigate();  

  const onhandlePost = async (data: any) => {
    const { email, password } = data;
    const postData = { email, password };

    // post
    await axios
      .post('/member/login', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate('/');
      })
      .catch(function (err: any) {
        console.log(err);
        setRegisterError('로그인에 실패하였습니다. 회원정보를 확인해주세요.');
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const initialValues = {    
    email: "",
    password: "",
  };
  

  return (
    <div className="login">
      <div className="login__content">                
        <div className="login__forms">
          <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <Form className="login__create">
               <h1 className="login__title">4 D D</h1>
               <span className="sub-title">Sign In</span>
                {!successful && (
                  <div className="login__inputs">
                    <div className="form-group">
                      <Field 
                        name="email" 
                        type="email" 
                        placeholder="이메일을 입력해주세요." 
                        className="form-control login__input" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        className="form-control login__input"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger danger"
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block login__button">
                        <div className="arrow-wrapper">
                          <span className="arrow"></span>
                        </div>
                        <p className="button-text isActive">로그인</p>
                      </button>
                    </div>

                    <div className="ask-account">
                      <span className="login__account login__account--account">계정이 아직 없나요?</span>
                      <Link className="login__signup login__signup--signup" id="sign-up" to="/register">회원가입</Link>
                    </div>

                    {/* <div className="login__social">
                      <a href="#" className="login__social--icon"><i className='bx bxl-facebook'></i></a>
                      <a href="#" className="login__social--icon"><i className='bx bxl-twitter'></i></a>
                      <a href="#" className="login__social--icon"><i className='bx bxl-google'></i></a>
                      <a href="#" className="login__social--icon"><i className='bx bxl-github'></i></a>
                    </div> */}
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;