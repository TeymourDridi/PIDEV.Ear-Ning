import React,{useState,useEffect} from "react";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import {useParams} from "react-router"
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import './Evenement.css'
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import Typography from "@mui/material/Typography";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;



const Image = styled.img`
  height: 300px;
  width: 300px;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Evenementdetails = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    const {id}=useParams()
    const [item,setEvent] = useState({});

    const [events,setEventsScrap]=useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/Events").then((data)=>{
            console.log(data.data)
            setEventsScrap(data.data)
        })
         axios.get('http://localhost:5000/api/event/' + id)
        .then(function (res) {
          setEvent(res.data);
            console.log("data", res.data);
        })
    },[])

    return (



          <div style={{background: "rgba(60,13,153)"}}>
          <br/>
          <div className="container-fluid">
              <section className="tm-mb-1" id="about">
                  <div className="tm-row tm-about-row">
                  <div className="tm-section-1-l">
                  <div className="Evenement">



                <Box sx={{ width: "100%", padding: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <div className="gmap_canvas">
            <iframe width="600" height="1900" id="gmap_canvas"
                    src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAxnpJrYBihVNw5Mw7Duwu_Yq2dND2u_m8&q=" + item.Address}
                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>                    </div>
        </Grid>
      </Box></div>
                </div>
                      <article className="tm-section-1-r tm-bg-color-8">
                          <h2 className="tm-mb-2 tm-title-color">{item.nom}</h2>
                          <p></p>
                          <img

          src={item?.picture}
          alt="#"
          style={{ width: "80%", height: "60%", borderRadius:"10px" }}
        />
                          <p style={{color:"darkblue", fontWeight:'bold'}} >Description : {item.description}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>type :  {item.type}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>nbrpalacedispo : {item.nbrpalacedispo}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>Phone : {item.Phone}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>Address : {item.Address}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>DateDebut : {moment(item.DateDebut).format('MMMM d, YYYY')}</p>
                          <p style={{color:"darkblue", fontWeight:'bold'}}>DateFin : {moment(item.DateFin).format('MMMM d, YYYY')}</p>

                      </article>
                  </div>
              </section>
              </div>
              <Box sx={{ maxWidth: 1400, flexGrow: 1 }}>
              <h1 style={{textAlign:'center', marginTop:'25px', color:'white', marginBottom:'50px'}}>Best events in france: </h1>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >

          <Typography>{events[activeStep]?.location}</Typography>
        </Paper>

        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {events.map((step, index) => (
            <div key={step._id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <>
                  <img
                    src={step.img}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />
                  {events[index+1] ?
                  <img

                    src={events[index+1].img}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />:<img

                  src={events[0].img}
                  alt="#"
                  style={{
                    width: "30%",
                    height: "300px",
                    borderRadius: "20px",
                    marginLeft:"15px"
                  }}
                />
}

{events[index+2] ?
                  <img
                    src={events[index+2].img}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />:<img
                  src={events[1].img}
                  alt="#"
                  style={{
                    width: "30%",
                    height: "300px",
                    borderRadius: "20px",
                    marginLeft:"15px"
                  }}
                />
}
                  <br />
                  <span style={{color:'white'}}>{step.fest_name}</span>

                </>
              ) : null}
            </div>
          ))}

        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={events?.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === events?.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        </Box>
      </div>

    );
};

export default Evenementdetails;
