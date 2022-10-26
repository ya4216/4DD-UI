import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../../services/auth";
import * as Yup from "yup";
import axios from 'axios';
import './index.scss';


const Register = () => {
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  let navigate = useNavigate();  

  // const onhandlePost = async (data: any) => {
  //   const { email, name, password } = data;
  //   const postData = { email, name, password };

  //   // post
  //   await axios
  //     .post('/member/join', postData)
  //     .then(function (response) {
  //       console.log(response, '성공');
  //       navigate('/login');
  //     })
  //     .catch(function (err: any) {
  //       console.log(err);
  //       setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
  //     });
  // };

  // 회원가입 핸들러
  const handleRegister = (formValue: { username: string; email: string; password: string }) => {
    const { username, email, password } = formValue;

    AuthService.register(
      username,
      email,
      password
    ).then(
      response => {
        setSuccessful(true);
        setMessage(response.data.message);
        navigate('/login');
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setSuccessful(false);
          setMessage(resMessage);
      }
    );
  }

  // Yup을 이용한 Form 제한조건
  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required("이름을 입력해주세요.")
        .test(
          "len",
          "사용자 이름은 3 ~ 20 글자로 입력해주세요.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        ),        
      email: Yup.string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 입력해주세요."),
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
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  

  return (
    <div className="login">
      <div className="login__content">                
        <div className="login__forms">
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form className="login__create">
               <h1 className="login__title">4 D D</h1>
               <span className="sub-title">Create Account</span>
                {!successful && (
                  <div className="login__inputs">
                    <div className="form-group">                      
                      <Field 
                        name="username"
                        type="text" 
                        placeholder="사용자 이름을 입력해주세요." 
                        className="login__input" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger danger"
                      />
                    </div>

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
                      <Field
                        name="password2"
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요."
                        className="form-control login__input"
                      />
                      <ErrorMessage
                        name="password2"
                        component="div"
                        className="alert alert-danger danger"
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block login__button">
                        <div className="arrow-wrapper">
                          <span className="arrow"></span>
                        </div>
                        <p className="button-text">회원가입</p>
                      </button>
                    </div>

                    <div className="ask-account">
                      <span className="login__account login__account--account">이미 계정이 있나요?</span>
                      <Link className="login__signup login__signup--signup" id="sign-in" to="/login">로그인</Link>
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

export default Register;