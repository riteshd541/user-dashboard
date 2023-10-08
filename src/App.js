import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the server
    axios
      .get("http://localhost:8082/users")
      .then((response) => {
        setColumns(Object.keys(response.data[0])); // Assuming the JSON response has a 'users' key
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once

  const handleDelete = (id) => {
    // Make an HTTP DELETE request to delete the specific item by its ID
    axios
      .delete(`http://localhost:8082/users/${id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        // After successful deletion, refresh the data to reflect the changes
        fetchData();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8082/users")
      .then((response) => {
        setColumns(Object.keys(response.data[0])); // Assuming the JSON response has a 'users' key
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <div className="text-end">
        <Navbar />
      </div>
      <div className="container mt-2">
        <table className="table">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.department}</td>
                <td>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-success"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-sm ms-1 btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
