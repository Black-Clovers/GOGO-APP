import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import Package from '../pages/admin/travelpackage/TravelPackage'
import Client from '../pages/admin/client/client'
import Ride from '../pages/admin/ride/ride'
import SignUp from "../pages/client/signup/SignUp";
import ClientLayout from "../layout/clientLayout";
import AdminLayout from "../layout/adminLayout";
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import ClientHeader from "../components/client/common/header/ClientHeader";
import HomePage from "../pages/client/home/homePage";
import RidePage from "../pages/client/ride/ridePage";


const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" render={(props) => <SignUp/>}/>;
                    <Route path='/client/:path?' exact>
                        <div style={{"height": "auto"}}>
                            <ClientHeader/>
                            <ClientLayout>
                                <main>
                                    <Switch>
                                        <Route path="/client" render={(props) => <HomePage/>} exact/>;
                                        <Route path="/client/ride" render={(props) => <RidePage/>} />;
                                    </Switch>
                                </main>
                            </ClientLayout>
                        </div>
                    </Route>

                    <Route path='/admin/:path?' exact>
                        <AdminLayout class="wrapper">
                            <Header/>
                            <Sidebar/>
                            <Switch>
                                <Route path="/admin" render={(props) => <Dashboard/>} exact/>;
                                <Route path="/admin/package" render={(props) => <Package/>}/>;
                                <Route path="/admin/client" render={(props) => <Client/>}/>;
                                <Route path="/admin/ride" render={(props) => <Ride/>}/>;
                            </Switch>
                        </AdminLayout>
                    </Route>


                </Switch>
            </Router>
        </div>
    );
};
export default AppRoutes;
