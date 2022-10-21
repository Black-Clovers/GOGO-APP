import React from "react";
import "./PackageStyle.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import VueSweetalert2 from "sweetalert2";

function Bookingpkg(){
    const [listOfbooking, setlistOfbooking] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/booking/all").then((response) => {
            setlistOfbooking(response.data);
        });
      }, []);

      const Delete = (id) => {
        alert("You want to delete Booking")
          Axios.delete(`http://localhost:8000/api/booking/${id}`).then((res) => {
            
          });
          VueSweetalert2.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1800,
              icon: 'success',
              title: 'Booking Deleted Successfully',
          }).then(function () {
            // Redirect the user
            window.location.href = "/admin/booking";
          });
        };


    return(

        <div>

<div className="main_container">
        <div className="item fw-bold">Package Management</div>
        <div className="item">
          <div className="row mt-5 ps-3">
            <div className="row">
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="row">
                  <div className="d-flex justify-content-start align-items-center">
                    <button id="btn-generate-report" className="btn me-3">
                      Generate Report
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
            <h6 className="mb-0 fw-bold mt-2 mb-2">Current Bookings</h6>
            <div className="row mb-5">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-center align-items-center">
            
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table
                className="table table-striped custom-table"
                id="assignLabsTable"
              >
                <thead>
                  <tr>
                    <th scope="col">Booking Id</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Customer Phone</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listOfbooking &&
                    listOfbooking.map((booking, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{booking._id}</td>
                         
                          <td className="crs-td">
                            {booking.package_name}
                          </td>
                          <td className="crs-td">
                            {booking.cus_email}
                          </td>
                          <td className="crs-td">{booking.cus_phone}</td>
                          <td className="crs-td">
                            {booking.booking_date}
                          </td>
                          
                          <td>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x"  onClick={() => Delete(booking._id)}/>
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
    )
}

export default Bookingpkg;
