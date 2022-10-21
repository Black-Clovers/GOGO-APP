import React from 'react';
import { Link } from "react-router-dom";
import './VehicleGallery.css';
import Axios from "axios";
import { useState, useEffect } from "react";


const VehicleGallery = () => {

    const [listOfVehicles, setListOfVehicles] = useState([]);
    const [VehicleSearch, setVehicleSearch] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:8000/api/vehicle/all").then(res => {
            setListOfVehicles(res.data);
            console.log(res.data);
        })
    }, [])

    const searchCard = () => {
        if (VehicleSearch !== "") {
            listOfVehicles.map((data) => {
                if (data.vehicle_no.toLowerCase().includes(VehicleSearch.toLowerCase())) {
                    console.log((data.vehicle_no).toLowerCase() === VehicleSearch.toLowerCase());
                    const searchedVehicle = [];
                    searchedVehicle.push(data);
                    setListOfVehicles(searchedVehicle);
                }
            })
        }
    }


    return (
        <div>
            <div className="row" id='searchva'>
                <div className="d-flex justify-content-end align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <input id="searchID" type="text" className="form-control col-8 me-5" onChange={(e) => { setVehicleSearch(e.target.value); }}
                            placeholder="Vehicle Number" />
                    </div>
                    <div>
                        <input type="button" className="form-control btnSearch text-white"
                            value="Search" onClick={() => {
                                searchCard()
                            }} />
                    </div>
                </div>
            </div>
            
                    {
                        listOfVehicles.map((VehicleRegModel) => {
                            return (
                        <div class="col-md-3" id='cardview'>
                            <div class="p-3">
                              <div class="card h-110">
                                <img src={VehicleRegModel.vehicle_img} class="card-img-center col-md-3"alt="car" />
                                    <div class="card-body">
                                        <h5 class="card-title">{VehicleRegModel.vehicle_no}</h5>
                                        <p class="card-text">
                                            Owner : {VehicleRegModel.owner_name}
                                        </p>
                                        <p class="card-text">
                                            Condition : {VehicleRegModel.vehicle_Condition}                                        </p>
                                        <p class="card-text">
                                            Availability : {VehicleRegModel.status}
                                        </p>
                                        <p class="card-text">
                                            Contact : {VehicleRegModel.mobile_no}
                                        </p>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">
                                       <center><a href="/client/VehicleHire"  id='Hirebutton' class="btn btn-success">
                                            Hire Vehicle
                                        </a>
                                        </center>
                                        </small>
                                    </div>
                              </div>
                            </div>
                        </div>
                            )
                        })
                    }

                </div>
    )
}

export default VehicleGallery;