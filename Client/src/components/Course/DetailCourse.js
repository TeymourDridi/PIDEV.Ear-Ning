
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from "react";
import axios from "axios";
import {number} from "prop-types";
import { Link } from "react-router-dom";

import './DetailCourse.scss'
import {publicRequest} from "../MarketPlace/requestMethods";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography style={{fontWeight: 'bold'}}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}



const DetailCourse = (props) => {
    const [value, setValue] = React.useState(0);
    const [beginner, setBeginner] = React.useState([]);
    const [medium, setMedium] = React.useState([]);
    const [advanced,setAdvanced] = React.useState([]);
    const [descriptiontab,setDescriptionTab] = React.useState([]);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    useEffect(()=>{




        publicRequest.post(`/course/finds/begs`,props.course.beginner)
            .then((response) => {

                setBeginner(response.data)
                console.log("response");
                //console.log(res);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });

        publicRequest.post(`/course/finds/meds`,props.course.medium)
            .then((response) => {

                setMedium(response.data)
                console.log("response");
                //console.log(res);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });

        publicRequest.post(`/course/finds/advs`,props.course.advanced)
            .then((response) => {

                setAdvanced(response.data)
                console.log("response");
                //console.log(res);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });

setDescriptionTab(props.course.description.split(' '))

    },[])




    return (
        <div /*style={{backgroundColor:'#FBFBFB'}}*/ >
<div id="bigcontTT">
            <div  onClick={()=>props.details(true)} id="containerTT">
                <button className="learn-moreTT">
    <span className="circleTT" aria-hidden="true">
      <span className="iconTT arrowTT"></span>
    </span>
                    <span className="button-textTT"></span>
                </button>
            </div>
</div>

     <div style={{marginLeft:'7%',marginTop:'1%',width:'250px',height:'300px'}}>

         <img  style={{width:'100%',height:'100%'}}
      src={props.course.imgLink}/>

     </div>


<div id="nameTT" style={{marginLeft:'25%',marginTop:'-50%'}}>

            <svg width='600' height='200'>
                <filter id='money'>
                    <feMorphology in='SourceGraphic' operator='dilate' radius='2' result='expand'/>

                    <feOffset in='expand' dx='1' dy='1' result='shadow_1'/>
                    <feOffset in='expand' dx='2' dy='2' result='shadow_2'/>
                    <feOffset in='expand' dx='3' dy='3' result='shadow_3'/>
                    <feOffset in='expand' dx='4' dy='4' result='shadow_4'/>
                    <feOffset in='expand' dx='5' dy='5' result='shadow_5'/>
                    <feOffset in='expand' dx='6' dy='6' result='shadow_6'/>
                    <feOffset in='expand' dx='7' dy='7' result='shadow_7'/>

                    <feMerge result='shadow'>
                        <feMergeNode in='expand'/>
                        <feMergeNode in='shadow_1'/>
                        <feMergeNode in='shadow_2'/>
                        <feMergeNode in='shadow_3'/>
                        <feMergeNode in='shadow_4'/>
                        <feMergeNode in='shadow_5'/>
                        <feMergeNode in='shadow_6'/>
                        <feMergeNode in='shadow_7'/>
                    </feMerge>

                    <feFlood flood-color='#ebe7e0'/>
                    <feComposite in2='shadow' operator='in' result='shadow'/>

                    <feMorphology in='shadow' operator='dilate' radius='1' result='border'/>
                    <feFlood flood-color='#35322a' result='border_color'/>
                    <feComposite in2='border' operator='in' result='border'/>

                    <feOffset in='border' dx='1' dy='1' result='secondShadow_1'/>
                    <feOffset in='border' dx='2' dy='2' result='secondShadow_2'/>
                    <feOffset in='border' dx='3' dy='3' result='secondShadow_3'/>
                    <feOffset in='border' dx='4' dy='4' result='secondShadow_4'/>
                    <feOffset in='border' dx='5' dy='5' result='secondShadow_5'/>
                    <feOffset in='border' dx='6' dy='6' result='secondShadow_6'/>
                    <feOffset in='border' dx='7' dy='7' result='secondShadow_7'/>
                    <feOffset in='border' dx='8' dy='8' result='secondShadow_8'/>
                    <feOffset in='border' dx='9' dy='9' result='secondShadow_9'/>
                    <feOffset in='border' dx='10' dy='10' result='secondShadow_10'/>
                    <feOffset in='border' dx='11' dy='11' result='secondShadow_11'/>

                    <feMerge result='secondShadow'>
                        <feMergeNode in='border'/>
                        <feMergeNode in='secondShadow_1'/>
                        <feMergeNode in='secondShadow_2'/>
                        <feMergeNode in='secondShadow_3'/>
                        <feMergeNode in='secondShadow_4'/>
                        <feMergeNode in='secondShadow_5'/>
                        <feMergeNode in='secondShadow_6'/>
                        <feMergeNode in='secondShadow_7'/>
                        <feMergeNode in='secondShadow_8'/>
                        <feMergeNode in='secondShadow_9'/>
                        <feMergeNode in='secondShadow_10'/>
                        <feMergeNode in='secondShadow_11'/>
                    </feMerge>

                    <feImage x='0' y='0' width='600' height='200' href='https://s3-us-west-2.amazonaws.com/s.cdpn.io/78779/stripes.svg'/>
                    <feComposite in2='secondShadow' operator='in' result='secondShadow'/>

                    <feMerge>
                        <feMergeNode in='secondShadow'/>
                        <feMergeNode in='border'/>
                        <feMergeNode in='shadow'/>
                        <feMergeNode in='SourceGraphic'/>
                    </feMerge>
                </filter>

                <text dominantBaseline='middle' text-anchor='middle' x='50%' y='50%'>
                    {props.course.name} Course
                </text>
            </svg>

</div>


<div className="main-containerDTT" style={{marginLeft:'39%',padding:'25px'}}>
    <div className="first-container share">
        <h1 id="descDTT">

            {descriptiontab.map((e)=> <span>{e}</span>)}
        </h1>
    </div>

</div>



            {/*<h5 style={{marginLeft:'39%',padding:'50px'}}
            >{props.course.description}</h5>*/}


            <Box style={{marginLeft:'39%',marginTop:'10%',backgroundColor:'#FBFBFB'}}
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab style={{fontWeight: 'bold'}} label="Beginner" {...a11yProps(0)} />
                    <Tab style={{fontWeight: 'bold'}} label="Medium" {...a11yProps(1)} />
                    <Tab style={{fontWeight: 'bold'}} label="Advanced" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0}>
                    <ul>
                    { beginner.map((e)=>
                        <Link to={"../course/beg/" + e._id}>
                        <li style={{fontWeight: 'bold'}}>{e.name} </li>
                        </Link>
                            )}
                    </ul>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    { medium.map((e)=>
                        <Link to={"../course/med/" + e._id}>
                            <li style={{fontWeight: 'bold'}}>{e.name} </li>
                        </Link>
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    { advanced.map((e)=>
                        <Link to={"../course/adv/" + e._id}>
                            <li style={{fontWeight: 'bold'}}>{e.name} </li>
                        </Link>
                    )}
                </TabPanel>


            </Box>

        </div>
    );
};

export default DetailCourse;
