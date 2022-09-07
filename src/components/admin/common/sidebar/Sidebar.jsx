import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (<div className="sidebar">
        <ul>
            <li><Link to="/">
                <span className="icon"><i className="fa fa-tachometer"/></span>
                <span className="title">Dashboard</span>
            </Link></li>
            <li><Link to="/driver">
                <span className="icon"><i className="fa-solid fa-user-group"/></span>
                <span className="title">Driver</span>
            </Link></li>
            <li><Link to="/client">
                <span className="icon"><i className="fa fa-female" aria-hidden="true"/></span>
                <span className="title">Client</span>
            </Link></li>
            <li><Link to="/vehicle">
                <span className="icon"><i className="fa fa-car" aria-hidden="true"/></span>
                <span className="title">Vehicle</span>
            </Link></li>
            <li><Link to="/package">
                <span className="icon"><i className="fa fa-archive" aria-hidden="true"/></span>
                <span className="title">Package</span>
            </Link></li>
            <li><Link to="/package">
                <span className="icon"><i className="fa fa-location-arrow" aria-hidden="true"/></span>
                <span className="title">Ride</span>
            </Link></li>
            <li><Link to="/careers">
                <span className="icon"><i className="fa fa-user-tie" aria-hidden="true"/></span>
                <span className="title">Career</span>
            </Link></li>
        </ul>
    </div>);
}

export default Sidebar;