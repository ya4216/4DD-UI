import React from 'react';
import { Route, Routes } from '../node_modules/react-router/index';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PostListPage/>} path="/" />
        <Route element={<PostListPage/>} path="/@:username" />
        <Route element={<LoginPage/>} path="/login" />
        <Route element={<RegisterPage/>} path="/register" />
        <Route element={<WritePage/>} path="/write" />
        <Route element={<PostPage/>} path="/@:username/:postId" />
      </Routes>
    </>
  );
};

export default App;
