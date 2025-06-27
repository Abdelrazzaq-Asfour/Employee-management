import React from 'react';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import NoMatch from './pages/noMatch/NoMatch'; // ✅ المسار الصحيح
import PostUser from './pages/employee/PostUser';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/employee' element={<PostUser />} />
        <Route path='*' element={<NoMatch />} /> 
        <Route path="/add-employee" element={<PostUser />} />
      </Routes>
    </>
  );
}

export default App;
