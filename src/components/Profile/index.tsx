import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../../services/auth";
import * as Yup from "yup";
import './profile.scss';
import { VscAccount } from "react-icons/vsc";
import Navbar from "../Navbar";
import Axios from 'axios';

const Profile = () => {
  const [name, setName] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false);
  let navigate = useNavigate();    

  // 회원가입 핸들러
  const handleRegister = (formValue: { name: string; email: string; password: string }) => {
    const { name, email, password } = formValue;    
    AuthService.register(
      name,
      email,
      password
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.data.message);
        navigate('/login');
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
      password: Yup.string()
        .required("비밀번호를 입력해주세요.")
        .max(16, "비밀번호는 최대 16자리입니다.")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
          "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요"
        ), 
      password2: Yup.string()
        .required("비밀번호를 입력해주세요.")
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),   
    });
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  

  return (
    <div>
      <Navbar />
      <div className="login__content">                
        <div className="login__forms">
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form className="login__create">
              <VscAccount className="account"></VscAccount>
               <span className="sub-title">User Info</span>
                {!successful && (
                  <div className="login__inputs">
                    <div className="userinfo_inputs"></div>

                    <div className="userinfo_inputs" style={{ marginBottom: '10px' }}></div>

                    <div>
                      <button type="submit" className="login__button">
                        <p className="button-text password" onClick={() => { setIsChangePassword((e) => !e) }}>비밀번호 변경</p>
                      </button>
                    </div>

                    {isChangePassword &&
                      <div>
                        <div>
                          <Field
                            name="password"
                            type="password"
                            className="form-control login__input"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger danger"
                          />
                        </div>

                        <div>
                          <Field
                            name="password2"
                            type="password"
                            className="form-control login__input"
                          />
                          <ErrorMessage
                            name="password2"
                            component="div"
                            className="alert alert-danger danger"
                          />
                        </div>
                      </div>
                    }

                    <div>
                      <button type="submit" className="btn btn-primary btn-block login__button">
                        <div className="arrow-wrapper">
                          <span className="arrow"></span>
                        </div>
                        <p className="button-text">변경하기</p>
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div>
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

export default Profile;