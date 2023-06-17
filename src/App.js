import React from 'react';
import Navbar from './components/user/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';
import SingleMovie from "./components/user/SingleMovie";
import SingleTv from "./components/user/SingleTv";
import MovieReviews from "./components/user/MovieReviews";
import SearchMovies from "./components/user/SearchMovies";
import MovieReviewsTv from "./components/user/MovieReviewsTv";


export default function App() {
  const {authInfo }= useAuth()
  const isAdmin = authInfo.profile?.role === 'admin'
  

  if(isAdmin) return <AdminNavigator />

  return (
    <>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/SignUp' element={<SignUp/>} />
          <Route path='/auth/SignIn' element={<SignIn/>} />
          <Route path='/auth/verification' element={<EmailVerification />} />
          <Route path='/auth/forget-password' element={<ForgetPassword />} />
          <Route path='/auth/reset-password' element={<ConfirmPassword/>} />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
          <Route path="/tv/:movieId" element={<SingleTv />} />
          <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
          <Route path="/movie/reviewstv/:movieId" element={<MovieReviewsTv />} />
          <Route path="/movie/search" element={<SearchMovies />} />
          <Route path='*' element={<NotFound/>} />
        
      </Routes>
     
    </>
  );
}
