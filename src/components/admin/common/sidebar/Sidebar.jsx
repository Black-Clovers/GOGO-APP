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
            <li><Link to="/staff">
                <span className="icon"><i className="fa-solid fa-user-group"/></span>
                <span className="title">Driver</span>
            </Link></li>
            <li><Link to="/labs">
                <span className="icon"><i className="fa fa-car" aria-hidden="true"/></span>
                <span className="title">Vehicle</span>
            </Link></li>
            <li><a href="#">
                <span className="icon"><i className="fa fa-archive" aria-hidden="true"/></span>
                <span className="title">Package</span>
            </a></li>
            <li><Link to="/treatment">
                <span className="icon"><i className="fa fa-location-arrow" aria-hidden="true"/></span>
                <span className="title">Ride</span>
            </Link></li>
        </ul>
    </div>);
}

export default Sidebar;