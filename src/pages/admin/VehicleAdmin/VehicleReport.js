import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function VehicleReport(){

    const [listOfVehicles, setlistOfVehicles] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/vehicle/all").then((response) => {
            setlistOfVehicles(response.data);
        });
      }, []);


      const printPdf = () => {
        const input = document.querySelector(".pdfdiv");
        html2canvas(input).then((canvas) => {
          var img = new Image();
          const doc = new jsPDF("p", "mm", "a4");
          doc.setTextColor(255, 0, 0);
          doc.setFontSize(28);
          doc.setTextColor(0, 0, 255);
          doc.setFontSize(16);
          doc.text(10, 70, "GoGo Pvt Ltd");
          doc.setTextColor(0, 255, 0);
          doc.setFontSize(12);
          doc.text(145, 85, "Signature :");
          //Date
          var m_names = new Array(
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          );
    
          var today = new Date();
          var seconds = today.getSeconds();
          var minutes = today.getMinutes();
          var hours = today.getHours();
          var curr_date = today.getDate();
          var curr_month = today.getMonth();
          var curr_year = today.getFullYear();
    
          today =
            m_names[curr_month] +
            " " +
            curr_date +
            "/ " +
            curr_year +
            " | " +
            hours +
            "h : " +
            minutes +
            "min : " +
            seconds +
            "sec";
          var newdat = today;
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(11);
          doc.text(130, 93, newdat);
          var imgHeight = (canvas.height * 200) / canvas.width;
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData, "JPEG", 5, 100, 200, imgHeight);
          const date = Date().split(" ");
          // we use a date string to generate our filename.
          const dateStr =
            "GoGo Company Reports" + date[0] + date[1] + date[2] + date[3] + date[4];
          doc.save(`report_${dateStr}.pdf`);
        });
      };


return(

    <div>
         <div className="main_container">
        <div className="item fw-bold">Package Report</div>
        <div className="item">

        <div className="row mt-5 ps-3">
            <div className="row">
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="row">
                  <div className="d-flex justify-content-start align-items-center">
                    
                    <button id="btn-generate-report" className="btn me-3" onClick={printPdf} >
                    <i class="fa fa-print fa-2x" aria-hidden="true"></i>
                    </button>
                    
                  </div>
                </div>
              </div>
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="row"></div>
              </div>
            </div>
          </div>
          
          
          
          <div className="row mt-5 px-3">
           
        

            <div className="table-responsive">
              <table  class="table table-bordered pdfdiv"
                id="assignLabsTable"
              >
                <thead>
                  <tr>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col">Licence Number</th>
                    <th scope="col">Chasse Number</th>
                    <th scope="col">Owner Name</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Regitered Date</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfVehicles&&
                   listOfVehicles.map((registervehicle, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{registervehicle.vehicle_no}
                          </td>                         
                          <td className="crs-td">
                            {registervehicle.lisence_no}
                          </td>
                          <td className="crs-td">
                            {registervehicle.chasse_no}
                          </td>
                          <td className="crs-td">
                            {registervehicle.owner_name}
                          </td>
                          <td className="crs-td">
                            {registervehicle.owner_nic}
                          </td>
                          <td className="crs-td">
                            {registervehicle.mobile_no}
                          </td>
                          <td className="crs-td">
                            {registervehicle.reg_date}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

         </div>
);


}

export default VehicleReport;