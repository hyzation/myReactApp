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
// const Test2 = lazy(() => import('./routes/test2'));


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test0" element={<Test0 />} />
        <Route path="/test1" element={<Test1 />} />
        {/* <Route path="/test2" element={<Test2 />} /> */}
      </Routes>
    </Router>
  );
}
