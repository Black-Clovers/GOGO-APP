import React from 'react';
import './ClientHeader.css'
import Logo from '../../../../assets/logo/logo.svg'
import ProfilePicture from '../../../../assets/images/74428421_2349431498655884_4908660836324605952_n.jpg'
import {Link} from "react-router-dom";


const ClientHeader = () => {
    return (
        <div className="row m-0">
            <img src={Logo} style={{"z-index": "100"}} className="logo" alt="Logo"/>
            <nav className="position-absolute top-0 navbar navbar-expand-lg navbar-light bg-light header-nav">
                <div className="container-fluid collapseMainDiv">
                    <button className="navbar-toggler position-absolute toggerButton" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapseDiv d-lg-flex justify-content-lg-end collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 fw-bold">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">Driver</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/client/Vehicle/">
                                    Vehicle
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    Ride
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    Career
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    Feedback
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item me-lg-5">
                                <a className="nav-link">
                                    Contact Us
                                </a>
                            </li>
                            <li className="nav-item d-flex ms-lg-5">
                                <Link className="nav-link me-2" tabIndex="-1"
                                      aria-disabled="true" to="/login">Login</Link>
                                <Link className="nav-link me-2" tabIndex="-1"
                                      aria-disabled="true" to="/login">Register</Link>
                                <a className="nav-link me-2 d-none" tabIndex="-1"
                                   aria-disabled="true">Logout</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <img className="profileCircle" src={ProfilePicture} alt="Profile Picture"/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
}

export default ClientHeader;