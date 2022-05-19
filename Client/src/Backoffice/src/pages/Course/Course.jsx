import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./course.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import axios from "axios";
import NewCourse from "../NewCourse/NewCourse";
import {publicRequest} from "../../../../components/MarketPlace/requestMethods";



export default function Course() {
    const {courseId} = useParams()
    const [course,setCourse]=useState(null)
    useEffect(  () => {
        publicRequest.get(`/course/find/` + courseId)
            .then((response) => {

                setCourse(response.data)


            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });
    },[])




  return (
    <div className="product">

      <div className="productTitleContainer">
        <h1 className="productTitle">Course</h1>
        <Link to="../../back/newcourse">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img  src={course ? course.imgLink :null} alt={course ? course.imgLink :null} className="productInfoImg" />
                  <span className="productName">{course ? course.name :null}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{course ? course._id:null}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">description:</span>
                      <span className="productInfoValue">{course ? course.description:null}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Beginner Lessons :</span>
                      <span className="productInfoValue">{course ? course.beginner.length:null}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Medium Lessons :</span>
                      <span className="productInfoValue">{course ? course.medium.length:null}</span>
                  </div>
                   <div className="productInfoItem">
                      <span className="productInfoKey">Advanced Lessons :</span>
                      <span className="productInfoValue">{course ? course.advanced.length:null}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <div className="productForm">
              <div className="productFormLeft">
                  {/*<label>{course ? course.name:null} Course</label>*/}

<NewCourse
    upid={course ? course._id:null}
    upname={course ? course.name:null}
    upimgLink={course ? course.imgLink:null}
    upprix={course ? course.prix:null}
    updescription={course ? course.description:null}
    upbeginner={course ? course.beginner:null}
    upmedium={course ? course.medium:null}
    upadvanced={course ? course.advanced:null}
/>

              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img  src={course ? course.imgLink :null} alt="" className="productUploadImg" />


                  </div>

              </div>
          </div>
      </div>
    </div>
  );
}
