import React from 'react';
import MapContainer from "../common/map/MapContainer";
import './RideMap.css'

function RideMap(props) {
    return (
        <div className="row me-0 pe-0 RideMapMainDiv pb-4">
            <div className="col-6 RideMapDiv">
                <MapContainer/>
            </div>
            <div className="col-6 RideMapDiv RideMapDivRight">
                <h3 className="lh-base">Colombo: Get a ride. <br/>
                    Travel. Explore.</h3>
                <p className="lh-base mt-4">
                    Planning a trip is easy with Uber. Compare ways to get around, and see what’s happening near you.
                    Headed somewhere else? See all cities where Uber is available.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dignissimos distinctio eveniet
                    hic itaque nesciunt odio ratione totam? Adipisci ex illum labore modi nihil nisi placeat quam saepe
                    sed vitae.
                </p>
                <div className="btnGroup d-flex justify-content-between align-item-end">
                    <button className="btn leftBtn">Get a price estimate</button>
                    <button className="btn rightBtn">Request a ride</button>
                </div>
            </div>
        </div>
    );
}

export default RideMap;