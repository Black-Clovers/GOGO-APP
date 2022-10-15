import React from 'react';
import Axios from "axios";
import '../HireVehicle/HireVehicle.css';
import { useState, useEffect } from "react";
import VueSweetalert2 from "sweetalert2";



function HireVehicle(){

    const [client_name, setclient_name] = useState("");
    const [client_address, setclient_address] = useState("");
    const [client_email,setclient_email] = useState("");
    const [contact_no, setcontact_no] = useState("");
    const [from, setfrom] = useState("");
    const [to, setto] = useState("");
    const [passanger_count, setpassanger_count] = useState("");
    const [driver_status,setdriver_status] = useState("");
    const [trip_date,settrip_date] = useState("");
    const [listOfHires, setlistOfHires] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});



    const HireVehicle = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        sub();
        setIsSubmit(true);
    };

    const validate = () => {
        const errors = {};

        if(!client_name){
            errors.client_name = "Client Name is required !"; 
        }
        if(!client_address){
            errors.client_address = "Client Address is required !"; 
        }
        if(!client_email){
            errors.client_email = "client Email is required !";
        }
        if(!contact_no){
            errors.contact_no = "Contact number is required !";
        }else 
        if(contact_no.length !==10){
            errors.contact_no = "Contact number Reqired 10 Digites !";
        }
        if(!from){
            errors.from = "Start Location is required !";
        }
        if(!to){
            errors.to = " Destination should be 10 digits !";
        }
        if(!passanger_count){
            errors.passanger_count = "Passenger Count is required !";
        }
        if(!driver_status){
            errors.driver_status = "Driver Choose is required !";
        }
        if(!trip_date){
            errors.trip_date = "Hire Date is required !";
        }
            return errors;

        };

    const sub =() => {
        if (Object.keys().length === 0 && isSubmit) {
            MakeHire();
        }
    };

const MakeHire = () => {
    Axios.post("http://localhost:8000/api/vehiclehire/", {

		client_name,
        client_address,
        client_email,
        contact_no,
		from,
		to,
        passanger_count,
        driver_status,
        trip_date,

    }).then((response) => {
        setlistOfHires([
        ...listOfHires,
        {   
            client_name,
            client_address,
            client_email,
            contact_no,
            from,
            to,
            passanger_count,
            driver_status,
            trip_date,
        },
      ]);
    });

    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        icon: 'success',
        title: 'Vehicle Hire Requested Successfully',
    }).then(function () {
        //Redirect the user
        window.location.href = "/client/vehicle/";
    });
    
  };

  return(
    <div class="col-md-3 flex-item" id='cardview' >
    <center>
    <div class="card-header py-4" >
        <h5 class="text-center font-weight-bold h5" className='header'>Reserve a Vehicle</h5>
    </div>
    </center>
    <form class="row g-3">
    <div class="col-md-6">
        <label for="inputName" class="form-label">Full Name</label>
        <input type="text" value={client_name} class="form-control" id="inputName"/>
    </div>
    <div class="col-md-6">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" value={client_address} class="form-control" id="inputAddress"/>
    </div>
    <div class="col-12">
        <label for="inputEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail" value={client_email} placeholder="example@gmail.com"/>
    </div>
    <div class="col-12">
        <label for="inputAddress2" class="form-label">Mobile No</label>
        <input type="number" value={contact_no} class="form-control" id="inputAddress2" placeholder=""/>
    </div>
    <div class="col-md-4">
        <label for="inputState" class="form-label">From</label>
        <select select onChange={(event) => {setfrom(event.target.value); }} value={from} id="inputState" class="form-select">
        <option value="Colombo" selected>Colombo</option>
        <option value="Moratuwa" selected>Moratuwa</option>
        <option value="Kandy" selected>Kandy</option>
        <option value="Negombo" selected>Negombo</option>
        <option value="Batticaloa" selected>Batticaloa</option>
        <option value="Sri Jayewardenepura Kotte" selected>Sri Jayewardenepura Kotte</option>
        <option value="Kilinochchi" selected>Kilinochchi</option>
        <option value="Galle" selected>Galle</option>
        <option value="Trincomalee" selected>Trincomalee</option>
        <option value="Matara" selected>Matara</option>
        <option value="Jaffna" selected>Jaffna</option>
        <option value="Anuradhapura" selected>Anuradhapura</option>
        <option value="Ratnapura" selected>Ratnapura</option>
        <option value="Puttalam" selected>Puttalam</option>
        <option value="Badulla" selected>Badulla</option>
        <option value="Mullaittivu" selected>Mullaittivu</option>
        <option value="Matale" selected>Matale</option>
        </select>
    </div>
    <div class="col-md-4">
        <label for="inputState" class="form-label">To</label>
        <select select onChange={(event) => {setto(event.target.value); }} value={to} id="inputState" class="form-select">
        <option value="Colombo" selected>Colombo</option>
        <option value="Moratuwa" selected>Moratuwa</option>
        <option value="Kandy" selected>Kandy</option>
        <option value="Negombo" selected>Negombo</option>
        <option value="Batticaloa" selected>Batticaloa</option>
        <option value="Sri Jayewardenepura Kotte" selected>Sri Jayewardenepura Kotte</option>
        <option value="Kilinochchi" selected>Kilinochchi</option>
        <option value="Galle" selected>Galle</option>
        <option value="Trincomalee" selected>Trincomalee</option>
        <option value="Matara" selected>Matara</option>
        <option value="Jaffna" selected>Jaffna</option>
        <option value="Anuradhapura" selected>Anuradhapura</option>
        <option value="Ratnapura" selected>Ratnapura</option>
        <option value="Puttalam" selected>Puttalam</option>
        <option value="Badulla" selected>Badulla</option>
        <option value="Mullaittivu" selected>Mullaittivu</option>
        <option value="Matale" selected>Matale</option>
        </select>
    </div>
    <div></div>
    <div class="col-md-12">
        <label for="inputcount" class="form-label">Passenger Count</label>
        <input class="input-number" type="text"  value={passanger_count} ></input>
    </div>
    <div class="col-md-10">
        <label for="inputState" class="form-label">Driver Status</label>
        <select select onChange={(event) => {setdriver_status(event.target.value); }} value={driver_status} id="inputState" class="form-select">
            <option value="With Driver" selected>With Driver</option>
            <option value="Without Driver" selected>Without Driver</option>
        </select>
    </div>
    <div class="form-outline mb-4">
        <label for="inputState" class="form-label">Reserve Date</label>
         <input name="pickUpTime" className="form-control" placeholder="Reserve Date"
            type="text"
            value={trip_date}
            onFocus={(e) => e.target.type = 'date'} id="pickUpTime" onChange={(e) => {
            settrip_date(e.target.value)
            }}/>
            <p class="alert-danger">{formErrors.trip_date}</p>
        </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary" id="reg" onClick={HireVehicle}>Sign in</button>
    </div>
</form>
</div>
  )
}

export default HireVehicle;