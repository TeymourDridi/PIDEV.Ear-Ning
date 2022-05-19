import React, {useEffect, useState} from "react";
import Instrum from "../../img/Lesson.jpg";
import Karaoke from "../../img/sky.jpg";
import {useParams} from "react-router-dom";
import axios from "axios";
import {publicRequest} from "../MarketPlace/requestMethods";

const Lesson = () => {
    const {lessonId} = useParams()
    const {type}= useParams()
    const [lesson,setLesson]=useState({videoLink:"https://www.youtube.com/embed/U_k5xNlFofw"})

    useEffect(  () => {
        console.log(type)
let url="/course/find/beg/"
        if(type==="med"){
            url="/course/find/med/"
        }else if(type==="adv"){
            url="/course/find/adv/"
        }
        publicRequest.get(url + lessonId)
            .then((response) => {

                setLesson(response.data)


            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });


    },[])



    return(

        <div style={{ height:'700px',width:'1349px', backgroundImage: `url(${Instrum})`,backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat' }}>

            <iframe style={{marginLeft:'30%',marginTop:'10%'}} width="560" height="315" src= {lesson.videoLink}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen ='true'></iframe>

        </div>



);
};

export default Lesson;
