import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';

type CheckboxProps = { label: string } & FieldAttributes<{}>;

const LabeledCheckbox = ({ label, ...rest }: CheckboxProps) => {
  const [field] = useField(rest);
  return <FormControlLabel control={<Checkbox />} label={label} {...field} />;
};

export default LabeledCheckbox;
