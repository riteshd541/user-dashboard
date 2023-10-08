import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8082/users", inputData)
      .then((res) => {
        alert("Data Added Successfully !!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="text">Department:</label>
            <input
              type="text"
              className="form-control"
              name="department"
              onChange={(e) =>
                setInputData({ ...inputData, department: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
