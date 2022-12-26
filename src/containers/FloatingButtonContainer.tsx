import { useDispatch } from 'react-redux';
import { buttonType, selectMenuInfo } from '../modules/buttonModule';
import {
  setFloatingButtonJsx,
  setFloatingType,
} from '../modules/floatingButtonModule';
import FloatingButtons from '../components/Common/floatingButtons';

import { ResponsiveStyleValue } from '@mui/system';

// type SelectProps = [
//   {
//     type: string;
//     text: string;
//     startIcon: string;
//     direction:
//       | ResponsiveStyleValue<
//           'column' | 'column-reverse' | 'row' | 'row-reverse'
//         >
//       | undefined;
//     spacing: ResponsiveStyleValue<string | number> | undefined;
//     variant: 'text' | 'outlined' | 'contained' | undefined;
//   },
// ];

type floatProps = {
  type: string;
  icon: string;
};

// const saveJsx = (innerHtml : JSX.Element[]) => {
//     dispatch(setFloatingButtonJsx(innerHtml));
// }

const setButtonType = (props: floatProps[]) => {
  let innerHtml: JSX.Element[] = [];
  const dispatch = useDispatch();

  props.map((v, i) => {
    const onSetButtonType = () => {
      dispatch(setFloatingType(v.type));
    };
    innerHtml.push(
      <FloatingButtons
        onSetFlotingType={onSetButtonType}
        type={v.type}
        icon={v.icon}
      />,
    );
  });

  //   dispatch(setFloatingButtonJsx(innerHtml));

  return innerHtml;
};

export default setButtonType;
