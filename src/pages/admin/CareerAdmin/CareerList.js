import React, { useEffect, useState } from "react";
import './careerlist.css'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {Link} from 'react-router-dom';
import axios from "axios";


function CareerList(){

    
    const [reportlist,setReportList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/registerVacancy/all").then(res => {
           setReportList(res.data);
           console.log(res.data);
        })		
        }, [])
      
          //report pdf
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
              doc.text(5, 200, "_____");
              doc.text(5, 205, "Signature");
        
              const date = Date().split(" ");
        
              // we use a date string to generate our filename.
              const dateStr =
                "Applicants" + date[0] + date[1] + date[2] + date[3] + date[4];
              doc.save(`report_${dateStr}.pdf`);
            });
          }
            
        return(

<div className="main_container">
            <body id="reportbody">
<h1 id="reporthead">Job Applicants</h1>
<button className="btn btn-danger" id="pdfdownloader" onClick={printPdf}>generate pdf</button>
<table class="pdfdiv" id="reporttable">
<tr id="reporttablerow">
<th class="reporttable__heading">Job Title</th>
<th class="reporttable__heading">First Name</th>
<th class="reporttable__heading">Last Name</th>
<th class="reporttable__heading">NIC</th>
<th class="reporttable__heading">Age</th>
<th class="reporttable__heading">Phone Number </th>
<th class="reporttable__heading">Email</th>
<th class="reporttable__heading">Address</th>

<th class="reporttable__heading">Eligible Status</th>
</tr>
<tbody>
{reportlist && reportlist.map((ev, i) => (
<tr class="table__row" id="reporttablerow">
<td class="reporttable__content"> {ev.Job_Title}</td>
<td class="reporttable__content">{ev.F_Name}</td>
<td class="reporttable__content">{ev.L_Name}</td>
<td class="reporttable__content">{ev.NIC}</td>
<td class="reporttable__content">{ev.Age}</td>
<td class="reporttable__content">{ev.Phone_Number}</td>
<td class="reporttable__content">{ev.Email}</td>
<td class="reporttable__content">{ev.Address}</td>

<td class="reporttable__content">{ev.Age >= 26 ? "Eligible" : "Not Eligible"}</td>

</tr>
))}
</tbody>


           
              </table>
              
             
    
            </body>
        
                </div>
    );
}
export default CareerList;