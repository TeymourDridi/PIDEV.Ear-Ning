import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Evenement from "./Evenement";
import { popularProducts } from "../data";
import Grid from "@mui/material/Grid";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { mobile } from "../responsive";
import { useTheme } from "@mui/material/styles";

import MobileStepper from "@mui/material/MobileStepper";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  width: 170px;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
export default function Evenements() {
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
  const [Evenements, setEvenements] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoadedd, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  async function fetchData() {
    const response = await fetch("http://127.0.0.1:5000/api/event/")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setEvenements(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  async function fetchDataUpcoming() {
    const response = await fetch(
      "http://localhost:5000/api/event/upcomingEvent/ev"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUpcomingEvents(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  useEffect( () => {
     fetchData();
     fetchDataUpcoming();
    setIsLoaded(!isLoadedd);
  }, []);
  const handleSearch = async (event) => {
    const { value } = event.target;
    if (value !== "") {
      await fetch(`http://127.0.0.1:5000/api/event/search/${value}`)
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setEvenements(data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  };
  return (
    <div style={{ paddingLeft: "5%" }}>

      <SearchContainer>
        <Input
          placeholder="Search"
          style={{ outline: "none" }}
          onChange={(event) => handleSearch(event)}
        />
        <Search style={{ color: "gray", fontSize: 16 }} />
      </SearchContainer>
      <Box sx={{ width: "100%", padding: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Evenements.map((item) => (
            <Grid item xs={3}>
              <Evenement
                item={item}
                key={item._id}
                setEvenements={setEvenements}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <h1 style={{textAlign:'center', marginTop:'25px'}}>Upcoming Events</h1>
      <Box sx={{ maxWidth: 1200, flexGrow: 1 }}>
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

          <Typography>{upcomingEvents[activeStep]?.Address}</Typography>
        </Paper>

        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {upcomingEvents.map((step, index) => (
            <div key={step._id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <>
                  <img
                    crossOrigin="anonymous"
                    src={step.picture}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />
                  {upcomingEvents[index+1] ?
                  <img
                    crossOrigin="anonymous"
                    src={upcomingEvents[index+1].picture}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />:<img
                  crossOrigin="anonymous"
                  src={upcomingEvents[0].picture}
                  alt="#"
                  style={{
                    width: "30%",
                    height: "300px",
                    borderRadius: "20px",
                    marginLeft:"15px"
                  }}
                />
}

{upcomingEvents[index+2] ?
                  <img
                    crossOrigin="anonymous"
                    src={upcomingEvents[index+2].picture}
                    alt="#"
                    style={{
                      width: "30%",
                      height: "300px",
                      borderRadius: "20px",
                      marginLeft:"15px"
                    }}
                  />:<img
                  crossOrigin="anonymous"
                  src={upcomingEvents[1].picture}
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
                  {step.description}
                </>
              ) : null}
            </div>
          ))}

        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={upcomingEvents?.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === upcomingEvents?.length - 1}
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
}
