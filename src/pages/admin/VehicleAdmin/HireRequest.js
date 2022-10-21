import React from "react";
import "./Vehicle.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import VueSweetalert2 from "sweetalert2";

function Hirereq(){
    const [listOfHires, setlistOfHires] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/vehiclehire/all").then((response) => {
            setlistOfHires(response.data);
        });
      }, []);

      const Delete = (id) => {
        alert("You want to delete Request ?")
          Axios.delete(`http://localhost:8000/api/vehiclehire/${id}`).then((res) => {
            
          });
          VueSweetalert2.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1800,
              icon: 'success',
              title: 'Hire Request Deleted Successfully',
          }).then(function () {
            // Redirect the user
            /*window.location.href = "/admin/booking";*/
          });
        };


    return(

        <div>

<div className="main_container">
        <div className="item fw-bold">Vehicle Hire Management</div>
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
            <h6 className="mb-0 fw-bold mt-2 mb-2">Current Vehicle Hires</h6>
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
                    <th scope="col">Hire Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Address</th>
                    <th scope="col">Customer Contact</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Passenger Count</th>
                    <th scope="col">Driver Status</th>
                    <th scope="col">Reserve Date</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listOfHires &&
                    listOfHires.map((hirevehicle, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{hirevehicle._id}</td>
                         
                          <td className="crs-td">
                            {hirevehicle.client_name}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.client_address}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.contact_no}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.client_email}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.from}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.to}
                          </td>
                          <td className="crs-td">{hirevehicle.passanger_count}</td>
                          <td className="crs-td">
                            {hirevehicle.driver_status}
                          </td>
                          <td className="crs-td">
                            {hirevehicle.trip_date}
                          </td>
                          
                          <td>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"  onClick={() => Delete(hirevehicle._id)}/>
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

export default Hirereq;