import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Whenever currentPage or itemsPerPage changes, update the displayed data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedRecords = records.slice(startIndex, endIndex);
    setDisplayedRecords(slicedRecords);
  }, [currentPage, itemsPerPage, records]);

  const [displayedRecords, setDisplayedRecords] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8082/users")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8082/users/${id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        fetchData(); // Refresh the data
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const totalPages = Math.ceil(records.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
            {displayedRecords.map((d, i) => (
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
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
