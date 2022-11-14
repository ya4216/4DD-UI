import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import './index.scss';
import AuthService from "../../services/auth";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [cookies, setCookie] = useCookies(['accesstoken']);
  let navigate = useNavigate();  

  
  // 로그인 핸들러
  const handleLogin = (formValue: { email: string; password: string }) => {         
    const { email, password } = formValue;
    if(!email || !password) {
      setMessage("계정 정보를 입력해 주세요.");
      return;
    } 
    AuthService.login(      
      email,
      password
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.message);
        // setCookie('accessToken', response.data.accessToken);
        navigate('/home');
      },
      error => {
        console.log("### error : "+ error);
        
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  }

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
              onSubmit={handleLogin}
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
                        successful ? "" : "alert__fail"
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