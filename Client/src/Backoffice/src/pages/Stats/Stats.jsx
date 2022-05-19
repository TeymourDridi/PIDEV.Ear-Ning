import React from "react";
import "./Stats.css";
import 'chart.js/auto';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Bar, Line, Pie } from 'react-chartjs-2';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

  },
  paperElements: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary
  },
  paperHeader: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: '25px',
    fontWeight: 'bold'
  },
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
export default function Stats() {
  const [stats, setstats] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect( () => {
     fetchData();
  }, []);
  async function fetchData() {
    let arr = [];
    let res = await fetch("http://127.0.0.1:5000/api/event/stats/ev")
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setstats(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  const classes = useStyles();
  const drawChart = (stats) => {
    console.log(stats)
    const data =  {
      labels: stats.map((s)=>s.nom),
      datasets: [{
          label: '# of Votes',
          data: stats.map((s)=>s.nbrpalacedispo),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }
  return data;
  };

  return (
    <div className="productList" >
       <Paper className={classes.paper} >
                  <h4 class="card-title mb-0">Statistiques</h4>
                  <Pie data={drawChart(stats)}/>
                  </Paper>

    </div>
  );
}
