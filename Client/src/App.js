import React, {useState} from 'react';
import './App.css';
import styled, {css} from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Feature from "./components/Feature/Feature";
import FullVideo from "./components/Videoplayer/FullVideo";
import Router from './Router/Router'
import {useSelector} from "react-redux";
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

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

const App = () => {
    const user = useSelector(state =>state.user.currentUser);
    console.log("current user ",user);
    const smallScreen = window.screen.width <= 480 ? true : false;
    return (
        <>


            <Router/>



        </>
    );
};

export default App;

