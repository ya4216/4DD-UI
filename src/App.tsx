import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Board from "./components/Board";
import Post from "./components/Post";
import Works from "./components/Works";
import Register from "./components/Register";
import Contents from "./components/Details";
import MyPage from "./components/MyPage";

function App() {
  return (
    <Routes>
      <Route path="contents" element={<Contents />} />
      <Route path="profile" element={<Profile />} />
      <Route path="works" element={<Works />} />
      <Route path="board" element={<Board />} />
      <Route path="board/post" element={<Post />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
