import { createAction, ActionType, createReducer } from 'typesafe-actions';

// 액션 type 선언
const GETSAVE = 'unitTitle/GETSAVE';
const SELECTUNITTITLE = 'unitTitle/SELECTUNITTITLE';
const SELECTUNIT = 'unitTitle/SELECTUNIT';
const INITUNITSTATE = 'unitTitle/INITUNITSTATE';

//액션 생성함수 선언
export const getSave = createAction(GETSAVE)<[]>();
export const selectUnitTitle = createAction(SELECTUNITTITLE)<string>();
export const selectUnit = createAction(SELECTUNIT)<string>();
export const initUnitState = createAction(INITUNITSTATE)();

// 액션 객체 타입 준비
const actions = { getSave, selectUnitTitle, selectUnit, initUnitState };
type UnitTitleAction = ActionType<typeof actions>;

type UnitState = {
  list?: any[];
  selectedUnitId?: string;
  selectedMenuId?: string;
};
const initialState: UnitState = {
  list: [],
  selectedUnitId: '',
  selectedMenuId: '',
};

const unitTitle = createReducer<UnitState, UnitTitleAction>(initialState, {
  [GETSAVE]: (state, action) => ({ list: action.payload }),
  [SELECTUNITTITLE]: (state, action) => ({ selectedUnitId: action.payload }),
  [SELECTUNIT]: (state, action) => ({
    list: state.list,
    selectedUnitId: state.selectedUnitId,
    selectedMenuId: action.payload,
  }),
  [INITUNITSTATE]: (state, action) => ({
    ...initialState,
    selectedUnitId: state.selectedUnitId,
  }),
});

export default unitTitle;
