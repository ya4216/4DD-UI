import React from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./App";
import "./index.css";





import './index.css';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);






ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

// 렌더링이 두번씩 되는 이유는
// 아래 App태그에 <React.StrictMode> 태그로 감쌀경우
// 리액트에서 제공하는 검사 도구, 개발 모드일때만 디버그 실행 하며 해당 태그로 감쌀경우 하위의 모든것을 검사
// 안전하지 않은 생명주기를 가진 컴포넌트라든지, 권장되지 않는 부분 또는 배포 후 문제가 될만한 이슈들을 미리 잡는 모드
// create-react-app으로 리액트 앱을 생성시 기본적으로 생성되는 태그

  <Provider store={store}>
    <WrappedApp />
  </Provider>
);
