import React, { useState } from "react";
import { Link } from "react-router-dom";
import Inputs from "../Components/Inputs";

const Login = () => {
  const [form,setForm]=useState({})
  const onChangeHundler =(e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }
  const onSubmit =(e)=>{
    e.preventDefault();
    console.log(form);
  }
  return (
    <div className="container p-4 mt-4">
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-right-to-bracket fs-1 mx-2"></i>{" "}
            <h2>Login</h2>
          </div>
          <div
            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              <Inputs name="email" label="Email" type="text" icon="fa-solid fa-at" onChangeHundler={onChangeHundler}/>
              <Inputs name="password" label="Password" type="password" icon="fa-solid fa-key" onChangeHundler={onChangeHundler}/>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Save <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <Link to="/Register">I don't have account</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
