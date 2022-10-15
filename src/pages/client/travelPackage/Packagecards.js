
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function PackageDetails(){
  
    
  const [listOfPackages, setlistOfPackages] = useState([]);
    useEffect(() => {
      Axios.get("http://localhost:8000/api/package/all").then((response) => {
        setlistOfPackages(response.data);
      });
    }, [])

   
   
   
    return(

        <div>
          

<div>
      <Carousel breakPoints={breakPoints}>
          {listOfPackages && listOfPackages.map((travelpackage,i) => {
            return (
             
            <div class="card" id="topcrs-crd">
              <img src={travelpackage.image_url} class="card-img-top" alt="..."/>
              <div class="card-body">
                <h3 class="card-title">{travelpackage.package_name}</h3>
                <p class="card-text">{travelpackage.package_overview}</p>
               <div  className="row"  >
                <h3 class="pkg-price" ><i class="fa fa-usd fa-2x" aria-hidden="true"></i>  {travelpackage.price}  <i class="fa fa-users fa-2x" aria-hidden="true">  </i>  {travelpackage.mpassengers}</h3>
                
                </div>
                  
                
                <span class="crsaction_btn">
                <Link to={`/client/pkgdetails/${travelpackage._id}`}>Reserve Now</Link>
            </span>
               
              </div>

            <div>
 







            </div>

            </div>
          
        
           
            );
          
          })}
      </Carousel>
   </div>



        </div>





    );







}

export default PackageDetails;


