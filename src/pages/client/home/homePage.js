import React from 'react';
import RideMap from "../../../components/client/RideMap/RideMap";
import DriverReg from "../../../components/client/driverReg/DriverReg";
import './home.css'

function HomePage(props) {
    return (
        <div className="homeDiv">
            <div className="RidemapDiv">
                <RideMap/>
            </div>
            <div className="pb-4 driverRegSection">
                <DriverReg/>
            </div>
        </div>
    );
}

export default HomePage;