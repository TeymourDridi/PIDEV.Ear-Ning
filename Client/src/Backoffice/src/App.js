import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/userList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import React from "react";
import NewCourse from "./pages/NewCourse/NewCourse";
import Course from "./pages/Course/Course";
import CourseList from "./pages/CourseList/CourseList";
import Calendar from "./pages/Calendar/Calendar";
import Stats from "./pages/Stats/Stats";
import AddEvenement from "./pages/AddEvent/NewEvent";



function App() {
  return (
    <div>
      <Topbar />

      <div className="contTback">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home/>}/>


          <Route path="/users" element={<UserList />}/>


          <Route path="/user/:userId" element={<User />}/>


          <Route path="/newUser" element={<NewUser />}/>


          <Route path="/products" element={<ProductList />}/>

          <Route path="/courses" element={<CourseList />}/>


          <Route path="/product/:productId" element={<Product />}/>

          <Route path="/course/:courseId" element={<Course />}/>


          <Route path="/newproduct" element={<NewProduct />}/>

          <Route path="/newcourse" element={<NewCourse />}/>

          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/newEvent" element={<AddEvenement />}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
