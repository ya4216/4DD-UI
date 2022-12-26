import { createAction, ActionType, createReducer } from 'typesafe-actions';

const SETBUTTONTYPE = 'buttonModule/SETBUTTONTYPE';
const SELECTMENUINFO = 'buttonModule/SELECTMENUINFO';
const INITBUTTONSTATE = 'buttonModule/INITBUTTONSTATE';

export const buttonType = createAction(SETBUTTONTYPE)<string>();
export const selectMenuInfo = createAction(SELECTMENUINFO)<[]>();
export const initButtonState = createAction(INITBUTTONSTATE)();

const actions = { buttonType, selectMenuInfo, initButtonState };
type ButtonAction = ActionType<typeof actions>;

type ButtonState = {
  [name: string]: string | boolean | [];
};

const initialState: ButtonState = {
  selectedList: [],
  type: '',
  on: true,
};

const buttonModule = createReducer<ButtonState, ButtonAction>(initialState, {
  [SETBUTTONTYPE]: (state, action) => ({
    ...state,
    type: action.payload,
  }),
  [SELECTMENUINFO]: (state, action) => ({
    ...state,
    selectedList: action.payload,
    on: JSON.parse(JSON.stringify(action.payload)).useYN == 'Y' ? true : false,
  }),
  [INITBUTTONSTATE]: () => initialState,
});

export default buttonModule;
