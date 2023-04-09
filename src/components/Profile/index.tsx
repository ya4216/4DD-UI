import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AuthService from '../../services/auth';
import * as Yup from 'yup';
import './profile.scss';
import { VscAccount } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { initUserState } from '../../modules/user';

const Profile = () => {
  // const [name, setName] = useState(false);
  // const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false);
  let navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.info);

  useEffect(() => {
    setUserProfile({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    });
  }, []);

  // 비밀번호 변경 핸들러
  const handleChange = (formValue: { email: string; curPassword: string; password: string }) => {
    const { email, curPassword, password } = formValue;
    const id = userProfile.id;
    AuthService.changePassword(id, curPassword, password).then(
      (response) => {
        setSuccessful(true);
        setMessage(response.data.message);
        AuthService.logout().then(
          (response) => {
            // localStorage.removeItem("user");
            dispatch(initUserState());
            setSuccessful(true);
            setMessage(response.data.message);
            //로컬
            // allDelCookies('localhost', '/');
            //운영
            allDelCookies('fordd.fly.dev', '/');
            // window.location.reload();
            navigate('/login');
          },
          (error) => {
            const resMessage = error.response.data?.message;
            setSuccessful(false);
            setMessage(resMessage);
          },
        );
      },
      (error) => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      },
    );
  };

  // 쿠키 전체 삭제하기
  const allDelCookies = (domain: string, path: string) => {
    domain = domain || document.domain;
    path = path || '/';

    const cookies = document.cookie.split('; '); // 배열로 반환
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
    } else {
      for (let i = 0; i < cookies.length; i++) {
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
      }
    }
  };

  // Yup을 이용한 Form 제한조건
  const validationSchema = () => {
    return Yup.object().shape({
      curPassword: Yup.string().required('현재 비밀번호를 입력해주세요.'),
      password: Yup.string()
        .required('새로운 비밀번호를 입력해주세요.')
        .max(16, '비밀번호는 최대 16자리입니다.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/, '알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요'),
      password2: Yup.string()
        .required('비밀번호를 다시 입력해주세요.')
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    });
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
    curPassword: '',
  };

  return (
    <div>
      <div className="login__content">
        <div className="login__forms">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleChange}>
            <Form className="login__create">
              <VscAccount className="account"></VscAccount>
              <span className="sub-title">User Info</span>
              {!successful && (
                <div className="login__inputs">
                  <div className="userinfo_inputs">
                    <div>닉네임</div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{userProfile.name}</span>
                  </div>
                  <div className="userinfo_inputs" style={{ marginBottom: '10px' }}>
                    <div>이메일</div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{userProfile.email}</span>
                  </div>
                  <div style={{ lineHeight: 0 }} className={isChangePassword ? 'mb-10' : ''}>
                    <button type="submit" className="login__button">
                      <p
                        className={isChangePassword ? 'button-text password_on' : 'button-text password_off'}
                        onClick={() => {
                          setIsChangePassword((e) => !e);
                        }}
                      >
                        비밀번호 변경
                      </p>
                    </button>
                  </div>

                  {isChangePassword && (
                    <div>
                      <div>
                        <Field name="curPassword" type="password" className="form-control login__input" />
                        <ErrorMessage name="curPassword" component="div" className="alert alert-danger danger" />
                      </div>
                      <div>
                        <Field name="password" type="password" className="form-control login__input" />
                        <ErrorMessage name="password" component="div" className="alert alert-danger danger" />
                      </div>
                      <div>
                        <Field name="password2" type="password" className="form-control login__input" />
                        <ErrorMessage name="password2" component="div" className="alert alert-danger danger" />
                      </div>
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
                </div>
              )}

              {message && (
                <div>
                  <div className={successful ? '' : 'alert__fail'} role="alert">
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
