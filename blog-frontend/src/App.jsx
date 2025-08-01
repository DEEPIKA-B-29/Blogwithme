import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import CreateBlog from "./Pages/CreateBlog";
import Admin from "./Pages/Admin";
import Newsletter from "./Components/Newsletter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/newsletter" element={<Newsletter />} />
    </Routes>
  );
  
};

export default App;
