import React from 'react';
import RideMap from "../../../components/client/RideMap/RideMap";
import ClientHeader from "../../../components/client/common/header/ClientHeader";
import './home.css'

function HomePage(props) {
    return (
        <div className="homeDiv">
            <div>
                <RideMap/>
            </div>
        </div>
    );
}

export default HomePage;