import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { create, update, remove, onOff } from '../modules/buttonModule';
import * as Button from '../components/Common/buttons';

type functionType = {
    func : () => void
}






// 버튼들 누르면 콜백 실행되게 하려고했는데
// 콜백말고 state에 어떤 버튼을 눌렀는지 체크해서 Detail에 useEffect로 동적 컴포넌트 변경할것






export const getCreate = () => {
    const dispatch = useDispatch();

    const onCreate = () => {
        dispatch(create());
    };

    return (
        <Button.createButton create={onCreate} />
    );
}

export const getUpdate = ({func} : functionType) => {

    const dispatch = useDispatch();

    const onUpdate = () => {
        dispatch(update(func));
    };

    return (
        <Button.updateButton update={onUpdate} />
    );
}

export const getRemove = ({func} : functionType) => {

    const dispatch = useDispatch();

    const onRemove = () => {
        dispatch(remove(func));
    };

    return (
        <Button.removeButton remove={onRemove} />
    );
}

export const getOnOff = ({func} : functionType) => {

    const dispatch = useDispatch();

    const onOnOff = () => {
        dispatch(onOff(func));
    };

    return (
        <Button.onOffButton onOff={onOnOff} />
    );
}