import {
    createAction,
    ActionType,
    createReducer
} from 'typesafe-actions';
  
// 액션 type 선언
const CREATE = 'buttonModule/CREATE';
const UPDATE = 'buttonModule/UPDATE';
const REMOVE = 'buttonModule/REMOVE';
const ONOFF = 'buttonModule/ONOFF';

// 액션 생성함수를 선언합니다
export const create = createAction(CREATE)<() => void>();
export const update = createAction(UPDATE)<() => void>();
export const remove = createAction(REMOVE)<() => void>();
export const onOff = createAction(ONOFF)<() => void>();

// 액션 객체 타입 준비
const actions = { create, update, remove, onOff };
type ButtonAction = ActionType<typeof actions>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type ButtonState = {
    [name:string] : (() => void) | string;
};

// 초기상태를 선언합니다.
const initialState: ButtonState = {
    create: '',
    update: '',
    remove: '',
    onOff: ''
};

// 리듀서를 만듭니다
const buttonModule = createReducer<ButtonState, ButtonAction>(initialState, {
    [CREATE]: (state, action) => ({ create: action.payload }),
    [UPDATE]: (state, action) => ({ update: action.payload }),
    [REMOVE]: (state, action) => ({ remove: action.payload }),
    [ONOFF]: (state, action) => ({ onOff: action.payload })
});

export default buttonModule;