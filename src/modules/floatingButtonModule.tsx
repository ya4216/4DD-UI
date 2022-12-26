import { createAction, ActionType, createReducer } from 'typesafe-actions';

const SETBUTTON = 'floatingButtonModule/SETBUTTON';
const SETFLOATINGTYPE = 'floatingButtonModule/SETFLOATINGTYPE';
const SETFLOATINGBUTTONJSX = 'floatingButtonModule/SETFLOATINGBUTTONJSX';
const INITFLOATINGSTATE = 'floatingButtonModule/INITFLOATINGSTATE';

export const setFloatingButton = createAction(SETBUTTON)<boolean>();
export const setFloatingType = createAction(SETFLOATINGTYPE)<string>();
export const setFloatingButtonJsx =
  createAction(SETFLOATINGBUTTONJSX)<JSX.Element[]>();
export const initFloatingState = createAction(INITFLOATINGSTATE)();

const actions = {
  setFloatingButton,
  setFloatingType,
  setFloatingButtonJsx,
  initFloatingState,
};
type FloatingButtonAction = ActionType<typeof actions>;

type FloatingButtonState = {
  on?: boolean;
  type?: string;
  list?: JSX.Element[];
};

const initialState: FloatingButtonState = {
  on: false,
  type: '',
  list: [],
};

const floatingButtonModule = createReducer<
  FloatingButtonState,
  FloatingButtonAction
>(initialState, {
  [SETBUTTON]: (state, action) => ({ on: action.payload }),
  [SETFLOATINGTYPE]: (state, action) => ({ type: action.payload }),
  [SETFLOATINGBUTTONJSX]: (state, action) => ({ list: action.payload }),
  [INITFLOATINGSTATE]: () => initialState,
});

export default floatingButtonModule;
