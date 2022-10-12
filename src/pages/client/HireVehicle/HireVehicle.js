import React from 'react';
import Axios from "axios";
import '../HireVehicle/HireVehicle.css';
import { useState, useEffect } from "react";
import VueSweetalert2 from "sweetalert2";



function HireVehicle(){

     const [Hire_id, setHire_id] = useState("");
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

        Hire_id,
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
            Hire_id,
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
        /*window.location.href = "/vehicle";*/
    });
  };


  useEffect(() => {

    Axios.get("http://localhost:8000/api/vehiclehire/all").then((response) => {

        setlistOfHires(response.data);
    });
  },[]);

  return(
    <div class="h-auto  w-auto p-0 rounded position-static" className='formview'>
      <div class="card mb-4" >
        <div class="card-header py-4" >
          <h5 class="text-center font-weight-bold h5" className='header'>Reserve a Vehicle</h5>
        </div>
        <div class="card-body" >
            <ul class="list-group list-group-flush">
                <form>
                    <div class="form-outline mb-4">
                        <input type="text" id="form6Example4" class="form-control"  value={client_name} placeholder="Full Name"  onChange={(event) => {setclient_name(event.target.value);}}/>
                        <p class="alert-txt">{formErrors.client_name}</p>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="text" id="form6Example4" class="form-control"placeholder="address" value={client_address} onChange={(event) => {setclient_address(event.target.value);}}/>
                        <p class="alert-txt">{formErrors.client_address}</p>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="text" id="form6Example4" class="form-control"placeholder="Email" value={client_email} onChange={(event) => {setclient_email(event.target.value);}}/>
                        <p class="alert-txt">{formErrors.client_email}</p>
                    </div>
                    <div class="form-outline mb-4">
                    <input type="text" id="form6Example4" class="form-control"placeholder="Phone" value={contact_no} onChange={(event) => {setcontact_no(event.target.value);}}/>
                    <p class="alert-txt">{formErrors.contact_no}</p>
                    </div>
                    <div class="form-outline mb-4">
                    <input type="text" id="form6Example4" class="form-control"placeholder="From" value={from} onChange={(event) => {setfrom(event.target.value);}}/>
                    <p class="alert-txt">{formErrors.from}</p>
                    </div>
                    <div class="form-outline mb-4">
                    <input type="text" id="form6Example4" class="form-control"placeholder="To" value={to} onChange={(event) => {setto(event.target.value);}}/>
                    <p class="alert-txt">{formErrors.to}</p>
                    </div>
                    <div class="form-outline mb-4">
                    <input type="text" id="form6Example4" class="form-control"placeholder="Passener Count" value={passanger_count} onChange={(event) => {setpassanger_count(event.target.value);}}/>
                    <p class="alert-txt">{formErrors.passanger_count}</p>
                    </div>
                    <div className="col">
                        < select onChange={(event) => {setdriver_status(event.target.value); }} name="Driver Status" className="form-select" value={driver_status} aria-label="role">
                            <option selected enabled value="0">Driver Choices</option>
                            <option value="With a Driver">With a Driver</option>
                            <option value="Without a Driver">Without a Driver</option>
                        </select>
                        <p class="alert-txt">{formErrors.driver_status}</p>
                    </div>
                    <div class="form-outline mb-4">
                        <input name="pickUpTime" className="form-control" placeholder="Reserve Date"
                                type="text"
                                value={trip_date}
                                onFocus={(e) => e.target.type = 'date'} id="pickUpTime" onChange={(e) => {
                                settrip_date(e.target.value)
                        }}/>
                        <p class="alert-txt">{formErrors.trip_date}</p>
                    </div>
                    
                    <div class="form-outline mb-4">
                        <div className="d-flex justify-content-around align-items-center">
                            <button
                                type="submit"
                                id="reg"
                                onClick={HireVehicle}
                                className="btn btnRegister ">
                                Hire Now
                            </button>     
                        </div>
                    </div>
                </form>
            </ul>
        </div>
    </div>
</div>
  )
}

export default HireVehicle;