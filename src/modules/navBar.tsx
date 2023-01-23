import {
    createAction,
    ActionType,
    createReducer
  } from 'typesafe-actions';
  
// 액션 type 선언
const SETOPENSAVE = 'navbar/SETOPENSAVE';
const INITNAVSTATE = 'navbar/INITNAVSTATE'; //상태 초기화 액션

//액션 생성함수 선언
export const setOpenSave = createAction(SETOPENSAVE)<boolean>();
export const initNavState = createAction(INITNAVSTATE)();

// 액션 객체 타입 준비
const actions = { setOpenSave, initNavState };
type navBarAction = ActionType<typeof actions>;

type navBarState = {
    open?: boolean;
};
const initialState: navBarState = {
    open: true
};

const navbar = createReducer<navBarState, navBarAction>(initialState, {
    [SETOPENSAVE]: (state, action) => ({ open: action.payload }),
    [INITNAVSTATE]: () => (initialState)
});

export default navbar;