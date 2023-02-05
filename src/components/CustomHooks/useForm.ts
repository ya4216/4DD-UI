import { useCallback, useEffect, useState } from 'react';

const useForm = ({ initialValues, validate, onSubmit }: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e: any) => {
    if (e.target.name.indexOf('answer_example') !== -1) {
      let exampleArr: any[] = values.answer_example;
      if (e.target.value !== '') {
        exampleArr[e.target.name.split('_')[2]] = e.target.value;
      } else {
        exampleArr.splice(e.target.name.split('_')[2], 1);
      }
      setValues({
        ...values,
        [e.target.name.slice(0, e.target.name.lastIndexOf('_'))]: exampleArr,
      });
      return;
    }

    setValues({
      ...values,
      [e.target.name]:
        e.target.name === 'useYN'
          ? e.target.checked
            ? 'Y'
            : 'N'
          : e.target.value,
    });
  };

  const handleBlur = (e: any) => {
    if (e.target.name.indexOf('answer_example') !== -1) {
      let exampleArr: any[] = values.answer_example;
      if (e.target.value !== '') {
        exampleArr[e.target.name.split('_')[2]] = e.target.value;
      } else {
        exampleArr.splice(e.target.name.split('_')[2], 1);
      }
      setTouched({
        ...touched,
        [e.target.name.slice(0, e.target.name.lastIndexOf('_'))]: exampleArr,
      });
      return;
    }

    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: any) => {
    console.log('value : ', values);
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((touched: any, field) => {
        touched[field] = true;
        return touched;
      }, {}),
    );

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    onSubmit(values);
  };

  const getFieldProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

export default useForm;
