import React, {useEffect, useState} from "react";
import "./newCourse.css";
import axios from "axios";
import {publicRequest} from "../../../../components/MarketPlace/requestMethods";



let val=false

 const NewCourse=(props)=> {
  const [n,setN]=useState(1)
  const [nMedium,setNMedium]=useState(1)
  const [nAdvanced,setNAdvanced]=useState(1)
  const [name,setName]=useState("")
  const [prix,setPrix]=useState("")
  const [imgLink,setimgLink]=useState("")
  const [description,setDescription]=useState("")
  let [advanced,setAdvanced]=useState([])
  let [medium,setMedium]=useState([])
  let [beginer,setBeginer]=useState([])
  let [bname,setBname]=useState([])
  let [bvidLink,setBvidLink]=useState([])
  let [mname,setMname]=useState([])
  let [mvidLink,setMvidLink]=useState([])
  let [aname,setAname]=useState([])
  let [avidLink,setAvidLink]=useState([])
     const[valid,setValid]=useState(false)

let x=0;
  function submit(){
      if(val) {
          for (let i = 0; i < bname.length; i++) {
              beginer.push({name: bname[i], videoLink: bvidLink[i]})


          }

          for (let i = 0; i < mname.length; i++) {
              medium.push({name: mname[i], videoLink: mvidLink[i]})
          }

          for (let i = 0; i < aname.length; i++) {
              advanced.push({name: aname[i], videoLink: avidLink[i]})
          }


          publicRequest.post('/course/', {
              name: name,
              imgLink: imgLink,
              prix:prix,
              description:description,
              beginner: beginer,
              medium: medium,
              advanced: advanced
          })
              .then((response) => {
                  console.log(response);
              })
              .catch((e) => {
                  console.log(e);
              })
      }
  }function submitUpdate(){
      if(val) {
          for (let i = 0; i < bname.length; i++) {
              beginer.push({name: bname[i], videoLink: bvidLink[i]})


          }

          for (let i = 0; i < mname.length; i++) {
              medium.push({name: mname[i], videoLink: mvidLink[i]})
          }

          for (let i = 0; i < aname.length; i++) {
              advanced.push({name: aname[i], videoLink: avidLink[i]})
          }


          publicRequest.post('/course/', {
              _id: props.upid,
              name: name,
              imgLink: imgLink,
              prix:prix,
              description:description,
              beginner: beginer,
              medium: medium,
              advanced: advanced

          })
              .then((response) => {
                  console.log(response);
              })
              .catch((e) => {
                  console.log(e);
              })
      }
  }
const beginputs= (n)=>{

  return (
      [...Array(n)].map((e, i) =>
      <div className="addProductItem">
    <span><b> Video Name Lesson {i+1}</b></span> <input type="text" defaultValue={bname[i]} onChange={(e)=> {bname[i] = e.target.value;setValid(!valid)}} placeholder="Name" />
          {bname[i] ? bname[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {bname[i]? bname[i].replaceAll(" ","").length<4 && bname[i].replaceAll(" ","").length>=1? validationname(false) :validationname(true):null}

          <span><b> Video Link Lesson {i+1}</b></span><input type="text" defaultValue={bvidLink[i]} onChange={(e)=>{bvidLink[i] = e.target.value;setValid(!valid)}} placeholder="Video link" />
          {bvidLink[i] ? bvidLink[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {bvidLink[i] ? bvidLink[i].replaceAll(" ","").length>=1 && ( bvidLink[i].replaceAll(" ","").length<15 || !bvidLink[i].match("https://www.youtube.com")) ? validationlink(false) :validationlink(true):null}

      </div>))
}

const mediuminputs= (n)=>{

  return (
      [...Array(n)].map((e, i) =>
      <div className="addProductItem">
          <span><b> Video Name Lesson {i+1}</b></span> <input type="text" defaultValue={mname[i]} onChange={(e)=> {mname[i] = e.target.value;setValid(!valid)}} placeholder="Name" />
          {mname[i] ? mname[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {mname[i]? mname[i].replaceAll(" ","").length<4 && mname[i].replaceAll(" ","").length>=1? validationname(false) :validationname(true):null}
          <span><b> Video Link Lesson {i+1}</b></span><input type="text" defaultValue={mvidLink[i]} onChange={(e)=>{mvidLink[i] = e.target.value;setValid(!valid)}} placeholder="Video link" />
          {mvidLink[i] ? mvidLink[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          { mvidLink[i] ? mvidLink[i].replaceAll(" ","").length>=1 && ( mvidLink[i].replaceAll(" ","").length<15 || !mvidLink[i].match("https://www.youtube.com")) ? validationlink(false) :validationlink(true):null}

      </div>))
}
const advancedinputs= (n)=>{

  return (
      [...Array(n)].map((e, i) =>
      <div className="addProductItem">
          <span><b> Video Name Lesson {i+1}</b></span> <input type="text" defaultValue={aname[i]} onChange={(e)=> {aname[i] = e.target.value;setValid(!valid)}} placeholder="Name" />
          {aname[i] ? aname[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {aname[i]? aname[i].replaceAll(" ","").length<4 && aname[i].replaceAll(" ","").length>=1? validationname(false) :validationname(true):null}
          <span><b> Video Link Lesson {i+1}</b></span><input type="text" defaultValue={avidLink[i]} onChange={(e)=>{avidLink[i] = e.target.value;setValid(!valid)}} placeholder="Video link" />
          {avidLink[i] ? avidLink[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          { avidLink[i] ? avidLink[i].replaceAll(" ","").length>=1 && ( avidLink[i].replaceAll(" ","").length<15 || !avidLink[i].match("https://www.youtube.com")) ? validationlink(false) :validationlink(true):null}

      </div>))
}


function validation(st){
      if(st===true && x===0) {
          val = st;
      }
      if(st===false) {
          val = st;
          x=x+1
          return (
              <span style={{color:'red'}}>This field is required</span>)
      }else{return null}
}
function validationname(st){
      if(st===true && x===0) {
          val = st;
      }
      if(st===false) {
          val = st;
          x=x+1
          return (
              <span>At least 4 character</span>)
      }else{return null}
}
     function validationlink(st,price){
         if(st===true && x===0) {
             val = st;
         }
         if(st===false && price!=="prix") {
             val = st;
             x=x+1
             return (
                 <span>Enter a Valid Link</span>)
         }else if(st===false && price==="prix") {
             val = st;
             x=x+1
             return (
                 <span>Enter a Valid price with the correct currency</span>)
         }else{return null}

     }


     //update


     useEffect(()=>{

            if(props.upbeginner){
                let b=0;

                props.upbeginner.map(t=>{
b=b+1
                    publicRequest.get(`/course/find/beg/` + t)
                        .then((response) => {

                            bname.push(response.data.name);
                            bvidLink.push(response.data.videoLink)



                        })
                        .catch((e) => {
                            console.log(e);
                            console.log("response");
                        });


                })
                if (b>1){setN(b)}
            }

         if(props.upmedium){
             let m=0;

             props.upmedium.map(t=>{
                 m=m+1;
                 publicRequest.get(`/course/find/med/` + t)
                     .then((response) => {


                         mname.push(response.data.name);
                         mvidLink.push(response.data.videoLink)



                     })
                     .catch((e) => {
                         console.log(e);
                         console.log("response");
                     });


             })

             if (m>1){setNMedium(m)}
         }

         if(props.upadvanced){
             let a=0;

             props.upadvanced.map(t=>{
                 a=a+1
                 publicRequest.get(`/course/find/adv/` + t)
                     .then((response) => {

                         aname.push(response.data.name);
                         avidLink.push(response.data.videoLink)



                     })
                     .catch((e) => {
                         console.log(e);
                         console.log("response");
                     });


             })
             if (a>1){setNAdvanced(a)}
         }

            setTimeout(()=> {
                if (props.upname) {
                    setName(props.upname)
                }
                if (props.upimgLink) {
                    setimgLink(props.upimgLink)
                }
                if (props.updescription) {
                    setDescription(props.updescription)
                }
                if (props.upprix) {
                    setPrix(props.upprix)
                }
            },1000)
         setValid(!valid)

     },[props.upbeginner])


         return (
             <div style={{marginLeft:'20%'}} className="newProduct">

                 <h1 className="addProductTitle">{name ? name.charAt(0).toUpperCase() + name.substr(1,name.length) :"New"} Course</h1>
                 <div className="addProductForm">

                     <div className="addProductItem">
                         <label>Name</label>
                         <input type="text" name="requiredField" defaultValue={props.upname}  onChange={(e) => setName(e.target.value)} placeholder="Course Name"/>

                         {name.replaceAll(" ","").length<1 ? validation(false) :validation(true)}
                         {name.replaceAll(" ","").length<4 && name.replaceAll(" ","").length>=1? validationname(false) :validationname(true)}


                     </div>
                     <div className="addProductItem">
                         <label>Image</label>
                         <input type="text" defaultValue={props.upimgLink} onChange={(e) => setimgLink(e.target.value)} placeholder="link"/>
                         {imgLink.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                         { imgLink.replaceAll(" ","").length>=1 && ( imgLink.replaceAll(" ","").length<15 || !imgLink.match("http")) ? validationlink(false) :validationlink(true)}

                     </div>

                   <div className="addProductItem">
                         <label>Prix</label>
                         <input type="text" defaultValue={props.upprix} onChange={(e) => setPrix(e.target.value)} placeholder="DT"/>
                         {prix.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                         { prix.replaceAll(" ","").length<1 ? null: !prix.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?($|\$)/) ? validationlink(false,"prix") :validationlink(true,"prix")}

                     </div>

                    <div className="addCourseDesc">
                         <label>Description</label>
                         <input type="textarea" defaultValue={props.updescription} onChange={(e) => setDescription(e.target.value)} placeholder="description"/>
                         {description.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                        {description.replaceAll(" ","").length<4 && description.replaceAll(" ","").length>=1? validationname(false) :validationname(true)}

                     </div>
                     <div className="addProductItem">
                         <label>Beginner</label>


                         {beginputs(n)}

                         <button style={{width: '10%'}} onClick={(e) => {
                             setN(n+1);

                         }}>+
                         </button>

                     </div>

                     <div className="addProductItem">
                         <label>Medium</label>


                         {mediuminputs(nMedium)}

                         <button style={{width: '10%'}} onClick={(e) => {
                             setNMedium(nMedium+1);

                         }}>+
                         </button>

                     </div>

                     <div className="addProductItem">
                         <label>Advanced</label>


                         {advancedinputs(nAdvanced)}

                         <button style={{width: '10%'}} onClick={(e) => {
                             setNAdvanced(nAdvanced+1);

                         }}>+
                         </button>

                     </div>




<form>               {props.upname ?
    <button className="addCourseButtonT" disabled={!val} onClick={(e) => {
        submitUpdate()
    }}>Update</button>:<button className="addCourseButtonT" disabled={!val} onClick={(e) => {
        submit()
    }}>Create</button>
}

</form>
</div>
             </div>
         );

}
export default NewCourse;
