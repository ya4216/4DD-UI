import {
    createAction,
    ActionType,
    createReducer
  } from 'typesafe-actions';
  
// 액션 type 선언
const SETUSERINFO = 'user/SETUSERINFO'; //상태 초기화 액션
const INITUSERSTATE = 'user/INITUSERSTATE'; //상태 초기화 액션

//액션 생성함수 선언
export const setUserInfo = createAction(SETUSERINFO)<any>();
export const initUserState = createAction(INITUSERSTATE)<any>();

// 액션 객체 타입 준비
const actions = { setUserInfo, initUserState };
type userAction = ActionType<typeof actions>;

type userState = {
    info?: any;
};
const initialState: userState = {
    info: {}
};

const user = createReducer<userState, userAction>(initialState, {    
    [SETUSERINFO]: (state, action) => ({ info: action.payload }),
    [INITUSERSTATE]: () => (initialState)
});


export default user;