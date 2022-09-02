import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import Header from "../components/admin/common/header/Header";

const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Dashboard/>} exact={true}/>
                    <Route path="/dashboard" element={<Dashboard/>} exact={true}/>
                </Routes>
            </Router>
        </div>
    );
};

export default AppRoutes;
