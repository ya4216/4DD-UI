import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import buttonModule from './buttonModule';
import counter from './counter';
import navBar from './navBar';
import unit from './unit';

const persistConfig = {
  key: "root", // localStorage key 
  storage, // localStorage
  whitelist: ["unit"], // target (reducer name)
}

const rootReducer = combineReducers({
  unit,
  navBar,
  buttonModule,
  counter
});

// 루트 리듀서를 내보내주세요.
export default persistReducer(persistConfig, rootReducer);

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;