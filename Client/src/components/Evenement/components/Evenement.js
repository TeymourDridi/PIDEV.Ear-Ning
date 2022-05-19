import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import * as moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Evenement = ({ item, setEvenements }) => {

  const [expanded, setExpanded] = React.useState(false);
  const [nbr, setNbrePlaces] = React.useState(0)
  const handleUnlike =  () => {

     fetch(
      `http://localhost:5000/api/event/dislikeevenementModel/${item._id}`,
      {
        method: "PUT",
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setEvenements(data)
        },
        (error) => {}
      );
  };
  async function fetchAllEvents() {
    const response = await fetch("http://127.0.0.1:5000/api/event/")
      .then((res) => res.json())
      .then(
        (data) => {
          setEvenements(data);
        },
        (error) => {
        }
      );
  }
  const handleLike =  () => {

     fetch(
      `http://localhost:5000/api/event/likeevenementModel/${item._id}`,
      {
        method: "PUT",
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setEvenements(data)
        },
        (error) => {}
      );
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const handleReserve = async(e, idev) => {
 await fetch(
    `http://127.0.0.1:5000/api/event/reserver/ev`,
    {
      body:JSON.stringify({
        eventId: idev,
        nbePlaces: nbr
      }),
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Adding headers to the request
    }
  )
  fetchAllEvents();
    alert("Evenement reservé avec success")
}
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Link
          to={"/Evenementdetails/" + item._id}
          onClick={() =>
            (window.location.href = "/Evenementdetails/" + item._id)
          }
        >
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={item?.nom}
          />
        </Link>
        <p style={{ marginLeft: 10, fontWeight: "bold" }}>
         Date Début: {moment(item?.DateDebut).format("MMMM Do YYYY")}
        </p>

        <p style={{ marginLeft: 10, fontWeight: "bold" }}>
        Date Fin: {moment(item?.DateFin).format("MMMM Do YYYY")}
        </p>
        <img
          crossOrigin="anonymous"
          src={item.picture}
          alt="#"
          style={{ width: "100%", height: "100%" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item?.description}<br/>
            capacité: {item?.nbrpalacedispo}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
            {item && item.likedEvent ? (
              <ThumbDownAltIcon
                style={{ color: "red" }}
                onClick={() => handleUnlike()}
              />
            ) : (
              <ThumbUpIcon onClick={() => handleLike()} />
            )}
            <input style={{marginLeft:5,marginRight:5, borderRadius:'20px', outline:'none'}} type="number" onChange= {(e)=>setNbrePlaces(parseInt(e.target.value))}/>
            <button onClick={(e) => {handleReserve(e, item._id)}}style={{borderRadius:5,background:'green', color:'white'}}><span style={{fontWeight:'bold'}}>Réserver</span></button>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Evenement;
