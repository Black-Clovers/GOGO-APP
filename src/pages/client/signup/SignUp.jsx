import React, {useEffect, useState} from 'react';
import './signup.css'
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import axios from "axios";


const SignUp = () => {


    const [errors, setErrors] = useState({});
    const [client_ID, setClient_ID] = useState("");
    const [client_FirstName, setClient_FirstName] = useState("Madhusha");
    const [client_LastName, setClient_LastName] = useState("Prasad");
    const [client_profilePicture, setClient_profilePicture] = useState("https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png");
    const [client_UserName, setClient_UserName] = useState("Madhush99");
    const [client_Email, setClient_Email] = useState("madushaprasad21@gmail.com");
    const [client_Mobile, setClient_Mobile] = useState("+94716035826");
    const [client_NIC, setClient_NIC] = useState("991040293V");
    const [client_Password, setClient_Password] = useState("hello12@");
    const [client_Conf_Password, setClient_Conf_Password] = useState("hello12@");
    const [client_Gender, setClient_Gender] = useState("1");
    const [client_DOB, setClient_DOB] = useState("2022-09-09");
    const [client_Status, setClient_Status] = useState("1");
    const [client_Address, setClient_Address] = useState("Kalutara");

    useEffect(() => {
        let signUp = document.getElementById("signUp");
        let signIn = document.getElementById("signIn");
        let container = document.getElementById("container");

        console.log(signIn)

        signUp.addEventListener("click", function () {
            container.classList.add("right-panel-active");
        });

        signIn.addEventListener("click", function () {
            container.classList.remove("right-panel-active");
        })
    }, [])

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
                }
            })
        }
    }

    const checkLogin = () => {
        console.log("Hello")
        const chekLogin = {
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

        axios.post("http://localhost:8000/api/client/login/", chekLogin).then((response) => {
            if (response.data.data === null) {
                VueSweetalert2.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'error',
                    title: 'Please Enter Your Email and Password Correctly',
                });
            } else {
                setClient_Email("");
                setClient_Password("");
                document.location.href = "http://localhost:3000/admin"
            }
        })
    }

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container" style={{"overflow-y": "scroll"}}>
                <form className="signUpForm form" style={{"height": "auto"}}>
                    <h1 className="h1" style={{"margin-top": "50px"}}>Create Account</h1>
                    <span className="span mb-3 mt-4">or use your email for registration</span>

                    <div className="row">
                        <div className="col-12">
                            <input type="text" className="form-control" placeholder="First Name"
                                   onChange={(e) => {
                                       setClient_FirstName(e.target.value)
                                   }} value={client_FirstName}/>
                            <small id="client_FirstName"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_FirstName}</small>

                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control" placeholder="Last Name"
                                   onChange={(e) => {
                                       setClient_LastName(e.target.value)
                                   }} value={client_LastName}/>
                            <small id="client_LastName"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_LastName}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input type="text" className="form-control" placeholder="User Name"
                                   onChange={(e) => {
                                       setClient_UserName(e.target.value)
                                   }}
                                   value={client_UserName}
                            />
                            <small id="client_UserName"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_UserName}</small>
                        </div>
                        <div className="col-12">
                            <input type="email" className="form-control" placeholder="Email"
                                   onChange={(e) => {
                                       setClient_Email(e.target.value)
                                   }}
                                   value={client_Email}
                            />
                            <small id="client_Email"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_Email}</small>
                        </div>
                    </div>
                    <div className="row w-100">
                        <div className="col-12 p-0">
                        <textarea className="form-control" placeholder="Address"
                                  onChange={(e) => {
                                      setClient_Address(e.target.value)
                                  }}
                                  value={client_Address}
                        />
                            <small id="client_Address"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_Address}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input type="tel" className="form-control" placeholder="Mobile Number"
                                   onChange={(e) => {
                                       setClient_Mobile(e.target.value)
                                   }}
                                   value={client_Mobile}
                            />
                            <small id="client_Mobile"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_Mobile}</small>
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control" placeholder="NIC"
                                   onChange={(e) => {
                                       setClient_NIC(e.target.value)
                                   }}
                                   value={client_NIC}
                            />
                            <small id="client_NIC"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_NIC}</small>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-12">
                            <select name="gender" value={client_Gender} className="form-select"
                                    aria-label="role" onChange={(e) => {
                                setClient_Gender(e.target.value)
                            }}>
                                <option selected disabled value="0">Gender</option>
                                <option defaultValue="1">Male</option>
                                <option defaultValue="2">Female</option>
                            </select>
                            <small id="client_Gender"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_Gender}</small>
                        </div>
                        <div className="col-12">
                            <input name="dateOfBirth"
                                   className="form-control"
                                   placeholder="Date of Birth"
                                   type="text"
                                   value={client_DOB}
                                   onFocus={(e) => e.target.type = 'date'} id="dateOfBirth" onChange={(e) => {
                                setClient_DOB(e.target.value)
                            }}/>
                            <small id="client_DOB"
                                   className="d-block text-start text-danger form-text invalid-feedback">{errors.client_DOB}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={(e) => {
                                       setClient_Password(e.target.value)
                                   }}
                                   value={client_Password}
                            />
                            <small id="client_Password"
                                   className="d-block text-danger text-start form-text invalid-feedback">{errors.client_Password}</small>
                        </div>
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder="Confirm Password"
                                   onChange={(e) => {
                                       setClient_Conf_Password(e.target.value)
                                   }}
                                   value={client_Conf_Password}
                            />
                            {/*<small id="client_Conf_password"*/}
                            {/*       className="d-block text-danger form-text invalid-feedback">{errors.client_Password}</small>*/}
                        </div>
                    </div>
                    <button type="button" className="btn button mt-5 mb-5"
                            onClick={() => {
                                addClient()
                            }}>Register
                    </button>
                </form>
            </div>


            <div className="form-container sign-in-container">
                <form className="loginForm form">
                    <h1 className="h1">Sign in</h1>
                    <span className="span">or use your account</span>
                    <input type="email" className="form-control mt-2" placeholder="Email" name="email" id="sEmail"
                           onChange={(e) => {
                               setClient_Email(e.target.value)
                           }}/>
                    <input type="password" className="form-control mt-2" placeholder="Password" name="password"
                           id="sPassword" onChange={(e) => {
                        setClient_Password(e.target.value)
                    }}/>
                    <a className="a" style={{"cursor": "pointer"}}>Forgot your password?</a>
                    <button type="button" id="signInCheck" className="button" onClick={() => {
                        checkLogin();
                    }}>Sign In
                    </button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="h1">Welcome Back!</h1>
                        <p className="p">To keep connected with us please login with your personal info</p>
                        <button className="ghost button" id="signIn">Sign In</button>
                    </div>

                    <div className="overlay-panel overlay-right">
                        <h1 className="h1">Hello!</h1>
                        <p className="p">Enter your personal details and start journey with us</p>
                        <button className="ghost btn button" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default SignUp;