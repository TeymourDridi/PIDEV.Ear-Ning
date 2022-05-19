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
import FrontRouter from "./FrontRouter";



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


const Router = () => (
    <BrowserRouter>


        <Routes>

            {/*<Route exact path="/" element={<><Intro/><IntoShape/><Feature/><FeatureShape/></>}/>
            <Route exact path="/karaoke" element={<FullVideo id="full"/>}/>
            <Route exact path="/emotion" element={<EmotionCamera/>}/>
            <Route exact path="/marketplace" element={<Home/>}/>
            <Route exact path="/products" element={<ProductList/>}/>
            <Route exact path="/products/:category" element={<ProductList/>}/>
            <Route exact path="/product/:id" element={<Product/>}/>
            <Route exact path="/Course" element={<Course/>}/>*/}

            <Route exact path="/*" element={<FrontRouter/>}/>
            <Route  path="/back/*" element={<App/>}/>


        </Routes>
    </BrowserRouter>
);
export default Router;
