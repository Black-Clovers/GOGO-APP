import React from 'react';
import Axios from "axios";
import { useState, useEffect } from "react";
import '../VehicleAdmin/Vehicle.css';
import VueSweetalert2 from "sweetalert2";



function Vehicle(){

     const [owner_id, setowner_id] = useState("");
    const [vehicle_no, setvehicle_no] = useState("");
    const [vehicle_img,setvehicle_img] = useState("");
    const [lisence_no, setlisence_no] = useState("");
    const [chasse_no, setchasse_no] = useState("");
    const [owner_nic, setowner_nic] = useState("");
    const [mobile_no, setmobile_no] = useState("");
    const [owner_name, setowner_name] = useState("");
    const [vehicle_Condition,setvehicle_Condition] = useState("");
    const [status,setvehicle_status] = useState("");
    const [reg_date, setreg_date] = useState([]);
    const [listOfVehicles, setlistOfVehicles] = useState([]);
    const [vehicle_search, setvvehicle_search] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //validation
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        sub();
        setIsSubmit(true);
    };
  
    const validate = () => {
        const errors = {};

        if(!vehicle_no){
            errors.vehicle_no = "Vehicle Number is required !"; 
        }
        if(!lisence_no){
            errors.lisence_no = "License Number is required !"; 
        }
        if(!chasse_no){
            errors.chasse_no = "Chasse is required !";
        }
        if(!owner_nic){
            errors.owner_nic = "NIC/Passport NO is required !";
        }else
        if (owner_nic.length !==10){
            errors.owner_nic = "Owner NIC/Passport should be 10 digits !";
        }
        if(!mobile_no){
            errors.mobile_no = "Owner Mobile Number is required !";
        }else
        if(mobile_no.length !==10){
            errors.mobile_no = "Mobile Number should be 10 digits !";
        }
        if(!owner_name){
            errors.owner_name = "Owner Name is required !";
        }
        if(!vehicle_Condition){
            errors.vehicle_type = "Vehicle Type is required !";
        }
        if(!status){
            errors.status = "Vehicle status is required !";
        }
        if(!reg_date){
            errors.reg_date = "Registered Date is required !";
        }

            return errors;

        };
        const sub =() => {
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                createVehicle();
            }
        };

const createVehicle = () => {
    Axios.post("http://localhost:8000/api/vehicle/", {

	vehicle_no,
    vehicle_img,
	lisence_no,
	chasse_no,
	owner_nic,
	mobile_no,  
	owner_name,
	vehicle_Condition,
    status,
	reg_date,

    }).then((response) => {
        setlistOfVehicles([
        ...listOfVehicles,
        {   
            vehicle_no,
            vehicle_img,
            lisence_no,
            chasse_no,
            owner_nic,
            mobile_no,  
            owner_name,
            vehicle_Condition,
            status,
            reg_date,
        },
      ]);
    });
    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        icon: 'success',
        title: 'Vehicle Registered Successfully',
    }).then(function () {
        //Redirect the user
        /*window.location.href = "/vehicle";*/
    });
  };
 

  useEffect(() => {

    Axios.get("http://localhost:8000/api/vehicle/all").then((response) => {

        setlistOfVehicles(response.data);
    });
  },[]);

  function sendVehicle(e){
    e.preventDefault();
    alert("Going to update Vehicle");

    const newVehicle = {
        
        owner_id,
        vehicle_no,
        vehicle_img,
        lisence_no,
        chasse_no,
        owner_nic,
        mobile_no,  
        owner_name,
        vehicle_Condition,
        status,
        reg_date,
    };

    Axios.put(`http://localhost:8000/api/vehicle/${owner_id}`,newVehicle).then(() => {})
    .catch((err) => {
        alert(err);
        console.log(err);
    });

    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1800,
        icon: 'success',
        title: 'Your Vehicle details Updated Successfully',
    }).then(function () {
        // Redirect the user
       window.location.href = "/vehicle";
      });
    
    };

    const loadVehicleDetailsedit = (registervehicle) => {
        document.getElementById("reg").setAttribute("disabled", "true");
        document.getElementById("delete").setAttribute("disabled", "true");

        setowner_id(registervehicle._id);
        setvehicle_no(registervehicle.vehicle_no);
        setvehicle_img(registervehicle.vehicle_img);
        setlisence_no(registervehicle.lisence_no);
        setchasse_no(registervehicle.chasse_no);
        setowner_nic(registervehicle.owner_nic);
        setmobile_no(registervehicle.mobile_no);
        setowner_name(registervehicle.owner_name);
        setvehicle_Condition(registervehicle.vehicle_Condition);
        setvehicle_status(registervehicle.status);
        setreg_date(registervehicle.reg_date);
    };

    const loadVehicleDetailsdelete = (registervehicle) => {
        document.getElementById("reg").setAttribute("disabled", "true");
        document.getElementById("edit").setAttribute("disabled", "true");
        document.getElementById("delete").setAttribute("enabled", "true");
        
        setowner_id(registervehicle._id);
        setvehicle_no(registervehicle.vehicle_no);
        setvehicle_img(registervehicle.vehicle_img);
        setlisence_no(registervehicle.lisence_no);
        setchasse_no(registervehicle.chasse_no);
        setowner_nic(registervehicle.owner_nic);
        setmobile_no(registervehicle.mobile_no);
        setowner_name(registervehicle.owner_name);
        setvehicle_Condition(registervehicle.vehicle_Condition);
        setvehicle_status(registervehicle.status);
        setreg_date(registervehicle.reg_date);
    };
    
    //Image upload
	  const addcoverimage = () => {
        let imgDiv = document.getElementById("imgInputDiv");

        let imgUploader = document.createElement("input");
        imgUploader.setAttribute("id", "imgUploader");
        imgUploader.setAttribute("type", "file");
        imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
        imgUploader.setAttribute("class", "d-none")
        imgDiv.appendChild(imgUploader);

        let imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);

        if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
            imgUploaderElement.click();
            imgUploaderElement.addEventListener("change", () => { 
                imgUploaderElement = document.getElementById("imgUploader");
                console.log(imgUploaderElement);
                if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                    if (imgUploaderElement.files.length > 0) {
                        const fileReader = new FileReader();

                        fileReader.onload = function (event) {
                            setvehicle_img(event.target.result);
                        };

                      
                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }

        document.getElementById("btnEditImg").removeAttribute("disabled");
        document.getElementById("btnImgDelete").removeAttribute("disabled");
    }

    const updatecoverimage = () => {
        document.getElementById("ProfileImage").removeAttribute("src");
        document.getElementById("btnAddImg").setAttribute("disabled", "true");

        let imgDiv = document.getElementById("imgInputDiv");

        let imgUploader = document.createElement("input");
        imgUploader.setAttribute("id", "imgUploader");
        imgUploader.setAttribute("type", "file");
        imgUploader.setAttribute("required", "true");
        imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
        imgUploader.setAttribute("class", "d-none")
        imgDiv.appendChild(imgUploader);

        let imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);

        if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
            imgUploaderElement.click();
            imgUploaderElement.addEventListener("change", () => {
                imgUploaderElement = document.getElementById("imgUploader");
                console.log(imgUploaderElement);
                if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                    if (imgUploaderElement.files.length > 0) {
                        const fileReader = new FileReader();

                        fileReader.onload = function (event) {
                            setvehicle_img(event.target.result);
                        };

                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }
    
    }
	const removecoverImages = () => {
        document.getElementById("ProfileImage").removeAttribute("src");
        document.getElementById("btnImgDelete").setAttribute("disabled", "true");
    }

    const deleteVehicle= (vehicle) => {
        console.log(vehicle)
        alert("You want to delete the Vehicle ?");
        Axios.delete(`http://localhost:8000/api/vehicle/${owner_id}`).then((res) => {
        });

        VueSweetalert2.fire({
            title: 'Vehicle Deleted Successfully',
            type: 'warning',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
            icon: 'success',
        }).then(function () {
          // Redirect the user
          window.location.href = "/vehicle";
        });
      };

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
                                            <button className="btn btnAddImg" id="btnAddImg" type="button"
                                                    onClick={() => {
                                                        addcoverimage();
                                                    }}>
                                                <i className="fa fa-plus text-white" aria-hidden="true"/>
                                            </button>
                                            <button className="btn btnEditImg" id="btnEditImg" type="button"
                                                    onClick={() => {
                                                        updatecoverimage();
                                                    }}>
                                                <i className="fa-solid fa-pen text-white"/>
                                            </button>
                                            <button className="btn btnImgDelete" id="btnImgDelete" type="button"
                                                    onClick={() => {
                                                        removecoverImages();
                                                    }}>
                                                <i className="fa-solid fa-trash-can d-inline text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="imgInputDiv">
                                        <div>
                                            <img id="ProfileImage" className="imgDiv" src={vehicle_img}
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" value={vehicle_no} placeholder="Vehicle Number" onChange={(event) => {setvehicle_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.vehicle_no}</p>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={lisence_no} placeholder="License Number" onChange={(event) => {setlisence_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.lisence_no}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" value={chasse_no} placeholder="Chasse Number" onChange={(event) => {setchasse_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.chasse_no}</p>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={owner_nic} placeholder="NIC" onChange={(event) => {setowner_nic(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.owner_nic}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="tel" className="form-control" value={mobile_no} placeholder="Mobile Number" onChange={(event) => {setmobile_no(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.mobile_no}</p>
                                </div>
                                <div className="col">
                                    <input type="tel" className="form-control" value={owner_name} placeholder="Owner Name" onChange={(event) => {setowner_name(event.target.value);}} />
                                    <p class="alert-txt">{formErrors.owner_name}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    < select onChange={(event) => {setvehicle_Condition(event.target.value); }} name="condition" className="form-select" value={vehicle_Condition} aria-label="role">
                                        <option selected enabled value="0">Vehicle condition</option>
                                        <option value="AC">AC</option>
                                        <option value="Non AC">Non AC</option>
                                    </select>
                                    <p class="alert-txt">{formErrors.vehicle_Condition}</p>
                                </div>
                                <div className="col">
                                    <input name="registeredDate"
                                           value={reg_date}
                                           onChange={(event) => {setreg_date(event.target.value);}}
                                           className="form-control"
                                           placeholder="Registered Date"
                                           type="text"
                                           onFocus={(e) => e.target.type = 'date'} id="registerdate"/>
                                           <p class="alert-txt">{formErrors.reg_date}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className='col'>
                                    <select onChange={(event) => {setvehicle_status(event.target.value);}} name="status" className="form-select" value={status} aria-label="role">
                                        <option selected enabled value="0">Vehicle Status</option>
                                        <option defaultValue="Available" >Available</option>
                                        <option defaultValue="Unavailable">Unavailable</option>
                                        <p class="alert-txt">{formErrors.status}</p>
                                    </select>
                                </div>
                                <div className="col">
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="submit" id="reg" onClick={handleSubmit} className="btn btnRegister ">Register</button>
                                    <button type="button" id="edit" className="btn btnUpdate" onClick={sendVehicle}>Update</button>
                                    <button type="button" id="delete" className="btn btnDelete" onClick={deleteVehicle} >Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="row mt-5 px-3">
                        <div className="col-6">
                            <h6 className="mb-0 fw-bold mt-2">Current Vehicle</h6>
                            <p>All Registered Vehicles</p>
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <input id="searchID" type="text" className="form-control col-8 me-5"
                                           placeholder="Vehicle Number" onChange={(e) => {
                                            setvvehicle_search(e.target.value);
                                    }}
                                    />
                                </div>
                                <div>
                                    <input type="button" className="form-control btnSearch text-white"
                                           defaultValue="Search" onClick={() => {
                                    }}/>
                                </div>
                            </div>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    <th scope="col">Vehicle Number</th>
                                    <th scope='col'>Vehicle Image</th>
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

                                {listOfVehicles && listOfVehicles.filter(value =>{

                                if(vehicle_search === "") {
                                     return value;
                                }else if(
                                    value.vehicle_no.toLowerCase().includes(vehicle_search.toLowerCase())
                                ){
                                    return value;
                                }
                                })
                                .map((registervehicle, i) => (
                                <tr class="crs-tr" data-status="active">

                                <td className="crs-td">{registervehicle.vehicle_no}</td>
                                <td className="crs-td">< img src={registervehicle.vehicle_img} class="crsthumimg" alt=""/></td>                            
                                <td className="crs-td">{registervehicle.lisence_no}</td>
                                <td className="crs-td">{registervehicle.chasse_no}</td>
                                <td className="crs-td">{registervehicle.owner_name}</td>
                                <td className="crs-td">{registervehicle.owner_nic}</td>
                                <td className="crs-td">{registervehicle.mobile_no}</td>
                                <td className="crs-td">{registervehicle.vehicle_Condition}</td>
                                <td className="crs-td">{registervehicle.reg_date}</td>
                                <td className="crs-td">{registervehicle.status}</td>
                                <td>
                                <i className="fa-solid fa-pen me-3 text-primary d-inline" onClick={() => {
                                    loadVehicleDetailsedit(registervehicle);
                                }}/>
                                <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline" onClick={() => {
                                    loadVehicleDetailsdelete(registervehicle);
                                }}/>
                                </td>
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