import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import Client from "../pages/admin/client/client";
import Package from "../pages/admin/travelpackage/TravelPackage";
import Addvacancy from "../pages/client/career/addVacancy";
import Vehicle from '../pages/admin/VehicleAdmin/Vehicle';


const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Dashboard/>} exact={true}/>
                    <Route path="/package" element={<Package/>} exact={true}/>
                    <Route path="/client" element={<Client/>} exact={true}/>
                    <Route path="/vehicle" element={<Vehicle/>} exact={true}/>
                </Routes>
            </Router>
        </div>
    );
};
export default AppRoutes;
