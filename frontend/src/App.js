import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // import your Navbar
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import PostGrid from './components/PostGrid';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import AiPostGenerator from './components/AiPostGenerator';
const App = () => {
  return (
    <>
      <Navbar />  {/* Navbar visible on all pages */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/posts" element={<PostGrid />} />
        <Route path="/profile/:userId" element={<UserProfile/>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/ai-generator" element={<AiPostGenerator />} /> {/* <-- new route */}
      </Routes>
    </>
  );
};

export default App;
