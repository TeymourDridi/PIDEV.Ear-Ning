import React from "react";
import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [price,setPrice]=useState(0);
  const [stock,setStock]=useState(true);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  /*const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target?.name]: e.target?.value };
    });
  };*/
  const handleCat = (e) => {
    setCat(e.target?.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { title:title,desc:desc,price:price,inStock:stock, img: downloadURL, categories: cat };
            console.log("product: ",product);
            addProduct(product, dispatch);
          });
        }
    );
  };

  const handleChangestock=(e) => {
    setStock(e.target.value);
  }

  const handleChangetitle=(e) => {
    setTitle(e.target.value);
  }

  const handleChangedesc=(e) => {
    setDesc(e.target.value);
  }
const handleChangeprice =(e)=> {
    setPrice(e.target.value);
}
  return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
                name="title"
                type="text"
                placeholder="Instrument"
                onChange={handleChangetitle}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
                name="desc"
                type="text"
                placeholder="description..."
                onChange={handleChangedesc}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
                name="price"
                type="number"
                placeholder="100"
                onChange={handleChangeprice}
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input type="text" placeholder="Brass,Keyboard,Bowed" onChange={handleCat} />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={handleChangestock}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button onClick={handleClick} className="addProductButton">
            Create
          </button>
        </form>
      </div>
  );
}
