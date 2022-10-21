import React, {useEffect, useState} from 'react';
import '../ride/ride.css';
import axios from 'axios';
import MapContainer from "../../../components/admin/common/map/MapContainer";
import VueSweetalert2 from "sweetalert2";


const Ride = () => {

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    const [trips, setTrips] = useState([]);
    const [tripID, setTripID] = useState('');
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropOffLocation, setDropOffLocation] = useState('');
    const [tripType, setTripType] = useState("OneWay");
    const [pickUpdate, setPickUpdate] = useState("15-10-2022");
    const [pickUpTime, setPickUpTime] = useState("15.25 P.M");
    const [vehicleType, setVehicleType] = useState("Car");
    const [currentUser, setCurrentUser] = useState({});
    const [currentDriver, setCurrentDriver] = useState({});


    useEffect(() => {
        getAll();
    }, []);


    const getAll = () => {
        axios.get("http://localhost:8000/api/trip/all/").then((response) => {
            console.log(response.data.data);
            setTrips(response.data.data);
        })
    };

    const addTrip = () => {
        const newTrip = {
            "trip_ID": "trip_ID",
            "trip_Type": tripType,
            "client": currentUser,
            "driver": currentDriver,
            "trip_pickUp_Location": {},
            "trip_dropOff_Location": {},
            "trip_pickUp_Date": pickUpdate,
            "trip_pickUp_Time": pickUpTime,
            "trip_vehicle_Type": vehicleType,
            "trip_Status": "0",
        }

        axios.post("http://localhost:8000/api/trip/", newTrip).then((response) => {
            if (response.data.result.response) {
                VueSweetalert2.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: 'RidePage Added',
                });
                getAll();
            }
        })
    }

    const displayAllClients = () => {
        return trips.map((trip) => {
            return (<tr itemScope="row" id={trip._id} key={trip._id}>
                <td>
                    {trip._id}
                </td>
                <td>{trip.trip_Type}</td>
                <td>
                    {trip.client}
                </td>
                <td>
                    {trip.driver}
                </td>
                <td> {trip.trip_pickUp_Location}</td>
                <td> {trip.trip_dropOff_Location}</td>
                <td> {trip.trip_pickUp_Date}</td>
                <td> {trip.trip_pickUp_Time}</td>
                <td> {trip.trip_vehicle_Type}</td>
                <td> {trip.trip_Status}</td>
                <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline"/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline" onClick={() => {
                        deleteClient(trip)
                    }}/>
                </td>
            </tr>)
        });
    };


    const deleteClient = (trip) => {
        console.log(trip)
        axios.delete(`http://localhost:8000/api/client/${trip._id}`).then((response) => {
            if (response.data.result.response) {
                alert("RidePage Deleted");
                getAll();
            }
        })
    }

    const searchTrip = () => {
        if (tripID === null || tripID === undefined || tripID === "") {
            alert("Please insert the client ID");
        } else {
            axios.get(`http://localhost:8000/api/trip/${tripID}`).then((response) => {
                let searchedTrips = [];
                searchedTrips.push(response.data.data)
                setTrips(searchedTrips);
            })
        }
    };

    return (
        <div>
            <div className="main_container">
                <div className="item">
                    <div className="row mt-5 px-3 me-0">
                        <form>
                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="oneWay" onChange={(e) => {
                                            setTripType(e.target.value)
                                        }} value={tripType}/>
                                        <label className="form-check-label" htmlFor="oneWay">One Way Trip</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="return" onChange={(e) => {
                                            setTripType(e.target.value)
                                        }} value={tripType}/>
                                        <label className="form-check-label" htmlFor="return">Return Trip</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Pickup Location"
                                           onChange={(e) => {
                                               setPickUpLocation(e.target.value)
                                           }}
                                           value={pickUpLocation}
                                    />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Drop Off Location"
                                           onChange={(e) => {
                                               setDropOffLocation(e.target.value)
                                           }}
                                           value={dropOffLocation}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <MapContainer/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input name="pickUpDate"
                                           className="form-control"
                                           placeholder="Pick Up Date"
                                           type="text"
                                           value={pickUpdate}
                                           onFocus={(e) => e.target.type = 'date'} id="pickUpDate" onChange={(e) => {
                                        setPickUpdate(e.target.value)
                                    }}/>
                                </div>
                                <div className="col">
                                    <input name="pickUpTime"
                                           className="form-control"
                                           placeholder="Pick Up Time"
                                           type="text"
                                           value={pickUpTime}
                                           onFocus={(e) => e.target.type = 'time'} id="pickUpTime" onChange={(e) => {
                                        setPickUpTime(e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <select name="type" value={vehicleType} className="form-select"
                                            aria-label="role" onChange={(e) => {
                                        setVehicleType(e.target.value)
                                    }}>
                                        <option selected disabled value="0">Vehicle Type</option>
                                        <option defaultValue="1">Car</option>
                                        <option defaultValue="2">Cab</option>
                                        <option defaultValue="2">Tuk Tuk</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnRegister" onClick={() => {
                                        addTrip()
                                    }}>Register
                                    </button>
                                    <button type="button" className="btn btnUpdate">Update
                                    </button>
                                    <button type="button" className="btn btnDelete">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <div className="col-6">
                            <h6 className="mb-0 fw-bold mt-2">Client</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <input id="searchID" type="text" className="form-control col-8 me-5"
                                           placeholder="ID"/>
                                </div>
                                <div>
                                    <input type="button" className="form-control btnSearch text-white"
                                           defaultValue="Search" onClick={() => {
                                        searchTrip()
                                    }}/>
                                </div>
                            </div>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Trip Type</th>
                                    <th scope="col">PickUp Location</th>
                                    <th scope="col">DropOff Location</th>
                                    <th scope="col">Vehicle Type</th>
                                    <th scope="col">PickUp Date</th>
                                    <th scope="col">PickUp Time</th>
                                    <th scope="col">Vehicle Type</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displayAllClients()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ride;