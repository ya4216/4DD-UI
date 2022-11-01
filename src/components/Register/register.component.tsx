import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import AuthService from "../services/auth.service";

type Props = {};

type State = {
  name: string,
  email: string,
  password: string,
  password2: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
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
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40 
            // val.toString().
        ),   
      password2: Yup.string()
      .required("비밀번호를 입력해주세요.")
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),   
    });
  }

  handleRegister(formValue: { name: string; email: string; password: string }) {
    const { name, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    // AuthService.register(
    //   name,
    //   email,
    //   password
    // ).then(
    //   response => {
    //     this.setState({
    //       message: response.data.message,
    //       successful: true
    //     });
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     this.setState({
    //       successful: false,
    //       message: resMessage
    //     });
    //   }
    // );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="name"> 이름 </label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> 이메일 </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> 비밀번호 </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password2"> 비밀번호 확인 </label>
                    <Field
                      name="password2"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password2"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">회원가입</button>
                  </div>
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
    );
  }
}
