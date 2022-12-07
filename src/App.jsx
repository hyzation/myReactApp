import './App.css'
import React, { lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('./routes/home.jsx'));
const Test0 = lazy(() => import('./routes/test0'));
const Test1 = lazy(() => import('./routes/test1'));
const Test2 = lazy(() => import('./routes/test2'));
const Test3 = lazy(() => import('./routes/test3'));
const Test4 = lazy(() => import('./routes/test4'));
const Test5 = lazy(() => import('./routes/test5'));


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test0" element={<Test0 />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/test5" element={<Test5 />} />
      </Routes>
    </Router>
  );
}
