import React from "react";
import styled from "styled-components";
import Woman from "../../img/Woman.png";
import AnimatedShapes from "../AnimatedShapes/AnimatedShapes";
import {Link} from "react-router-dom";


const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const Left = styled.div`
  width: 50%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 80%;
`;

const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.span`
  font-size: 70px;
  @media only screen and (max-width: 480px) {
    font-size: 50px;
  }
`;

const SubTitle = styled.span`
  font-size: 24px;
  font-style: italic;
  color: #333;
  margin-top: 30px;
`;

const Desc = styled.p`
  font-size: 20px;
  color: #777;
  margin-top: 30px;
`;

const Button = styled.button`
  width: 150px;
  border: none;
  padding: 15px 20px;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Feature = () => {
    return (
        <Container>
            <Left>
                <Image src={Woman} />
            </Left>
            <Right>
                <Title>
                    <b>Sing</b>
                    <br />
                    <b>With</b> us
                </Title>
                <SubTitle>Karaoke is a type of interactive entertainment usually offered in clubs and bars,
                    where people sing along to recorded music using a microphone.</SubTitle>
                <Desc>
                    The music is an instrumental version of a well-known popular song.
                    Lyrics are usually displayed on a video screen
                    , along with a moving symbol, changing colour, or music video images
                </Desc>
                <Desc>
                    We care your business and guarantee you to achieve marketing goals.
                </Desc>
                <Link to="/karaoke">  <Button>Karaoke</Button> </Link>


            </Right>
            <AnimatedShapes/>
        </Container>
    );
};

export default Feature;
