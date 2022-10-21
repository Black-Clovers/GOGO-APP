import React from 'react';
import { Link } from "react-router-dom";
import './careerHome.css';
import Axios from "axios";
import { useState, useEffect } from "react";




const CareerHome = () => {

    const [listofVacancies, setListofVacancies] = useState([]);
    const [VacancySearch, setSearch] = useState("");



    useEffect(() => {
        Axios.get("http://localhost:8000/api/vacancy/all").then(res => {
            setListofVacancies(res.data);
            console.log(res.data);
        })
    }, [])



    return (
      
<div>

    <div>
        
    <div id="slidcard" class="container">
        <h1 className='hed2'>Let's work together to make traveling fun</h1>
    <h1 class="hed" >Join Our Team</h1>
    <div className="d-flex justify-content-center align-items-center mb-3">
                        <input id="searchID2" type="text"  className="form-control col-8 me-5" onChange={(e) => { setSearch(e.target.value); }}
                            placeholder="Job Position" />
                    </div>
                    <div>
                        <input id="searchbutton"type="button" className="form-control btnSearch text-white"
                            value="Search" 
                            />

                    </div>
   <div id="wrapperslide1" class="wrapper">
   
   <h1 className="heading">open possitions</h1>
        <p className="paragra">
            "We spend our time doing things that makes a differance: Doing things thats matter..."
        </p>
      <img id="imagescr"src="https://wallpaperaccess.com/full/1393442.jpg"></img>
      <img id="imagescr" src="https://getwallpapers.com/wallpaper/full/1/2/3/465232.jpg"></img>
      <img id="imagescr" src="https://rmkcdn.successfactors.com/e70b4886/febbcd2c-c532-4a95-afe1-8.jpg"></img>
      <img id="imagescr" src="https://assets.getsimpl.com/images/careers-banner-01.png"></img>
      <img id="imagescr" src="https://uploads-ssl.webflow.com/6168ac4b87d78527aba6ecb8/61b7fe798dcef228d04e27a2_Does%20your%20workplace%20reflect%20your%20company%20culture%20and%20values.jpg"></img>
   </div>

</div>
        
    </div>
  
       
        <div id="containcard" className='container'>
            <div className="row" id='searchva'>
                <div className="d-flex justify-content-end align-items-center">
                    


                </div>
            </div>

            <div id="maincon" className="main_container">
                <div id="con" className="item row fw-bold flex-wrap justify-content-between">
                    
                    {listofVacancies &&
                        listofVacancies.filter(value => {
                            if (VacancySearch === "") {
                                return value;
                            } else if (
                                value.Vacancy_Position.toLowerCase().includes(VacancySearch.toLowerCase())
                            ) {
                                return value
                            }
                        })
                        .map((CareerModel) => {
                           return (<div id='card' class="card col-5 mb-3" key={CareerModel._id}>
                                <div class="vacancy card-body">
                                    <h5 class="Vcard-title">{CareerModel.Vacancy_Position}</h5>
                                    <label for="inputState" class="posform-label">No of Positions :</label>
                                    <h8 className="No_of_Positions">{CareerModel.No_of_Positions}</h8>
                                    <label for="inputState" class="posform-label">Location :</label>
                                    <h8 className="location">{CareerModel.Location}</h8>
                                    <div className='details'>
                                        <label for="inputState" class="detailsform-label">Details :</label>
                                        <p class="detailcard-text">{CareerModel.Details}</p>
                                    </div>
                                    <label for="inputState" class="dateform-label">Date Posted :</label>
                                    <h1 className="dateh1">{CareerModel.Date_Posted}</h1>
                                    <a href="./registerVacancy" id='applybut' class="btn btn-primary float-end">Apply</a>
                                </div>
                            </div>)



                        


                        })
                    
                    }

                 

               
                    </div>
                </div>
            </div>

          
                
           
        </div>

       
        
    )
}

export default CareerHome;
