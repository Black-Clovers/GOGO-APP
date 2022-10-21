
import React from "react";
import {useParams} from "react-router-dom";
import {useState, useEffect } from "react";
import Axios from "axios";

import "./travelPackage.css"
import img1 from "../../../assets/images/travelimages/img1.jpg"
import img2 from "../../../assets/images/travelimages/img2.jpg"



function PackageDetails(){

    const {id} = useParams();
    const [client_DOB, setClient_DOB] = useState("");
    const [package_ids, setpkg_id] = useState("");
    const [package_name, setpkg_name] = useState("");
    const [vehicle_type, setpkg_vehicle] = useState(0);
    const [contacts, setcontacts] = useState("");
    const [image_url, setimage_url] = useState("");
    const [mpassengers, setpkg_passenger] = useState("");
    const [price, setpkg_price] = useState("");
    const [status, setpkg_status] = useState(0);
    const [package_include, setinclude] = useState("");
    const [package_overview, setpkg_overview] = useState("");
    const [add_info, setpkg_info] = useState("");

    

      useEffect(() => {
      Axios.get(`http://localhost:8000/api/package/${id}`).then(res => {
        setpkg_name(res.data.package_name);
        setimage_url(res.data.image_url);
        setpkg_vehicle(res.data.vehicle_type);
        setcontacts(res.data.contacts);
        setinclude(res.data.package_include);
        setpkg_overview(res.data.package_overview);
        setpkg_info(res.data.add_info);
        setpkg_price(res.data.price);
          
          
          console.log(res.data);
          })		
      }, [])
      

return(




<div>
<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={img1} class="imgblock" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img2} class="imgblock" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>





    
    <div className="travl-heading">
        <h2> {package_name}</h2>

</div>
<div class="row">
<div className="travl-img mt-4 mx-auto">
<img src={image_url} class="imgblock" alt="..." />
</div>

    <div class="col-md-5 mb-5 mt-4 mx-auto ">
      <div class="card mb-5">
        <div class="card-header py-3">
          <h5 class="text-center font-weight-bold h4">Reserve Now</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <h4 className='mb-4'> ${price}</h4>
            <form>
           
           
                                
                                <div class="form-outline mb-4">
                                <input name="pickUpTime" className="form-control" placeholder="Reserve Date"
                                           type="text"
                                           value={client_DOB}
                                           onFocus={(e) => e.target.type = 'date'} id="pickUpTime" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                                </div>
             <div class="form-outline mb-4">
              <input type="text" id="form6Example4" class="form-control"placeholder="Email"/>


            </div>
            <div class="form-outline mb-4">
              <input type="text" id="form6Example4" class="form-control"placeholder="Phone"/>
              

            </div>
            <div class="form-outline mb-4">
            <div className="d-flex justify-content-around align-items-center">
                  <button
                    type="submit"
                    id="reg"
                    className="btn btnRegister "
                  >
                    Reserve Now
                  </button>
             
</div>
            </div>
            
</form>

          </ul>
        </div>
      </div>
    </div>
  </div>


<div class="row">
    <div class="col-sm">
    <div className="info-header"> <p>
    Additional Info</p></div>

    <div className="infoborder">
      <p>{add_info}</p>
      <div  className="row"  >
                <h3 class="pkg-price" >  <i class="fa fa-envelope" aria-hidden="true"></i>   <a href="gogotravels@gmail.com">    gogotravels@gmail.com </a>    <i class="fa fa-phone" aria-hidden="true"></i>  {contacts} </h3>
                
                </div>
    </div>
    </div>
    <div class="col-sm">
    <div className="info-header">
      <p>Package includes</p>
      </div>
      <div className="infoborder">
      <p>{package_overview}</p>
    </div>
    
    </div>
  </div>


</div>

)





}

export default PackageDetails;