import { createAction, ActionType, createReducer } from 'typesafe-actions';
  
// 액션 type 선언
const SETBUTTONTYPE = 'commentModule/SETBUTTONTYPE'; //상태 초기화 액션
const INITBUTTONSTATE = 'commentModule/INITBUTTONSTATE'; //상태 초기화 액션

//액션 생성함수 선언
export const setButtonType = createAction(SETBUTTONTYPE)<ButtonState>();
export const initButtonState = createAction(INITBUTTONSTATE)();

// 액션 객체 타입 준비
const actions = { setButtonType, initButtonState };
type ButtonAction = ActionType<typeof actions>;

type ButtonState = {
    type: string;
    content: string;
    selectedId: string;
};
const initialState: ButtonState = {
    type: '',
    content: '',
    selectedId: ''
};

const commentModule = createReducer<ButtonState, ButtonAction>(initialState, {    
    [SETBUTTONTYPE]: (state, action) => ({
        ...state,
        type: action.payload.type,
        content: action.payload.content,
        selectedId: action.payload.selectedId
    }),
    [INITBUTTONSTATE]: () => (initialState)
});


export default commentModule;