import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Add from "./Add";
import Edit from "./Edit";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/create" element={<Add />}></Route>
        <Route path="/update/:id" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
