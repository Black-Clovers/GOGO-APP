import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Staff from "../pages/admin/staff/Staff";
import Labs from "../pages/admin/lab/Lab";
import Header from "../components/admin/common/admin/header/Header";
import Sidebar from "../components/admin/common/admin/sidebar/Sidebar";
import Treatment from "../pages/admin/treatment/Treatment";

const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Header />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Dashboard />} exact={true}/>
                    <Route path="/staff" element={<Staff />} exact={true}/>
                    <Route path="/labs" element={<Labs />} exact={true}/>
                    <Route path="/treatment" element={<Treatment />} exact={true}/>
                </Routes>
            </Router>
        </div>
    );
}

export default AppRoutes;