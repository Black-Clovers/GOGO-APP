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
            <br></br>

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
                            return (
                            <div class="card  col-5 mb-3 rounded ml-2" key={VehicleRegModel.vehicle_no}>
                                <div class="Vehicle card-body" className='cardview'>
                                    < img src={VehicleRegModel.vehicle_img} id = "image" class="image" alt=""/>
                                    <br></br>
                                    <br></br>
                                    <h5 class="Vehicle_no"> {VehicleRegModel.vehicle_no}</h5>
                                    <label for="inputState" class="posform-label">Vehicle Owner :</label>
                                    <h8 className="owner_name"> {VehicleRegModel.owner_name}</h8><br></br>
                                    <label for="inputState" class="posform-label">Condition :</label>
                                    <h8 className="vehicle_condition"> {VehicleRegModel.vehicle_Condition}</h8>
                                    <div className='details'>
                                        <label for="inputState" class="detailsform-label">status :</label>
                                        <h8 class="status"> {VehicleRegModel.status}</h8>
                                    </div>
                                    <div>
                                        <label for="inputState" class="dateform-label">Reg Date :</label>
                                        <h8 className="dateh1">{VehicleRegModel.reg_date}</h8>
                                        <a href="/client/VehicleHire"  className="Hirebutton" class="btn btn-success float-end ">
                                            Hire Vehicle
                                        </a>
                                    </div>
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