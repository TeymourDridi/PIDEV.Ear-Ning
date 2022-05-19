import React from "react";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment"
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initial = {
  title: "",
  description: "",
  images: "",
  startdate: "",
  enddate: "",
  phonenumber: null,
  meetlink: "",
  invitedUsers: [],
};
export default function Calendar() {
  const [events, setEvenements] = React.useState([]);
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [eventForm, setEventForm] = React.useState({
    title: "",
    description: "",
    images: "",
    startdate: "",
    enddate: "",
    phonenumber: null,
    meetlink: "",
    invitedUsers: [],
  });
  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect( () => {
     fetchData();
  }, []);
  async function fetchData() {
    let arr = [];
    let res = await fetch("http://127.0.0.1:5000/api/event/")
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          data &&
            data.map((ev) => {
              console.log(ev);
              let obj = {
                title: ev.nom,
                description: ev.description,
                start: new Date(ev.DateDebut),
                end: new Date(ev.DateFin),
                color: "red",
              };
              arr.push(obj);
            });
          setEvenements(arr);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setEventForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEventClick = (info) => {
    //  //event click
    //  history.push(`/events/${info.event.id}`)
  };
  const handleEventdateClick = (info) => {
    setOpen(true);
    setEventForm((prevState) => ({
      ...prevState,
      startdate: info.dateStr,
    }));
    setEventForm((prevState) => ({
      ...prevState,
      enddate: info.dateStr,
    }));
  };
  const handleEventAdd = () => {
    try {
      // api.post('/event/events', eventForm)
      // getAllEvents().then(res =>{
      //   dispatch(dispatchGetAllEvents(res))
      // })
    } catch (err) {
      console.log(err);
    }
    setEventForm(initial);
    setOpen(false);
  };
  return (
    <div className="productList">
      {console.log(events)}
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridWeek,dayGridMonth",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        weekends
        businessHours={true}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleEventdateClick}
        plugins={[
          interactionPlugin,
          momentPlugin,
          timeGridPlugin,
          dayGridPlugin,
        ]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Ajouter un évenement</h2>
          <p id="simple-modal-description"></p>

          <input
            type="text"
            class="form-control"
            name="title"
            placeholder="Titre de l'évenement"
            value={eventForm.title}
            onChange={handleChangeEvent}
          />
          <textarea
            class="form-control"
            name="description"
            rows="3"
            placeholder="Description de l'évenement"
            value={eventForm.description}
            onChange={handleChangeEvent}
          />
          <input
            type="file"
            class="form-control"
            name="images"
            onChange={handleChangeEvent}
          />
          <div class="row">
            <label class="col-sm-2 col-form-label">+216</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="phonenumber"
                placeholder="numéro de téléphone"
                value={eventForm.phonenumber}
                onChange={handleChangeEvent}
              />
            </div>
          </div>
          <input
            type="text"
            class="form-control"
            name="meetlink"
            placeholder="lien du meeting"
            value={eventForm.meetlink}
            onChange={handleChangeEvent}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleEventAdd(e)}
          >
            Ajouter
          </Button>
        </div>
      </Modal>
    </div>
  );
}
