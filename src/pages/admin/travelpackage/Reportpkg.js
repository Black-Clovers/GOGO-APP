import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";





function Reportpkg(){

    const [listOfPackages, setlistOfPackages] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/package/all").then((response) => {
            setlistOfPackages(response.data);
        });
      }, []);

      const printPdf = () => {
        const input = document.querySelector(".pdfdiv");
        html2canvas(input).then((canvas) => {
          var img = new Image();
          const doc = new jsPDF("p", "mm", "a4");
          doc.setTextColor(20, 30, 39);
          doc.setFontSize(28);
          doc.setTextColor(20, 30, 39);
          doc.setFontSize(16);
          doc.text(5, 20, "GO-GO - Reports");
          doc.setFontSize(12);
          doc.text(5, 30, "Generated Time :");
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
          doc.setTextColor(20, 30, 39);
          doc.setFontSize(11);
          doc.text(5, 35, newdat);
    
          doc.text(
            80,
            50,
            "Eligible list of Applicants"
          );
    
          var imgHeight = (canvas.height * 200) / canvas.width;
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData, "JPEG", 5, 60, 200, imgHeight);
          doc.text(5, 200, "___");
          doc.text(5, 205, "Signature");
    
          const date = Date().split(" ");
    
          // we use a date string to generate our filename.
          const dateStr =
            "Applicants" + date[0] + date[1] + date[2] + date[3] + date[4];
          doc.save(`report_${dateStr}.pdf`);
        });
      }

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
                    <th scope="col">Package Id</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Vehicle Type</th>
                    <th scope="col">Maximum Passengers</th>
                    <th scope="col">Price</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listOfPackages&&
                   listOfPackages.map((travelpackage, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{travelpackage._id}</td>
                         
                          <td className="crs-td">
                            {travelpackage.package_name}
                          </td>
                          <td className="crs-td">
                            {travelpackage.vehicle_type}
                          </td>
                          <td className="crs-td">{travelpackage.mpassengers}</td>
                          <td className="crs-td">
                            {travelpackage.price}
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

export default Reportpkg;