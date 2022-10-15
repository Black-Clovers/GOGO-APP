import React, {useEffect, useState} from 'react';
import '../ride/ride.css';
import axios from 'axios';
import MapContainer from "../../../components/admin/common/map/MapContainer";

function RidePage(props) {

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    const [clients, setClients] = useState([]);
    const [client_ID, setClient_ID] = useState("");
    const [client_FirstName, setClient_FirstName] = useState("");
    const [client_LastName, setClient_LastName] = useState("");
    const [client_profilePicture, setClient_profilePicture] = useState("");
    const [client_UserName, setClient_UserName] = useState("");
    const [client_Email, setClient_Email] = useState("");
    const [client_Mobile, setClient_Mobile] = useState("");
    const [client_NIC, setClient_NIC] = useState("");
    const [client_Password, setClient_Password] = useState("12345");
    const [client_Gender, setClient_Gender] = useState("");
    const [client_DOB, setClient_DOB] = useState("");
    const [client_Status, setClient_Status] = useState("");
    const [client_Address, setClient_Address] = useState("");


    useEffect(() => {
        getAll();
    }, []);


    const getAll = () => {
        axios.get("http://localhost:8000/api/client/all/").then((response) => {
            console.log(response.data.data);
            setClients(response.data.data);
        })
    };

    const editClient = (client) => {
        console.log("Hello")
        setClient_ID(client._id)
        setClient_profilePicture(client.client_profilePicture);
        setClient_FirstName(client.client_FirstName);
        setClient_LastName(client.client_LastName);
        setClient_UserName(client.client_UserName);
        setClient_Email(client.client_Email);
        setClient_Mobile(client.client_Mobile);
        setClient_NIC(client.client_NIC);
        setClient_Address(client.client_Address);
        setClient_Gender(client.client_Gender);
        setClient_DOB(client.client_DOB);
        setClient_Status(client.client_Status);

        document.getElementById("btnImgDelete").removeAttribute("disabled");
        document.getElementById("btnEditImg").removeAttribute("disabled");
        document.getElementById("btnAddImg").setAttribute("disabled", "true");
    }

    const displayAllClients = () => {
        return clients.map((client) => {
            return (<tr itemScope="row" id={client._id} key={client._id}>
                <td>
                    {client._id}
                </td>
                <td>{client.client_FirstName}</td>
                <td>
                    {client.client_LastName}
                </td>
                <td>
                    <img src={client.client_profilePicture} alt="profile picture" width={25} height={25}/>
                </td>
                <td> {client.client_UserName}</td>
                <td> {client.client_Address}</td>
                <td> {client.client_Mobile}</td>
                <td> {client.client_Email}</td>
                <td> {client.client_Gender}</td>
                <td> {client.client_NIC}</td>
                {/*<td> {client.client_Password}</td>*/}

                <td> {client.client_DOB}</td>
                <td> {client.client_Status}</td>

                <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline" onClick={() => {
                        editClient(client)
                    }}/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline" onClick={() => {
                        deleteClient(client)
                    }}/>
                </td>
            </tr>)
        });
    };

    const addClient = () => {
        const newClient = {
            "client_ID": "client_ID",
            "client_FirstName": client_FirstName,
            "client_LastName": client_LastName,
            "client_profilePicture": client_profilePicture,
            "client_UserName": client_UserName,
            "client_Email": client_Email,
            "client_Mobile": client_Mobile,
            "client_NIC": client_NIC,
            "client_Password": client_Password,
            "client_Gender": client_Gender,
            "client_DOB": client_DOB,
            "client_Status": client_Status,
            "client_Address": client_Address,
        }

        axios.post("http://localhost:8000/api/client/", newClient).then((response) => {
            if (response.data.result.response) {
                alert("RidePage Added");
                getAll();
            }
        })
    }

    const updateClient = () => {
        const newClient = {
            "client_ID": client_ID,
            "client_FirstName": client_FirstName,
            "client_LastName": client_LastName,
            "client_profilePicture": client_profilePicture,
            "client_UserName": client_UserName,
            "client_Email": client_Email,
            "client_Mobile": client_Mobile,
            "client_NIC": client_NIC,
            "client_Password": client_Password,
            "client_Gender": client_Gender,
            "client_DOB": client_DOB,
            "client_Status": client_Status,
            "client_Address": client_Address,
        }

        axios.put("http://localhost:8000/api/client/", newClient).then((response) => {
            if (response.data.result.response) {
                alert("RidePage Updated");
                getAll();
            }
        })
    }

    const deleteClient = (client) => {
        console.log(client)
        axios.delete(`http://localhost:8000/api/client/${client._id}`).then((response) => {
            if (response.data.result.response) {
                alert("RidePage Deleted");
                getAll();
            }
        })
    }

    const searchClient = () => {
        if (client_ID === null || client_ID === undefined || client_ID === "") {
            alert("Please insert the client ID");
        } else {
            axios.get(`http://localhost:8000/api/client/${client_ID}`).then((response) => {
                let searchedClient = [];
                searchedClient.push(response.data.data)
                setClients(searchedClient);
            })
        }
    };

    return (
        <div className="RideDiv px-4">
            <div className="main_container">
                <div className="item">
                    <div className="row mt-5 px-3 me-0">
                        <form>
                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="oneWay"/>
                                        <label className="form-check-label" htmlFor="oneWay">One Way Trip</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" id="return"/>
                                        <label className="form-check-label" htmlFor="return">Return Trip</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Pickup Location"
                                           onChange={(e) => {
                                               setClient_UserName(e.target.value)
                                           }}
                                           value={client_UserName}
                                    />
                                </div>
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Drop Off Location"
                                           onChange={(e) => {
                                               setClient_Email(e.target.value)
                                           }}
                                           value={client_Email}
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
                                           value={client_DOB}
                                           onFocus={(e) => e.target.type = 'date'} id="pickUpDate" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                                </div>
                                <div className="col">
                                    <input name="pickUpTime"
                                           className="form-control"
                                           placeholder="Pick Up Time"
                                           type="text"
                                           value={client_DOB}
                                           onFocus={(e) => e.target.type = 'date'} id="pickUpTime" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <select name="type" value={client_Gender} className="form-select"
                                            aria-label="role" onChange={(e) => {
                                        setClient_Gender(e.target.value)
                                    }}>
                                        <option selected disabled value="0">Vehicle Type</option>
                                        <option defaultValue="1">Car</option>
                                        <option defaultValue="2">Cab</option>
                                        <option defaultValue="2">Tuk Tuk</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-5 pb-4">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnRegister" onClick={() => {
                                        addClient()
                                    }}>Register
                                    </button>
                                    <button type="button" className="btn btnDelete">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RidePage;