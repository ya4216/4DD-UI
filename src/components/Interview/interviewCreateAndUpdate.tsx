import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import './interview.scss';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LabeledRadio from '../Common/labeledRadio';
import LabeledCheckbox from '../Common/labeledCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { setPageType } from '../../modules/interviewModule';

const interviewCreateAndUpdate = () => {
  const [useModal, setUseModal] = useState<JSX.Element>();
  const [inputMain, setInputMain] = useState<boolean>(false);
  const [inputMiddle, setInputMiddle] = useState<boolean>(false);
  const [inputSub, setInputSub] = useState<boolean>(false);
  const [multipleAnswer, setMultipleAnswer] = useState<boolean>(true);
  const [exampleList, setExampleList] = useState<JSX.Element[]>([]);
  const userInfo = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    main_category: '',
    main_category_code: '',
    middle_category: '',
    middle_category_code: '',
    sub_category: '',
    sub_category_code: '',
    multiple_choice: 'multiple',
    interview_contents: '',
    interview_answer: '',
    answer_example: ['', '', '', ''],
    writer: userInfo.name,
    useYN: true,
  });

  //새 대분류,중분류,소분류 체크박스 제어
  const newCategory = (e: any) => {
    console.log('ee : ', e.target);
    if (e.target.name.indexOf('main') !== -1) {
      setInputMain(e.target.checked);
      setValues({
        ...values,
        main_category: '',
      });
    } else if (e.target.name.indexOf('middle') !== -1) {
      setInputMiddle(e.target.checked);
      setValues({
        ...values,
        middle_category: '',
      });
    } else if (e.target.name.indexOf('sub') !== -1) {
      setInputSub(e.target.checked);
      setValues({
        ...values,
        sub_category: '',
      });
    }
  };

  //객관식, 주관식 선택
  const multipleCheck = (e: any) => {
    if (e.target.value === 'multiple') {
      setMultipleAnswer(true);
    } else if (e.target.value === 'single') {
      setMultipleAnswer(false);
    }
    setValues({
      ...values,
      multiple_choice: e.target.value,
    });
  };

  //보기 추가 제거
  const addAndDeletexample = (bool: boolean) => {
    if (bool) {
      const answerExample = values.answer_example;
      answerExample.push('');
      setValues({
        ...values,
        answer_example: answerExample,
      });
      setExampleList([
        ...exampleList,
        <Field
          key={exampleList.length + 5}
          type="TextField"
          fullWidth
          id="outlined-start-adornment"
          sx={{ marginTop: '10px' }}
          name={'answer_example[' + (exampleList.length + 4) + ']'}
          className="answer_example"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {exampleList.length + 5}번
              </InputAdornment>
            ),
          }}
          as={TextField}
        />,
      ]);
    } else {
      let exampleHtml = exampleList;
      exampleHtml.pop();
      setExampleList([...exampleList]);

      const answerExample = values.answer_example;
      answerExample.pop();
      setValues({
        ...values,
        answer_example: answerExample,
      });
    }
  };

  //유효성검사
  const validateSchema = Yup.object().shape({
    main_category: Yup.string()
      .min(2, '대분류명이 너무 짧습니다.')
      .max(20, '대분류명이 너무 깁니다.')
      .required('대분류를 입력하세요.'),
    middle_category: Yup.string()
      .min(2, '중분류명이 너무 짧습니다.')
      .max(20, '중분류명이 너무 깁니다.')
      .required('중분류를 입력하세요.'),
    sub_category: Yup.string()
      .min(2, '소분류명이 너무 짧습니다.')
      .max(20, '소분류명이 너무 깁니다.')
      .required('소분류를 입력하세요.'),
    interview_contents: Yup.string()
      .min(10, '질문이 너무 짧습니다.')
      .max(1000, '질문이 너무 깁니다.')
      .required('질문을 입력하세요.'),
    interview_answer: Yup.string()
      .min(6, '답변이 너무 짧습니다.')
      .max(500, '답변이 너무 깁니다.')
      .required('답변을 입력하세요.'),
    answer_example: Yup.array()
      .min(4, '보기는 4개이상 입력해주세요.')
      .max(20, '보기가 너무 많습니다.'),
  });

  //submit
  const handleSubmit = (values: any) => {
    values.main_category_code = 1;
    values.middle_category_code = 1;
    values.sub_category_code = 1;

    values.multiple_choice =
      values.multiple_choice === 'multiple' ? true : false;
    values.useYN = values.useYN ? 'Y' : 'N';

    console.log('value1 ::: ', values);
    Axios.post(`/api/interview`, values)
      .then((res) => {
        console.log('성공 : ', res);
        dispatch(setPageType('contents'));
      })
      .catch((err) => {
        console.log('실패 :: ', err);
      });
  };

  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div style={{ position: 'relative' }}>
            {useModal}
            {window.innerWidth < 768 ? (
              <table
                style={{
                  width: '100%',
                  height: '100px',
                }}
              >
                <tbody>
                  <tr>
                    <td>대분류</td>
                    <td>
                      {inputMain ? (
                        <Field
                          className="table__textField"
                          type="TextField"
                          name="main_category"
                          as={TextField}
                        />
                      ) : (
                        <Field
                          className="table__selectBox"
                          as="select"
                          name="main_category"
                        >
                          <option value="JavaScript">JavaScript</option>
                          <option value="데이터베이스">데이터베이스</option>
                          <option value="mongoDB">mongoDB</option>
                        </Field>
                      )}
                      새 대분류&nbsp;
                      <input
                        type="checkbox"
                        name="main_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                  </tr>
                  <tr style={{ height: '25px', color: 'red' }}>
                    <td colSpan={2}>
                      <ErrorMessage name="main_category" />
                    </td>
                  </tr>
                  <tr>
                    <td>중분류</td>
                    <td>
                      {inputMiddle ? (
                        <Field
                          className="table__textField"
                          type="middle_category"
                          name="middle_category"
                          as={TextField}
                        />
                      ) : (
                        <Field
                          className="table__selectBox"
                          as="select"
                          name="middle_category"
                        >
                          <option value="none">대분류를 선택하세요</option>
                        </Field>
                      )}
                      새 중분류&nbsp;
                      <input
                        type="checkbox"
                        name="middle_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                  </tr>
                  <tr style={{ height: '25px', color: 'red' }}>
                    <td colSpan={2}>
                      <ErrorMessage name="middle_category" />
                    </td>
                  </tr>
                  <tr>
                    <td>소분류</td>
                    <td>
                      {inputSub ? (
                        <Field
                          className="table__textField"
                          type="sub_category"
                          name="sub_category"
                          as={TextField}
                        />
                      ) : (
                        <Field
                          className="table__selectBox"
                          as="select"
                          name="sub_category"
                        >
                          <option value="none">중분류를 선택하세요</option>
                        </Field>
                      )}
                      새 소분류&nbsp;
                      <input
                        type="checkbox"
                        name="sub_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                  </tr>
                  <tr style={{ height: '25px', color: 'red' }}>
                    <td colSpan={2}>
                      <ErrorMessage name="sub_category" />
                    </td>
                  </tr>
                  <tr>
                    <td>질문유형</td>
                    <td>
                      <div onChange={(e: any) => multipleCheck(e)}>
                        <label className="table__label">
                          <Field
                            name="multiple_choice"
                            value="multiple"
                            label="객관식"
                            type="radio"
                          />
                          객관식
                        </label>
                        <label className="table__label table__single">
                          <Field
                            name="multiple_choice"
                            value="single"
                            label="주관식"
                            type="radio"
                          />
                          주관식
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>사용여부</td>
                    <td>
                      <Field
                        className="table__useYN"
                        name="useYN"
                        type="checkbox"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table
                border={1}
                style={{
                  width: '100%',
                  height: '100px',
                }}
              >
                <tbody>
                  <tr>
                    <td>대분류</td>
                    <td>
                      {inputMain ? (
                        <Field
                          type="TextField"
                          name="main_category"
                          as={TextField}
                        />
                      ) : (
                        <Field as="select" name="main_category">
                          <option value="JavaScript">JavaScript</option>
                          <option value="데이터베이스">데이터베이스</option>
                          <option value="mongoDB">mongoDB</option>
                        </Field>
                      )}
                      새 대분류&nbsp;
                      <input
                        type="checkbox"
                        name="main_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                    <td>중분류</td>
                    <td>
                      {inputMiddle ? (
                        <Field
                          type="middle_category"
                          name="middle_category"
                          as={TextField}
                        />
                      ) : (
                        <Field as="select" name="middle_category">
                          <option value="none">대분류를 선택하세요</option>
                        </Field>
                      )}
                      새 중분류&nbsp;
                      <input
                        type="checkbox"
                        name="middle_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                    <td>소분류</td>
                    <td>
                      {inputSub ? (
                        <Field
                          type="sub_category"
                          name="sub_category"
                          as={TextField}
                        />
                      ) : (
                        <Field as="select" name="sub_category">
                          <option value="none">중분류를 선택하세요</option>
                        </Field>
                      )}
                      새 소분류&nbsp;
                      <input
                        type="checkbox"
                        name="sub_category"
                        onChange={(e) => newCategory(e)}
                      />
                    </td>
                  </tr>
                  <tr style={{ height: '25px', color: 'red' }}>
                    <td colSpan={2}>
                      <ErrorMessage name="main_category" />
                    </td>
                    <td colSpan={2}>
                      <ErrorMessage name="middle_category" />
                    </td>
                    <td colSpan={2}>
                      <ErrorMessage name="sub_category" />
                    </td>
                  </tr>
                  <tr>
                    <td>질문 유형</td>
                    <td colSpan={3}>
                      <div onChange={(e: any) => multipleCheck(e)}>
                        <label className="table__label">
                          <Field
                            name="multiple_choice"
                            value="multiple"
                            label="객관식"
                            type="radio"
                          />
                          객관식
                        </label>{' '}
                        <label className="table__label">
                          <Field
                            name="multiple_choice"
                            value="single"
                            label="주관식"
                            type="radio"
                          />
                          주관식
                        </label>
                        {/* <LabeledRadio
                        name="multiple_choice"
                        value="multiple"
                        label="객관식"
                        type="radio"
                      />
                      <LabeledRadio
                        name="multiple_choice"
                        value="single"
                        label="주관식"
                        type="radio"
                      /> */}
                      </div>
                    </td>
                    <td>질문사용여부</td>
                    <td>
                      <Field
                        className="table__useYN"
                        name="useYN"
                        type="checkbox"
                      />
                      {/* <LabeledCheckbox name="useYN" label="" type="checkbox" /> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            <Divider sx={{ width: '100%', marginTop: '15px' }} />
            <br />
            <div>
              질문 :&nbsp;
              <span style={{ color: 'red' }}>
                <ErrorMessage name="interview_contents" />
              </span>
              <br />
              <Field
                id="outlined-multiline-static"
                className="interview_contents"
                type="TextField"
                name="interview_contents"
                placeholder="질문을 입력하세요!"
                multiline
                rows={5}
                sx={{ width: '100%' }}
                as={TextField}
              />
            </div>
            <br />
            <div>
              답변 :{' '}
              <span style={{ color: 'red' }}>
                <ErrorMessage name="interview_answer" />
              </span>
              <br />
              <Field
                id="outlined-multiline-static"
                className="interview_answer"
                type="TextField"
                name="interview_answer"
                placeholder="답변을 입력하세요!"
                multiline
                rows={2}
                sx={{ width: '100%' }}
                as={TextField}
              />
            </div>
            <br />
            {multipleAnswer ? (
              <div>
                보기 :{' '}
                <button type="button" onClick={() => addAndDeletexample(true)}>
                  추가
                </button>
                <button type="button" onClick={() => addAndDeletexample(false)}>
                  삭제
                </button>{' '}
                <span style={{ color: 'red' }}>
                  <ErrorMessage name="answer_example" />
                </span>
                <br />
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#afabab',
                  }}
                >
                  보기 4개까지는 필수 입력입니다. 5가지 이상일 경우 랜덤으로
                  4가지를 조합하여 출제가 됩니다. 문제의 다양성을 위해 보기를
                  많이 추가해 주시면 좋습니다.
                </span>
                <div>
                  <Field
                    type="TextField"
                    fullWidth
                    id="outlined-start-adornment"
                    sx={{ marginTop: '10px' }}
                    name="answer_example[0]"
                    className="answer_example"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">1번</InputAdornment>
                      ),
                    }}
                    as={TextField}
                  />
                </div>
                <div>
                  <Field
                    type="TextField"
                    fullWidth
                    id="outlined-start-adornment"
                    sx={{ marginTop: '10px' }}
                    name="answer_example[1]"
                    className="answer_example"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">2번</InputAdornment>
                      ),
                    }}
                    as={TextField}
                  />
                </div>
                <div>
                  <Field
                    type="TextField"
                    fullWidth
                    id="outlined-start-adornment"
                    sx={{ marginTop: '10px' }}
                    name="answer_example[2]"
                    className="answer_example"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">3번</InputAdornment>
                      ),
                    }}
                    as={TextField}
                  />
                </div>
                <div>
                  <Field
                    type="TextField"
                    fullWidth
                    id="outlined-start-adornment"
                    sx={{ marginTop: '10px' }}
                    name="answer_example[3]"
                    className="answer_example"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">4번</InputAdornment>
                      ),
                    }}
                    as={TextField}
                  />
                </div>
                {exampleList.length ? exampleList : null}
              </div>
            ) : null}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit">저장</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default interviewCreateAndUpdate;
