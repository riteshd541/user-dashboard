import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const navigates = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/users/" + id)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    axios.put("http://localhost:8082/users/" + id, data).then((response) => {
      alert("Data updated successfully !!");
      navigates("/");
    });
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">ID:</label>
            <input
              type="text"
              value={data.id}
              className="form-control"
              disabled
              name="name"
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={data.name}
              className="form-control"
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={data.email}
              className="form-control"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="text">Department:</label>
            <input
              type="text"
              value={data.department}
              className="form-control"
              name="department"
              onChange={(e) => setData({ ...data, department: e.target.value })}
            />
          </div>
          <br />
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
