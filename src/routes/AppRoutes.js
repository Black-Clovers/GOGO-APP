import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";

const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Dashboard/>} exact={true}/>
                    {/*<Route path="/dashboard" element={<Dashboard/>} exact={true}/>*/}
                </Routes>
            </Router>
        </div>
    );
};

export default AppRoutes;
