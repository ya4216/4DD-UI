import { useDispatch } from 'react-redux';
import { setFloatingType } from '../modules/floatingButtonModule';
import FloatingButtons from '../components/Common/floatingButtons';

type floatProps = {
  type: string;
  icon: string;
  confirmType: string;
  tooltipButtonType: string;
  confirmMessage: string;
};

type TProps = {
  props: floatProps[];
};

const setButtonType = ({ props }: TProps) => {
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
        confirmType={v.confirmType}
        tooltipButtonType={v.tooltipButtonType}
        confirmMessage={v.confirmMessage}
      />,
    );
  });

  return <>{innerHtml}</>;
};

export default setButtonType;
