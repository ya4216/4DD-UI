import { createAction, ActionType, createReducer } from 'typesafe-actions';

// 액션 type 선언
const SETPAGETYPE = 'interview/SETPAGETYPE';
const INITINTERVIEWSTATE = 'interview/INITINTERVIEWSTATE';

//액션 생성함수 선언
export const setPageType = createAction(SETPAGETYPE)<string>();
export const initInterviewState = createAction(INITINTERVIEWSTATE)();

// 액션 객체 타입 준비
const actions = { setPageType, initInterviewState };
type interviewAction = ActionType<typeof actions>;

type interviewState = {
  pageType?: string;
};
const initialState: interviewState = {
  pageType: 'contents',
};

const interview = createReducer<interviewState, interviewAction>(initialState, {
  [SETPAGETYPE]: (state, action) => ({ pageType: action.payload }),
  [INITINTERVIEWSTATE]: () => initialState,
});

export default interview;
