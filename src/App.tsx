import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Footer from './common/Footer';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Profile from './components/Profile';
import Board from './components/Board';
import Post from './components/Post/post';
import Interview from './components/Interview';
import Register from './components/Register';
import Contents from './components/Details';
import ReduxTest from './containers/CounterContainer';
import MyPage from './components/MyPage';
import About from './components/About';

function App() {
  return (
    <Routes>
      <Route path="contents" element={<Contents />} />
      <Route path="profile" element={<Profile />} />
      <Route path="interview" element={<Interview />} />
      <Route path="board" element={<Board />} />
      <Route path="board/post" element={<Post />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<Home />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      <Route path="redux" element={<ReduxTest />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <Navbar />
      <App />
      <Footer />
    </HashRouter>
  );
}
