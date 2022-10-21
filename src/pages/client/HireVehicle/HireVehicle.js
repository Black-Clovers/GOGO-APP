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
        if (Object.keys(formErrors).length === 0 && isSubmit) {
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
        title: 'Vehicle Hire Requested Successfully, We will let you know',
    }).then(function () {
        //Redirect the user
        window.location.href = "/client/vehicle/";
    });  
  };

  return(
<div class="row">
<center>
<div className="travl-img mt-5 mx-auto">
</div>
    <div class="col-md-4 mb-4 mt-4 mx-auto ">
      <div class="card mb-5">
        <div class="card-header py-3">
          <h5 class="text-center font-weight-bold h4">Reserve A Hire</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <h4 className='mb-4'> </h4>
            <form>     
            <div class="form-outline mb-4">
              <input type="text" id="form6Example4"  name="client_name" class="form-control"placeholder="Full Name" onChange={(event) => {setclient_name(event.target.value);}}/>
              <p class="alert-txt">{formErrors.client_name}</p>
            </div>
            <div class="form-outline mb-4">
              <input type="text" id="form6Example4"  name="client_address" class="form-control"placeholder="Residential Address" onChange={(event) => {setclient_address(event.target.value);}}/>
              <p class="alert-txt">{formErrors.client_address}</p>
            </div>  
            <div class="form-outline mb-4">
              <input type="text" id="form6Example4"  name="contact_no" class="form-control"placeholder="Phone" onChange={(event) => {setcontact_no(event.target.value);}}/>
              <p class="alert-txt">{formErrors.cus_phone}</p>
            </div>
            <div class="form-outline mb-4">
              <input type="text" id="form6Example4"  name="client_email" class="form-control"placeholder="Email" onChange={(event) => {setclient_email(event.target.value);}}/>
              <p class="alert-txt">{formErrors.client_email}</p>
            </div>
            <div className="row mt-4">
                <div className="col">
                    < select onChange={(event) => {setfrom(event.target.value); }} name="from" className="form-select"  aria-label="role">
                        <option selected enabled value="0">From</option>
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
                        <p class="alert-txt">{formErrors.from}</p>
                </div>
                <div className="col">
                    < select onChange={(event) => {setto(event.target.value); }} name="to" className="form-select"  aria-label="role">
                        <option selected enabled value="0">To</option>
                        <option value="Colombo" selected>Colombo</option>
                            <option value="Moratuwa" selected>Moratuwa</option>
                            <option value="Kandy" selected>Kandy</option>
                            <option value="Kaluthara" selected>Kaluthara</option>
                            <option value="Badulla" selected>Badulla</option>
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
                        <p class="alert-txt">{formErrors.to}</p>
                </div>
            </div>     
            <div class="form-outline row mt-4">
                <div className="col">
                    <input type="number" id="form6Example4"  name="passanger_count" class="form-control" placeholder="Passenger Count" onChange={(event) => {
                            setpassanger_count(event.target.value);
                            }}/>
                </div>
                <div className="col">
                    < select onChange={(event) => {setdriver_status(event.target.value); }} name="to" className="form-select"  aria-label="role">
                        <option selected disabled value="">Driver Status</option>
                        <option value="With Driver" selected>With Driver</option>
                            <option value="Without Driver" selected>Without Driver</option>
                    </select>
                    <p class="alert-txt">{formErrors.driver_status}</p>
                </div>
            </div> 
            <div className="col">
                    <input name="trip_date" className="form-control" placeholder="Reserve Date"
                        type="text"
                        onFocus={(e) => e.target.type = 'date'} id="pickUpTime" onChange={(e) => {
                        settrip_date(e.target.value)
                        }}/>
            </div> 
            <br></br>
            <div class="form-outline mb-4">
            <div className="col">
                <div className="d-flex justify-content-around align-items-center">
                    <button type="submit" id="reg" onClick={HireVehicle} className="btn btnRegister ">Request Hire</button> 
                </div>
            </div>
            </div>        
            </form>
          </ul>
        </div>
      </div>
    </div>
    </center>
  </div>
  )
}

export default HireVehicle;