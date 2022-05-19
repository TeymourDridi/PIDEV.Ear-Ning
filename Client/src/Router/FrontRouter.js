import React from 'react';
import { Route, Switch, BrowserRouter,Routes } from 'react-router-dom';
import FullVideo from "../components/Videoplayer/FullVideo";
import Intro from "../components/Intro/Intro";
import styled, {css} from "styled-components";
import Feature from "../components/Feature/Feature";
import EmotionCamera from "../components/EmotionCamera/EmotionCamera";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/MarketPlace/pages/Home"
import ProductList from "../components/MarketPlace/pages/ProductList";
import Product from "../components/MarketPlace/pages/Product"
import Course from "../components/Course/Course";
import App from "../Backoffice/src/App";
import Cart from "../components/MarketPlace/pages/Cart";

import Evenement from "../components/Evenement/Evenement";
import Evenementdetails from "../components/Evenement/components/Evenementdetails";
import Success from "../components/MarketPlace/pages/Success";
import Login from "../components/MarketPlace/pages/Login";
import Lesson from "../components/Course/Lesson";
import CourseList from "../components/Course/courseList";
import Footer from "../components/Footer/Footer";



const Shape = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const IntoShape = styled.div`
  ${Shape}
  clip-path: polygon(67% 0, 100% 0%, 100% 100%, 55% 100%);
  background-color: crimson;
`;
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;
const FeatureShape = styled.div`
  ${Shape}
  clip-path: polygon(0 0, 55% 0%, 33% 100%, 0 100%);
  background-color: pink;
`;

const ServiceShape = styled.div`
  ${Shape}
  clip-path: polygon(0 0, 33% 0%, 33% 100%, 0 100%);
  background-color: #f88497;
`;

const PriceShape = styled.div`
  ${Shape}
  clip-path: polygon(33% 0, 100% 0%, 100% 100%, 67% 100%);
  background-color: crimson;
`;


const FrontRouter = () => (
    <div>
        <Navbar/>

        <Routes>

            <Route exact path="/" element={<><Intro/><IntoShape/><Feature/><FeatureShape/></>}/>
            <Route exact path="/karaoke" element={<FullVideo id="full"/>}/>
            <Route exact path="/emotion" element={<EmotionCamera/>}/>
            <Route exact path="/marketplace" element={<Home/>}/>
            <Route exact path="/products" element={<ProductList/>}/>
            <Route exact path="/products/:category" element={<ProductList/>}/>
            <Route exact path="/product/:id" element={<Product/>}/>
            <Route exact path="/Course" element={<Course/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="/evenement" element={<Evenement/>}/>
            <Route exact path="/Evenementdetails/:id" element={<Evenementdetails/>}/>
            <Route  path="/Course/:type/:lessonId" element={<Lesson/>}/>
            <Route exact path="/success" element={<Success/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/courseList" element={<CourseList/>}/>

        </Routes>
        <Footer/>
    </div>
);
export default FrontRouter;
