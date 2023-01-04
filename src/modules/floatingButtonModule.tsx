import { createAction, ActionType, createReducer } from 'typesafe-actions';

const SETBUTTON = 'floatingButtonModule/SETBUTTON';
const SETFLOATINGTYPE = 'floatingButtonModule/SETFLOATINGTYPE';
const SETFLOATINGBUTTONJSX = 'floatingButtonModule/SETFLOATINGBUTTONJSX';
const FLOATINGCLICKSTATE = 'floatingButtonModule/FLOATINGCLICKSTATE';
const INITFLOATINGSTATE = 'floatingButtonModule/INITFLOATINGSTATE';

export const setFloatingButton = createAction(SETBUTTON)<{
  [key: string]: any;
}>();
export const setFloatingType = createAction(SETFLOATINGTYPE)<string>();
export const setFloatingButtonJsx =
  createAction(SETFLOATINGBUTTONJSX)<JSX.Element[]>();
export const floatingClickState = createAction(FLOATINGCLICKSTATE)<string>();
export const initFloatingState = createAction(INITFLOATINGSTATE)();

const actions = {
  setFloatingButton,
  setFloatingType,
  setFloatingButtonJsx,
  floatingClickState,
  initFloatingState,
};
type FloatingButtonAction = ActionType<typeof actions>;

type floatProps = {
  type: string;
  icon: string;
  confirmType: 'tooltip' | 'modal' | 'none';
  tooltipButtonType: 'type1' | 'type2' | 'type3' | 'type4';
  confirmMessage: string;
};

type FloatingButtonState = {
  on: boolean;
  type: string;
  list: floatProps[];
  clickState: string;
};

const initialState: FloatingButtonState = {
  on: false,
  type: '',
  list: [],
  clickState: '',
};

const floatingButtonModule = createReducer<
  FloatingButtonState,
  FloatingButtonAction
>(initialState, {
  [SETBUTTON]: (state, action) => ({
    ...state,
    on: action.payload.on,
    list: action.payload.props,
  }),
  [SETFLOATINGTYPE]: (state, action) => ({ ...state, type: action.payload }),
  [FLOATINGCLICKSTATE]: (state, action) => ({
    ...initialState,
    clickState: action.payload,
  }),
  [INITFLOATINGSTATE]: () => initialState,
});

export default floatingButtonModule;
