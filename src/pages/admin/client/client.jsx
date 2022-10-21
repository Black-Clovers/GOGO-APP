import React, {useEffect, useState} from 'react';
import '../client/client.css';
import axios from 'axios';
import ClientValidation from '../../../validation/ClientValidation';
import VueSweetalert2 from "sweetalert2";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";


const Client = () => {
    const [clients, setClients] = useState([]);
    const [errors, setErrors] = useState({});
    const [client_ID, setClient_ID] = useState("");
    const [client_FirstName, setClient_FirstName] = useState("");
    const [client_LastName, setClient_LastName] = useState("");
    const [client_profilePicture, setClient_profilePicture] = useState("https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png");
    const [client_UserName, setClient_UserName] = useState("");
    const [client_Email, setClient_Email] = useState("");
    const [client_Mobile, setClient_Mobile] = useState("");
    const [client_NIC, setClient_NIC] = useState("");
    const [client_Password, setClient_Password] = useState("hello12@");
    const [client_Conf_Password, setClient_Conf_Password] = useState("hello12@");
    const [client_Gender, setClient_Gender] = useState("0");
    const [client_DOB, setClient_DOB] = useState("");
    const [client_Status, setClient_Status] = useState("0");
    const [client_Address, setClient_Address] = useState("");
    const [searchedClient, setSearchedClient] = useState("");


    useEffect(() => {
        getAll();
        document.getElementById("btnEditImg").setAttribute("disabled", "true");
        document.getElementById("btnImgDelete").setAttribute("disabled", "true");
    }, []);


    const getAll = () => {
        axios.get("http://localhost:8000/api/client/all/").then((response) => {
            setClients(response.data.data);
        })
    };

    const editClient = (client) => {
        setClient_ID(client._id);
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

        const searchedClient = {
            "_id": client_ID,
            "id": client_ID,
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

        setSearchedClient(searchedClient);

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
                    <i style={{"cursor": "pointer"}} className="fa-solid fa-pen me-3 text-primary d-inline"
                       onClick={() => {
                           editClient(client)
                       }}/>
                    <i style={{"cursor": "pointer"}}
                       className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline" onClick={() => {
                        deleteClient(client)
                    }}/>
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
                    if (imgUploaderElement.files.length > 0) {
                        const fileReader = new FileReader();

                        fileReader.onload = function (event) {
                            setClient_profilePicture(event.target.result);
                        };

                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }

        document.getElementById("btnEditImg").removeAttribute("disabled");
        document.getElementById("btnImgDelete").removeAttribute("disabled");
    }

    const updateImageToProfile = () => {
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
                            setClient_profilePicture(event.target.result);
                        };

                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }

    }

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

        const {isInvalid, errors} = ClientValidation(
            newClient
        );

        if (isInvalid) {
            setErrors(errors);
            console.log(errors);
            VueSweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Please enter your details',
            });
        } else {
            setErrors(errors);
            axios.post("http://localhost:8000/api/client/", newClient).then((response) => {
                if (response.data.result.response) {
                    VueSweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: 'Your client details added to the System',
                    });
                    setClient_ID("")
                    setClient_profilePicture("");
                    setClient_FirstName("");
                    setClient_LastName("");
                    setClient_UserName("");
                    setClient_Email("");
                    setClient_Mobile("");
                    setClient_NIC("");
                    setClient_Address("");
                    setClient_Gender("");
                    setClient_DOB("");
                    setClient_Status("");
                    getAll();
                }
            })
        }
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
        setErrors(errors);
        axios.put("http://localhost:8000/api/client/", newClient).then((response) => {
            if (response.data.result.response) {
                VueSweetalert2.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: 'Your client details updated',
                });
                getAll();

                setClient_ID("")
                setClient_profilePicture("");
                setClient_FirstName("");
                setClient_LastName("");
                setClient_UserName("");
                setClient_Email("");
                setClient_Mobile("");
                setClient_NIC("");
                setClient_Address("");
                setClient_Gender("");
                setClient_DOB("");
                setClient_Status("");
                getAll();
            }
        })
    }

    const removeProfileImages = () => {
        document.getElementById("ProfileImage").removeAttribute("src");
        document.getElementById("btnImgDelete").setAttribute("disabled", "true");
    }

    const deleteClient = (client) => {
        VueSweetalert2.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/client/${client._id}`).then((response) => {
                    if (response.data.result.response) {
                        VueSweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAll();
                    } else {
                        VueSweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAll();
                    }
                })

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

    const generatePDF = () => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'Client Details', 'center');

        const head = [['ID', 'First Name', 'Last Name',
            'User Name', 'Address', 'Mobile', 'Email', 'Gender', 'NIC', 'DOB']];
        const elements = clients.map(client => [client._id, client.client_FirstName, client.client_LastName,
            client.client_Address, client.client_Mobile, client.client_Email, client.client_Gender, client.client_NIC]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
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
                                        <button onClick={() => {
                                            generatePDF()
                                        }} id="btn-generate-report" className="btn me-3">Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 px-3">
                        <form id="clientForm">
                            <div className="row">
                                <div className="col d-flex justify-content-end align-items-center">
                                    <div className="col d-flex justify-content-end">
                                        <div>
                                            <button className="btn btnAddImg" id="btnAddImg" type="button"
                                                    onClick={() => {
                                                        addImageToProfile()
                                                    }}>
                                                <i className="fa fa-plus text-white" aria-hidden="true"/>
                                            </button>
                                            <button className="btn btnEditImg" id="btnEditImg" type="button"
                                                    onClick={() => {
                                                        updateImageToProfile()
                                                    }}>
                                                <i className="fa-solid fa-pen text-white"/>
                                            </button>
                                            <button className="btn btnImgDelete" id="btnImgDelete" type="button"
                                                    onClick={() => {
                                                        removeProfileImages()
                                                    }}>
                                                <i className="fa-solid fa-trash-can d-inline text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="imgInputDiv">
                                        <div>
                                            <img id="ProfileImage" className="imgDiv" src={client_profilePicture}
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="First Name"
                                           onChange={(e) => {
                                               setClient_FirstName(e.target.value)
                                           }} value={client_FirstName}/>
                                    <small id="client_FirstName"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_FirstName}</small>

                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last Name"
                                           onChange={(e) => {
                                               setClient_LastName(e.target.value)
                                           }} value={client_LastName}/>
                                    <small id="client_LastName"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_LastName}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="User Name"
                                           onChange={(e) => {
                                               setClient_UserName(e.target.value)
                                           }}
                                           value={client_UserName}
                                    />
                                    <small id="client_UserName"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_UserName}</small>
                                </div>
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Email"
                                           onChange={(e) => {
                                               setClient_Email(e.target.value)
                                           }}
                                           value={client_Email}
                                    />
                                    <small id="client_Email"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_Email}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="tel" className="form-control" placeholder="Mobile Number"
                                           onChange={(e) => {
                                               setClient_Mobile(e.target.value)
                                           }}
                                           value={client_Mobile}
                                    />
                                    <small id="client_Mobile"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_Mobile}</small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NIC"
                                           onChange={(e) => {
                                               setClient_NIC(e.target.value)
                                           }}
                                           value={client_NIC}
                                    />
                                    <small id="client_NIC"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_NIC}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <textarea className="form-control" placeholder="Address"
                                              value={client_Address}
                                              onChange={(e) => {
                                                  setClient_Address(e.target.value)
                                              }}
                                    />
                                    <small id="client_Address"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_Address}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <select name="gender" value={client_Gender} className="form-select"
                                            aria-label="role" onChange={(e) => {
                                        setClient_Gender(e.target.value)
                                    }}>
                                        <option selected disabled value="0">Gender</option>
                                        <option defaultValue="1">Male</option>
                                        <option defaultValue="2">Female</option>
                                    </select>
                                    <small id="client_Gender"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_Gender}</small>
                                </div>
                                <div className="col">
                                    <input name="dateOfBirth"
                                           className="form-control"
                                           placeholder="Date of Birth"
                                           type="text"
                                           value={client_DOB}
                                           onFocus={(e) => e.target.type = 'date'} id="dateOfBirth" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                                    <small id="client_DOB"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_DOB}</small>
                                </div>
                                <div className="col">
                                    <select name="status" className="form-select" aria-label="role" onChange={(e) => {
                                        setClient_Status(e.target.value)
                                    }} value={client_Status}>
                                        <option selected disabled value="0">Status</option>
                                        <option value="1">Online</option>
                                        <option value="2">Offline</option>
                                    </select>
                                    <small id="client_Status"
                                           className="d-block text-danger form-text invalid-feedback">{errors.client_Status}</small>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnRegister" onClick={() => {
                                        addClient()
                                    }}>Register
                                    </button>
                                    <button type="button" className="btn btnUpdate" onClick={() => {
                                        updateClient()
                                    }}>Update
                                    </button>
                                    <button onClick={() => {
                                        deleteClient(searchedClient)
                                    }} type="button" className="btn btnDelete">Delete
                                    </button>
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
                                           placeholder="ID" onChange={(e) => {
                                        setClient_ID(e.target.value)
                                    }} value={client_ID}/>
                                </div>
                                <div>
                                    <input type="button" className="form-control btnSearch text-white"
                                           defaultValue="Search" onClick={() => {
                                        searchClient()
                                    }}/>
                                </div>
                            </div>
                        </div>


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