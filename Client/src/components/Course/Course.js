import React, {useEffect, useState} from "react";
import {FlippingCardBack, FlippingCardFront, FlippingCard} from 'react-ui-cards';
import axios from "axios";
import './Course.css';
import CourseImg from "../../img/cc2.jpg";
import { Link } from "react-router-dom";
import DetailCourse from "./DetailCourse";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../MarketPlace/redux/cartRedux";
import {addCourseProduct} from "../MarketPlace/redux/cartCourseRedux";
import CourseList from "./courseList";
import {publicRequest} from "../MarketPlace/requestMethods";

const Course = () => {
    const [courses,setCourses]=useState([])
    const [course,setCourse]=useState()
    const [details,setDetails]=useState(true)
    const [de,setDe]=useState(true)
    const dispatch = useDispatch();
    let quant=useSelector((state)=>state.cartCourse.quantity)


    const quantity=1
    const handleClick = (course) => {
        dispatch(
            addCourseProduct({ ...course,quantity})
        );

    };
    function search(name){
        let url='/course/search/'+name

        publicRequest.get(url)
            .then((response) => {
                for(let i=0 ;i<response.data.length;i++) {
                    response.data[i].id = response.data[i]._id
                    response.data[i].beginner2=response.data[i].beginner.length;
                    response.data[i].medium2=response.data[i].medium.length;
                    response.data[i].advanced2=response.data[i].advanced.length;
                    response.data[i].prix2=response.data[i].prix.substr(0,response.data[i].prix.length-1);
                }
                setCourses(response.data)


            })
            .catch((e) => {
                publicRequest.get(`/course/`)
                    .then((response) => {
                        for(let i=0 ;i<response.data.length;i++) {
                            response.data[i].id = response.data[i]._id
                            response.data[i].beginner2=response.data[i].beginner.length;
                            response.data[i].medium2=response.data[i].medium.length;
                            response.data[i].advanced2=response.data[i].advanced.length;
                            response.data[i].prix2=response.data[i].prix.substr(0,response.data[i].prix.length-1);
                        }
                        setCourses(response.data)


                    })
                    .catch((e) => {

                    });
            });
    }

    useEffect(()=>{

        publicRequest.get(`/course/`)
            .then((response) => {
                for(let i=0 ;i<response.data.length;i++) {
                    response.data[i].id = response.data[i]._id
                    response.data[i].beginner2=response.data[i].beginner.length;
                    response.data[i].medium2=response.data[i].medium.length;
                    response.data[i].advanced2=response.data[i].advanced.length;
                    response.data[i].prix2=response.data[i].prix.substr(0,response.data[i].prix.length-1);

                }
                setCourses(response.data)


            })
            .catch((e) => {

            });

    },[])


    return (
<div id="CourseFront">


    <div className="container-fluid" >

        <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a href="" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold"><span
                        className="text-primary font-weight-bold border px-3 mr-1">Courses</span></h1>
                </a>
            </div>
            <div className="col-lg-6 col-6 text-left">
                <form action="">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for products"/>
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                            </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-3 col-6 text-right">
                <a  className="btn border">
                    <i className="fas fa-heart text-primary"></i>
                    <span className="badge">0</span>
                </a>
              <Link to="/courseList">  <a  className="btn border">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span className="badge">{quant}</span>
              </a></Link>
            </div>
        </div>
    </div>





    {/*âge header*/}
    <div className="container-fluid bg-secondary mb-5" style={{ backgroundImage: `url(${CourseImg})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight:'300px'}} >
            <h1 className="font-weight-semi-bold text-uppercase mb-3" style={{color:'white',fontFamily: '"Monoton" ,cursive',fontSize:'60px'}} >Our Courses</h1>
            <div className="d-inline-flex">
                {/*<p className="m-0"><a href="">Home</a></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Shop</p>*/}
            </div>
        </div>
    </div>


    {/*Shop Start*/}
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">

            <div className="col-lg-3 col-md-12">

                <div className="border-bottom mb-4 pb-4">
                    <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                    <form>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" checked id="price-all"/>
                                <label className="custom-control-label" htmlFor="price-all">All Price</label>
                                <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-1"/>
                                <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                                <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-2"/>
                                <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                                <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-3"/>
                                <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                                <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-4"/>
                                <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                                <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="price-5"/>
                                <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                                <span className="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>

                <div className="border-bottom mb-4 pb-4">
                    <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                    <form>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" checked id="color-all"/>
                                <label className="custom-control-label" htmlFor="price-all">All Color</label>
                                <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-1"/>
                                <label className="custom-control-label" htmlFor="color-1">Black</label>
                                <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-2"/>
                                <label className="custom-control-label" htmlFor="color-2">White</label>
                                <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-3"/>
                                <label className="custom-control-label" htmlFor="color-3">Red</label>
                                <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-4"/>
                                <label className="custom-control-label" htmlFor="color-4">Blue</label>
                                <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="color-5"/>
                                <label className="custom-control-label" htmlFor="color-5">Green</label>
                                <span className="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>

                <div className="mb-5">
                    <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                    <form>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" checked id="size-all"/>
                                <label className="custom-control-label" htmlFor="size-all">All Size</label>
                                <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-1"/>
                                <label className="custom-control-label" htmlFor="size-1">XS</label>
                                <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-2"/>
                                <label className="custom-control-label" htmlFor="size-2">S</label>
                                <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-3"/>
                                <label className="custom-control-label" htmlFor="size-3">M</label>
                                <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-4"/>
                                <label className="custom-control-label" htmlFor="size-4">L</label>
                                <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="size-5"/>
                                <label className="custom-control-label" htmlFor="size-5">XL</label>
                                <span className="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>

            </div>

            <div className="col-lg-9 col-md-12">
                {details ?
                <div className="row pb-3"
                     >
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search by name" onChange={(e)=>search(e.target.value)}/>
                                        <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                        </div>
                                </div>
                            </form>
                            <div className="dropdown ml-4">
                                <button className="btn border dropdown-toggle" type="button" id="triggerId"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Sort by
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                    <a className="dropdown-item" href="#">Latest</a>
                                    <a className="dropdown-item" href="#">Popularity</a>
                                    <a className="dropdown-item" href="#">Best Rating</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {courses.map((c)=>(
                    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">

                            <FlippingCard>
                                <FlippingCardBack >
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">{c.name} Course</h6>
                                        <h6 className="text-truncate mb-3">{c.description}</h6>
                                        <h6 className="text-truncate mb-3">{c.beginner2} Beginner lessons</h6>
                                        <h6 className="text-truncate mb-3">{c.medium2} Medium lessons</h6>
                                        <h6 className="text-truncate mb-3">{c.advanced2} Advanced lessons</h6>
                                        <div className="d-flex justify-content-center">

                                            <h6>{c.prix}</h6>

                                        </div>
                                    </div>
                                        <div className="card product-item border-0 mb-4">

                                    <div className="card-footer d-flex justify-content-between bg-light border">

                                        <a  className="btn btn-sm text-dark p-0" onClick={(e)=>{setCourse(c);setDetails(false)}}><i
                                            className="fas fa-eye text-primary mr-1"></i>View <br/> Detail</a>

                                        <a  className="btn btn-sm text-dark p-0"  onClick={(e)=>{handleClick(c)}}><i
                                            className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                        </div>


                                </FlippingCardBack>

                                <FlippingCardFront >
                                    <div className="card product-item border-1" style={{width:'100%',height:'90%'}}>
                                    <img style={{width:'100%',height:'100%'}}  src={c.imgLink} alt=""  />
                                   <p id="priceT" style={{marginTop:'-120%'}}>{c.prix}</p>
                                    </div>
                                </FlippingCardFront>

                            </FlippingCard>

                    </div>
                        ))}


                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>:
                <DetailCourse
                    details={(e)=>setDetails(e)}
                course={course}
                />
                }
            </div>

        </div>
    </div>



    <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>





</div>















    );
};

export default Course;
