
import SigninPage from './pages/signin.page';
import SignupPage from './pages/signup.page';
import BlogCreatePage from './pages/blog_create.page';
import BlogListPage from './pages/blog_list.page';
import BlogCommentPage from './pages/blog_comment.page';
import ProfilePage from './pages/profile.page';
import UpdateBlogPage from './pages/update_blog.page';
import GetProfile from './pages/get_profile.page';
import Openblog from './pages/open.blog';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import './App.css';

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
          <Route path="blog-comment" element={<BlogCommentPage/>}/>
          <Route path="postprofile" element={<ProfilePage/>}/>
          <Route path="update-blog" element={<UpdateBlogPage/>}/>
          <Route path="profilepage" element={<GetProfile/>}/>
          <Route path="openblog" element={<Openblog/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
