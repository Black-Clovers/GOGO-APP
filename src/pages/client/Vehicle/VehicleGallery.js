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
                if (data.vehicle_type.toLowerCase().includes(VehicleSearch.toLowerCase())) {
                    console.log((data.vehicle_type).toLowerCase() === VehicleSearch.toLowerCase());
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
                            placeholder="Vehicle Condition" />
                    </div>
                    <div>
                        <input type="button" className="form-control btnSearch text-white"
                            value="Search" onClick={() => {
                                searchCard()
                            }} />
                    </div>
                </div>
            </div>

            <div className="main_container">
                <div className="item row fw-bold flex-wrap justify-content-between">
                    {/* 
                    {listofVacancies &&
                        listofVacancies.filter(value => {
                            if (VacancySearch === "") {
                                return value;
                            } else if (
                                value.Vacancy_Position.toLowerCase().includes(VacancySearch.toLowerCase())
                            ) {
                                return value
                            }
                        })
                    } */}

                    {
                        listOfVehicles.map((VehicleRegModel) => {
                            return (<div id='card' class="card col-5 mb-3" key={VehicleRegModel.vehicle_no}>
                                <div class="vacancy card-body">
                                    <h5 class="Vcard-title">{VehicleRegModel.vehicle_no}</h5>
                                    <label for="inputState" class="posform-label">Vehicle Owner :</label>
                                    <h8 className="No_of_Positions">{CareerModel.owner_name}</h8>
                                    <label for="inputState" class="posform-label">Condition :</label>
                                    <h8 className="location">{CareerModel.vehicle_type}</h8>
                                    <div className='details'>
                                        <label for="inputState" class="detailsform-label">status :</label>
                                        <p class="detailcard-text">{CareerModel.status}</p>
                                    </div>
                                    <label for="inputState" class="dateform-label">Reg Date :</label>
                                    <h1 className="dateh1">{CareerModel.reg_date}</h1>
                                    <a href="#" id='applybut' class="btn btn-primary float-end">Hire Vehicle</a>
                                </div>
                            </div>)
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default VehicleGallery;