import { useDispatch } from 'react-redux';
import { buttonType, selectMenuInfo } from '../modules/buttonModule';
import * as Button from '../components/Common/buttons';

//index는 common 디렉토리 모든 컴포넌트를 export함
import { customType } from '../common/index';

import { ResponsiveStyleValue } from '@mui/system';

type SelectProps = [
  {
    type: string;
    text: string;
    startIcon: string;
    direction:
      | ResponsiveStyleValue<
          'column' | 'column-reverse' | 'row' | 'row-reverse'
        >
      | undefined;
    spacing: ResponsiveStyleValue<string | number> | undefined;
    variant: 'text' | 'outlined' | 'contained' | undefined;
  },
];

type propType = {
  getTypeArr: string[] | SelectProps;
};

const setButtonType = ({ getTypeArr }: propType) => {
  let innerHtml: JSX.Element[] = [];
  const dispatch = useDispatch();

  getTypeArr.map((v, i) => {
    const onSetButtonType = () => {
      if (typeof getTypeArr[i] == 'string') {
        dispatch(buttonType(getTypeArr[i] as string));
      }
    };

    innerHtml.push(
      <Button.getButton
        onSetButtonType={onSetButtonType}
        selectType={getTypeArr[i]}
        key={i}
      />,
    );
  });

  return <>{innerHtml}</>;
};

export default setButtonType;
