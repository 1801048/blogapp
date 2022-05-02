import React from 'react';
import SigninPage from './pages/signin.page';
import SignupPage from './pages/signup.page';
import BlogCreatePage from './pages/blog_create.page';
import BlogListPage from './pages/blog_list.page';

import ProfilePage from './pages/profile.page';
//import UpdateBlogPage from './pages/update_blog.page';
import GetProfile from './pages/get_profile.page';
import Openblog from './pages/open.blog';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateBlogPage from './pages/update_blog.page';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage/>}/>
          <Route path="signup" element={<SignupPage/>}/>
          <Route path="signin" element={<SigninPage/>}/>
          <Route path="create-blog" element={<BlogCreatePage/>}/>
          <Route path="blog-list" element={<BlogListPage/>}/>
          <Route path="update-blog/:id" element={<UpdateBlogPage/>}/>
          <Route path="postprofile" element={<ProfilePage/>}/>
          
          <Route path="profilepage" element={<GetProfile/>}/>
          <Route path="openblog" element={<Openblog/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
