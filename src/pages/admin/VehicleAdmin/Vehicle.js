import React from 'react';
import Axios from "axios";
import { useState, useEffect } from "react";
import '../VehicleAdmin/Vehicle.css';
import { Link,useParams } from "react-router-dom";




const Vehicle = () => {

    const {id} = useParams();
    const [vehicle_no, setvehicle_no] = useState("");
    const [lisence_no, setlisence_no] = useState("");
    const [chasse_no, setchasse_no] = useState("");
    const [owner_nic, setowner_nic] = useState("");
    const [mobile_no, setmobile_no] = useState("");
    const [owner_name, setowner_name] = useState("");
    const [ vehicle_type,setvehicle_type] = useState("");
    const [reg_date, setreg_date] = useState([]);
    const [listOfVehicles, setlistOfVehicles] = useState([]);
    const [vehicle_search, setvvehicle_search] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


const createVehicle = () => {
    Axios.post("http://localhost:8000/api/vehicle/", {
	vehicle_no,
	lisence_no,
	chasse_no,
	owner_nic,
	mobile_no,  
	owner_name,
	vehicle_type,
	reg_date,
    }).then((response) => {
        setlistOfVehicles([
        ...listOfVehicles,
        {   vehicle_no,
            lisence_no,
            chasse_no,
            owner_nic,
            mobile_no,  
            owner_name,
            vehicle_type,
            reg_date,
        },
      ]);
    });
    
  };
  

  useEffect(() => {

    Axios.get("http://localhost:8000/api/vehicle/all").then((response) => {

        setlistOfVehicles(response.data);

    });

  }, [])

  //validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    sub();
    setIsSubmit(true);
  };
  
  const validate=()=>{
    const errors = {};
    if(!vehicle_no){
         errors.vehicle_no = "Vehicle Number is required!"; 
    }
    if(!lisence_no){
        errors.lisence_no = "License Number is required!"; 
    }
    if(!chasse_no){
        errors.chasse_no = "Chasse is required!";
    }
    if(!owner_nic){
        errors.owner_nic = "Owner NIC/Passport is required!";
    }
    if(!mobile_no){
        errors.mobile_no = "Mobile Number is required!";
    }
    if(!owner_name){
        errors.owner_name = "Owner Name is required!";
    }
    if(!vehicle_type){
        errors.vehicle_type = "Vehicle Type is required!";
    }
    if(!reg_date){
        errors.reg_date = "Registered Date is required!";
    }
        return errors;
    }
    const sub =() => {
    
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            createVehicle();
        }
    }

    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">
                    Vehicle Management
                </div>
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <button id="btn-generate-report" className="btn me-3">Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row mt-5 px-3">
                        <form>
                            <div className="row">
                                <div className="col d-flex justify-content-end align-items-center">
                                    <div className="col d-flex justify-content-end">
                                        <div>
                                            <button className="btn btnAddImg" type="button">
                                                <i className="fa fa-plus text-white" aria-hidden="true"/>
                                            </button>
                                            <button className="btn btnEditImg" type="button">
                                                <i className="fa-solid fa-pen text-white"/>
                                            </button>
                                            <button className="btn btnImgDelete" type="button">
                                                <i className="fa-solid fa-trash-can d-inline text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="imgDiv">

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Vehicle Number" onChange={(event) => {setvehicle_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.vehicle_no}</p>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="License Number" onChange={(event) => {setlisence_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.lisence_no}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Chasse Number" onChange={(event) => {setchasse_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.chasse_no}</p>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NIC" onChange={(event) => {setowner_nic(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.owner_nic}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="tel" className="form-control" placeholder="Mobile Number" onChange={(event) => {setmobile_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.mobile_no}</p>
                                </div>
                                <div className="col">
                                    <input type="tel" className="form-control" placeholder="Owner Name" onChange={(event) => {setowner_name(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.owner_name}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <select onChange={(event) => {setvehicle_type(event.target.value);}} name="condition" className="form-select" aria-label="role">
                                        <option selected disabled value="0">Vehicle condition</option>
                                        <option value="ac">AC</option>
                                        <option value="non ac">Non AC</option>
                                    </select>
                                    <p class="alert-txt">{formErrors.vehicle_type}</p>
                                </div>
                                <div className="col">
                                    <input name="registeredDate"
                                           onChange={(event) => {setreg_date(event.target.value);}}
                                           className="form-control"
                                           placeholder="Registered Date"
                                           type="text"
                                           onFocus={(e) => e.target.type = 'date'} id="registerdate"/>
                                           <p class="alert-txt">{formErrors.reg_date}</p>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="submit" onClick={handleSubmit} className="btn btnRegister ">Register</button>
                                    <button type="button" className="btn btnUpdate">Update</button>
                                    <button type="button" className="btn btnDelete">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <h6 className="mb-0 fw-bold mt-2 mb-2">Vehicle</h6>
                        <p>All Registered Vehicles</p>
                        <div className="row mt-5">
                                <div className="col">
                                    <div className="mb-5">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input onChange ={(e)=>{setvvehicle_search(e.target.value); }}  id="searchID" type="text" className="form-control col-8 me-5"
                                                    placeholder="Vehicle Number"/>
                                            </div>
                                            <div>
                                                <input type="button" className="form-control btnSearch text-white"
                                                    value="Search"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    <th scope="col">Vehicle Number</th>
                                    <th scope="col">Licence Number</th>
                                    <th scope="col">Chasse Number</th>
                                    <th scope="col">Owner Name</th>
                                    <th scope="col">NIC</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Condition</th>
                                    <th scope="col">Regitered Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {listOfVehicles && listOfVehicles.filter(value=>{

                                if(vehicle_search ===""){
                                     return value;
                                }else if(
                                    value.vehicle_no.toLowerCase().includes(vehicle_search.toLowerCase())
                                ){
                                    return value
                                }

                                }).map((registervehicle, i) => (
                                <tr class="crs-tr" data-status="active">

                                <td className="crs-td">{registervehicle.vehicle_no}</td>
                                <td className="crs-td">{registervehicle.lisence_no}</td>
                                <td className="crs-td">{registervehicle.chasse_no}</td>
                                <td className="crs-td">{registervehicle.owner_name}</td>
                                <td className="crs-td">{registervehicle.owner_nic}</td>
                                <td className="crs-td">{registervehicle.mobile_no}</td>
                                <td className="crs-td">{registervehicle.vehicle_type}</td>
                                <td className="crs-td">{registervehicle.reg_date}</td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vehicle;