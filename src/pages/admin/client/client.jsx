import React, {useEffect, useState} from 'react';
import '../client/client.css';
import axios from 'axios'


const Client = () => {
    const [clients, setClients] = useState([]);
    const [client_ID, setClient_ID] = useState("");
    const [client_FirstName, setClient_FirstName] = useState("");
    const [client_LastName, setClient_LastName] = useState("");
    const [client_profilePicture, setClient_profilePicture] = useState("");
    const [client_UserName, setClient_UserName] = useState("");
    const [client_Email, setClient_Email] = useState("");
    const [client_Mobile, setClient_Mobile] = useState("");
    const [client_NIC, setClient_NIC] = useState("");
    const [client_Password, setClient_Password] = useState("");
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

    const displayAllClients = () => {
        return clients.map((client) => {
            return (<tr itemScope="row" id={client._id} key={client._id}>
                <td>
                    {client.client_ID}
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
                    <i className="fa-solid fa-pen me-3 text-primary d-inline"/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                </td>
            </tr>)
        });
    };

    const addImageToProfile = () => {
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
                    console.log("Hello")
                    let fileReader = new FileReader();
                    fileReader.onload = function (event) {

                        console.log(event)
                        setClient_profilePicture(event.target.result);
                    }
                }
                // setClient_profilePicture(imgUploaderElement.file[0]);
            });
        }
    }

    const addClient = () => {
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

        console.log(newClient);
    }

    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">
                    Client Management
                </div>
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <button id="btn-generate-report" className="btn me-3">Generate Report</button>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <input id="searchID" type="text" className="form-control col-8 me-5"
                                                   placeholder="ID" onChange={(e) => {
                                                setClient_ID(e.target.value)
                                            }}/>
                                        </div>
                                        <div>
                                            <input type="button" className="form-control btnSearch text-white"
                                                   defaultValue="Search"/>
                                        </div>
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
                                            <button className="btn btnAddImg" type="button" onClick={() => {
                                                addImageToProfile()
                                            }}>
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
                                    <div id="imgInputDiv">
                                        <div>
                                            <img className="imgDiv" src={client_profilePicture} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="First Name"
                                           onChange={(e) => {
                                               setClient_FirstName(e.target.value)
                                           }}/>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last Name"
                                           onChange={(e) => {
                                               setClient_LastName(e.target.value)
                                           }}/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="User Name"
                                           onChange={(e) => {
                                               setClient_UserName(e.target.value)
                                           }}
                                    />
                                </div>
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Email"
                                           onChange={(e) => {
                                               setClient_Email(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="tel" className="form-control" placeholder="Mobile Number"
                                           onChange={(e) => {
                                               setClient_Mobile(e.target.value)
                                           }}
                                    />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NIC"
                                           onChange={(e) => {
                                               setClient_NIC(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <select name="gender" className="form-select" aria-label="role" onChange={(e) => {
                                        setClient_Gender(e.target.value)
                                    }}>
                                        <option selected disabled value="0">Gender</option>
                                        <option defaultValue="1">Male</option>
                                        <option defaultValue="2">Female</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <input name="dateOfBirth"
                                           className="form-control"
                                           placeholder="Date of Birth"
                                           type="text"
                                           onFocus={(e) => e.target.type = 'date'} id="dateOfBirth" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                                </div>
                                <div className="col">
                                    <select name="status" className="form-select" aria-label="role" onChange={(e) => {
                                        setClient_Status(e.target.value)
                                    }}>
                                        <option selected disabled value="0">Status</option>
                                        <option value="1">Online</option>
                                        <option value="2">Offline</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnRegister" onClick={() => {
                                        addClient()
                                    }}>Register
                                    </button>
                                    <button type="button" className="btn btnUpdate">Update</button>
                                    <button type="button" className="btn btnDelete">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <h6 className="mb-0 fw-bold mt-2 mb-2">Client</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Profile Picture</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">NIC</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Status</th>
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

export default Client;