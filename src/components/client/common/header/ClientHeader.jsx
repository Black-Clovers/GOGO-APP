import React from 'react';
import './ClientHeader.css'
import backGroundImage from './../../../../assets/images/backGroundImage.png';
import {Link} from "react-router-dom";
import Logo from "./../../../../assets/logo/logo.svg";
import ProfilePicture from "./../../../../assets/images/74428421_2349431498655884_4908660836324605952_n.jpg";
import Character from "./../../../../assets/images/charactor.png";


const ClientHeader = () => {
    return (
        <div className="headerDiv">
            <div className="w-100 h-100">
                <img className="backGroundImage" src={backGroundImage} alt="background"/>
            </div>
            <div className="row m-0 headerDiv">
                <img src={Logo} style={{"z-index": "100"}} className="logo" alt="Logo"/>
                <nav className="position-absolute top-0 navbar navbar-expand-lg navbar-light text-white header-nav">
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
                                    <Link className="nav-link me-2 text-white" tabIndex="-1"
                                          aria-disabled="true" to="/client">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">Driver</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white">
                                        Vehicle
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link me-2 text-white" tabIndex="-1"
                                          aria-disabled="true" to="/client/ride">Ride</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white">
                                        Career
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white">
                                        Feedback
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white">
                                        About Us
                                    </a>
                                </li>
                                <li className="nav-item me-lg-5">
                                    <a className="nav-link text-white">
                                        Contact Us
                                    </a>
                                </li>
                                <li className="nav-item d-flex ms-lg-5">
                                    <Link className="nav-link me-2 text-white" tabIndex="-1"
                                          aria-disabled="true" to="/login">Login</Link>
                                    <Link className="nav-link me-2 text-white" tabIndex="-1"
                                          aria-disabled="true" to="/login">Register</Link>
                                    <a className="nav-link me-2 d-none text-white" tabIndex="-1"
                                       aria-disabled="true">Logout</a>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <img className="profileCircle" src={ProfilePicture} alt="Profile Picture"/>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="row p-0 m-0 contentRowDiv">
                    <div className="col-6">
                        <div className="mainTitleDiv">
                            <h1 className="mainTitle fw-bold">Ride Loream</h1>
                            <p className="webHeroContent lh-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu ante amet, augue diam, a. Ut
                                fermentum at arcu, eu. Ultrices arcu justo arcu tincidunt. Egestas mauris turpis
                                interdum
                                amet amet, nunc. Id vitae mauris ultrices duis habitant. Ornare in cras mi mollis amet,
                                aliquet. Elementum, sagittis massa donec vitae vestibulum, massa.
                                <br/>
                                <br/>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu ante amet, augue diam, a. Ut
                                fermentum at arcu, eu. Ultrices arcu justo arcu tincidunt. Egestas mauris turpis
                                interdum
                                amet amet, nunc. Id vitae mauris ultrices duis habitant. Ornare in cras mi mollis amet,
                                aliquet. Elementum, sagittis massa donec vitae vestibulum, massa.
                            </p>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <img src={Character} alt="characters" className="characterImage"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientHeader;