import React from 'react';
import './DriveReg.css'

function DriverReg(props) {
    return (
        <div className="row pe-0 me-0 driveMainDiv">
            <div className="driveDiv d-flex flex-column justify-content-between">
                <div className="headerTextDiv">
                    <h3>Get in the driver’s</h3>
                    <h3>seat</h3>
                    <h3>and get paid</h3>
                    <div className="mt-4 fw-bold text-white">
                        <p>Drive on the platform with the largest network of active riders.</p>
                    </div>
                </div>
                <div className="btnGroup d-flex justify-content-between align-item-end">
                    <button className="btn leftBtn">Sign up to drive</button>
                </div>
            </div>
        </div>
    );
}

export default DriverReg;