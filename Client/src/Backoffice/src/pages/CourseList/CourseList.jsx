import React, {useEffect} from "react";
import "./CourseList.css";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {publicRequest} from "../../../../components/MarketPlace/requestMethods";
export default function CourseList() {
  const [data, setData] = useState(productRows);


  useEffect(()=>{
      publicRequest.get(`/course/`)
          .then((response) => {
              for(let i=0 ;i<response.data.length;i++) {
                  response.data[i].id = response.data[i]._id
                  response.data[i].beginner=response.data[i].beginner.length;
                  response.data[i].medium=response.data[i].medium.length;
                  response.data[i].advanced=response.data[i].advanced.length;
              }
              setData(response.data)
              console.log("response");
              //console.log(res);
              console.log(response.data);

          })
          .catch((e) => {
              console.log(e);
              console.log("response");
          });


  },[])

  const handleDelete = (id) => {


      publicRequest.delete(`/course/`+id)
          .then((response) => {

              console.log("response");

              console.log(response.data);

          })
          .catch((e) => {
              console.log(e);
              console.log("response");
          });
      setData(data.filter((item) => item.id !== id));

  };



  const columns = [

    {
      field: "imgLink",
      headerName: "Image",
      width: 100,
        sortable: false,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg"  src={params.row.imgLink} alt="" />

          </div>
        );
      },
    },
      {
      field: "name",
      headerName: "Course",
          sortable: true,
      width: 200,


    },
{
      field: "description",
      headerName: "Description",
          sortable: true,
      width: 200,


    },
{
      field: "prix",
      headerName: "Price",
          sortable: true,
      width: 180,


    },
{
      field: "beginner",
      headerName: "Beginner Lessons",
          sortable: true,
      width: 181,




    },
{
      field: "medium",
      headerName: "Medium Lessons",
          sortable: true,
      width: 179,

    },
{
      field: "advanced",
      headerName: "Advanced Lessons",
          sortable: true,
      width: 180,

    },


    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"../course/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="../../back/newcourse">
        <button className="productAddButton">Create</button>
      </Link>

      <DataGrid
        rows={data}
        disableSelectionOnClick

        components={{Toolbar: GridToolbar}}
        columns={columns}
        pageSize={8}
        checkboxSelection

      />
    </div>
  );
}
