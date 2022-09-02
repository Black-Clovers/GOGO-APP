import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Packageadmin from "./components/PackageComponents/AdminPackage";

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/Packageadmin" element={<Packageadmin/>} />
       
      </Routes>
    
      </BrowserRouter>
  );
}
export default App;