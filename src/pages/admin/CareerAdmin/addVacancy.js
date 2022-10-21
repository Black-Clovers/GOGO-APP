import React, { useEffect, useState } from "react";
import Axios from "axios";
import './addVacancy.css';
import swal from "sweetalert";
import {Link} from 'react-router-dom';

const Addvacancy =() => {

    const [Vacancy_Id,setVacancy_Id]= useState("");
    const [Vacancy_Category,setVacancy_Category]= useState(0);
    const [Vacancy_Position,setVacancy_Position]= useState("");
    const [No_of_Positions,setNo_of_Positions]= useState(0);
    const [Details,setDetails]=useState("");
    const [Vacancy_Type,setVacancy_Type]= useState(0);
    const [Date_Posted,setDate_Posted]= useState("");
    const [Location,setLocation]= useState("");
    const [Salary,setSalary]= useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [VacancySearch, setSearch] = useState("");
    //const [vacancy, setVacancy] = useState([]);
    const [listofVacancies, setListofVacancies] = useState([]);
   
    
 

    useEffect(() => {
        Axios.get("http://localhost:8000/api/vacancy/all").then(res => {
           setListofVacancies(res.data);
           console.log(res.data);
        })		
        }, [])
    


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        sub();
        setIsSubmit(true);
        
      };
      
      const validate=()=>{
        const errors = {};
        
  
        if(!Vacancy_Position){
            errors.Vacancy_Position = "Vacancy Position is required!";
           
        }
        if(!Details){
          errors.Details = "Details is required!";
         
      }
      if(!Date_Posted){
        errors.Date_Posted = "Date is required!";
      }
      if(!Vacancy_Type){
        errors.Vacancy_Type = "Vacancy type is required!";
      }
      if(!Location){
        errors.Location = "Locataion is required!";
      }
      if(Salary.charAt(0)!="$"){
        errors.Salary = "Please Enter $ sign!";
    }
      if(!Details){
        errors.Details = "Details is required!";
      }
      if(!No_of_Positions){
        errors.No_of_Positions = "No Of Positions is required!";
      }
      if(!Vacancy_Id){
        errors.Vacancy_Id = "Vacancy Id is required!";
      }
      if(!Vacancy_Category){
        errors.Vacancy_Category = "Vacancy Category is required!";
      }
      
        return errors;
      }
      const sub =() => {
       
        if (Object.keys(formErrors).length == 0 && isSubmit) {
          Addvacancy();
         
        }
      }
 
    const Addvacancy = () => {
        Axios.post("http://localhost:8000/api/vacancy", {
        
        Vacancy_Id,
		Vacancy_Category,
		Vacancy_Position,
		No_of_Positions,
		Details,
		Vacancy_Type,
		Date_Posted,
		Location,
		Salary,
    }).then((response) => {
        setListofVacancies([
            ...listofVacancies,
            {
                Vacancy_Id,
		        Vacancy_Category,
		        Vacancy_Position,
		        No_of_Positions,
		        Details,
		        Vacancy_Type,
		        Date_Posted,
		        Location,
		        Salary,  
            },
        ]);
    }); swal({
        title: "Vacancy Added Successfuly!",
        icon: "success",
        confirmButtonText: "OK",
          }).then(function () {
              // Redirect the admin
              window.location.href = "../client/career";
            });
       
    
    };

    //update
    function sendVacancyData(e){
        e.preventDefault();
        alert("would you like to update");
      
      
        const newVacancy={
      
            Vacancy_Id,
            Vacancy_Category,
            Vacancy_Position,
            No_of_Positions,
            Details,
            Vacancy_Type,
            Date_Posted,
            Location,
            Salary 
      
        }
        
        Axios.put(`http://localhost:8000/api/vacancy/${Vacancy_Id}`,newVacancy).then(()=>{
          
      
         }); swal({
            title: "Vacancy updated Successfuly!",
            icon: "update",
            confirmButtonText: "OK",
              }).then(function () {
                  // Redirect the admin
                  window.location.href = "./career";
                });
      }
      

          const loadVacancyDetails=
          (CareerModel) => {
            setVacancy_Id(CareerModel._id);
            setVacancy_Position(CareerModel.Vacancy_Position);
            setVacancy_Category(CareerModel.Vacancy_Category);
            setNo_of_Positions(CareerModel.No_of_Positions);
            setLocation(CareerModel.Location);
            setSalary(CareerModel.Salary);
            setVacancy_Type(CareerModel.Vacancy_Type);
            setDate_Posted(CareerModel.Date_Posted);
            setDetails(CareerModel.Details);
            

          }

          const Delete = (CareerModel_id) => {
            Axios.delete(`http://localhost:8000/api/vacancy/${CareerModel_id}`).then((res) => {
              
            });
            swal({
                title: "Vacancy deleted!",
                icon: "delete",
                dangerMode: true,
                timer:2000,
                confirmButtonText: "OK",
                  }).then(function () {
                      // Redirect the admin
                      window.location.href = "./career";
                    });
            window.location.reload(false);
          };
      



    return (

     
<div>
<div className="main_container">
                <div className="item fw-bold">
                    Career Management
                </div>
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <button id="btn-generate-report" className="btn me-3">Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                          
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 px-3">
                        <form>
                          

                            
                        <div className="row mt-4">
                            <div className="col">
                                    <input type="text" value={Vacancy_Id} className="form-control" placeholder="Vacancy ID" onChange={(e)=>{ setVacancy_Id(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Vacancy_Id}</p>
                                </div>
                                <div className="col">
                                    <input type="text" value={Vacancy_Position} className="form-control" placeholder="Vacancy Position" onChange={(e)=>{ setVacancy_Position(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Vacancy_Position}</p>
                                </div>

                                </div>
                                <div className="row mt-4">
                                <div className="col">
                                    <select name="position" value={Vacancy_Category} className="form-select" aria-label="role"onChange={(e)=>{ setVacancy_Category(e.target.value);}}>
                                        <option selected disabled value="0">Vacancy Category</option>
                                        <option value="1">Software development</option>
                                        <option value="2">IT infrastructure</option>
                                        <option value="3">IT support</option>
                                        <option value="3">Data management</option>
                                        
                                    </select>
                                    <p class="alert-txt">{formErrors.Vacancy_Category}</p>
                                    
                                </div>
                            

                               
                                <div className="col">
                                    <select name="gender" value={No_of_Positions}  className="form-select"  aria-label="role" onChange={(e)=>{ setNo_of_Positions(e.target.value);}}>
                                   
                                        <option selected disabled value="0">No Of Positions</option>
                                        <option value="1 position">1 position</option>
                                        <option value="2 position">2 Positions</option>
                                        <option value="3 position">3 Positions</option>
                                        <option value="More Positions">More Positions</option>
                                    </select>
                                    <p class="alert-txt">{formErrors.No_of_Positions}</p>
                                </div>
                               
                            </div>
  
                            
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" value={Location}className="form-control" placeholder="Location"onChange={(e)=>{ setLocation(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Location}</p>
                                </div>
                                <div className="col">
                                    <input type="text"  inputMode="" value={Salary} className="form-control" placeholder="Salary($)" onChange={(e)=>{ setSalary(e.target.value);}}/>
        
                                    <p class="alert-txt">{formErrors.Salary}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <select name="gender" value={Vacancy_Type} className="form-select" aria-label="role" onChange={(e)=>{ setVacancy_Type(e.target.value);}}>
                                    
                                        <option selected disabled value="0">Vacancy Type</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        
                                    </select>
                                    <p class="alert-txt">{formErrors.Vacancy_Type}</p>
                                </div>
                                <div className="col">
                                    <input name="Dateposted" value={Date_Posted}
                                           className="form-control"
                                           placeholder="Date Posted"
                                           type="text"
                                           onFocus={(e) => e.target.type = 'date'} id="Dateposted" onChange={(e)=>{ setDate_Posted(e.target.value);}}/>
                                            <p class="alert-txt">{formErrors.Date_Posted}</p>
                                </div>
                                <div className="row mt-4">

                                <div class="form-group">
    
    <textarea class="form-control"  value={Details} id="exampleFormControlTextarea1" placeholder="Details" rows="3" onChange={(e)=>{ setDetails(e.target.value);}}>
    
    </textarea>
    <p class="alert-txt">{formErrors.Details}</p>
  </div>
                            </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="submit" className="btn btnRegister " onClick={handleSubmit}>Register</button>
                                    <button type="button" className="btn btnUpdate" onClick={sendVacancyData}>Update</button>
                                    <button type="button" className="btn btnDelete">Delete</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <h6 className="mb-0 fw-bold mt-2 mb-2"></h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="row">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <input id="searchID" type="text" className="form-control col-8 me-5" onChange ={(e)=>{setSearch(e.target.value); }}
                                                   placeholder="ID"/>
                                        </div>
                                        <div>
                                            <input type="button" className="form-control btnSearch text-white"  
                                                   value="Search"/>
                                                
                                        </div>
                                        

                                    </div>
                                </div>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                
                                <thead>
                                <tr>
                                    <th scope="col">Vacancy ID</th>
                                    <th scope="col">Vacancy Position</th>
                                    <th scope="col">Date Posted</th>
                                    <th scope="col">No Of Positions</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Vacancy Type</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Action</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                            
                            <tbody>
                            {listofVacancies && listofVacancies.filter(value=>{
            if(VacancySearch ===""){
                return value;
            }else if(
                value.Vacancy_Position.toLowerCase().includes(VacancySearch.toLowerCase())
            ){
                return value
            }
        }).map((CareerModel, i) => (
            <tr class="crs-tr" data-status="active">
        
            <td className="crs-td">{CareerModel.Vacancy_Id}</td>
            <td className="crs-td">{CareerModel.Vacancy_Position}</td>
            <td className="crs-td">{CareerModel.Date_Posted}</td>
            <td className="crs-td">{CareerModel.No_of_Positions}</td>
            <td className="crs-td">{CareerModel.Salary}</td>
            <td className="crs-td">{CareerModel.Location}</td>
            <td className="crs-td">{CareerModel.Vacancy_Type}</td>
            <td className="crs-td">{CareerModel.Details}</td>
            <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline" onClick={() => {
                         loadVacancyDetails(CareerModel);
                    }}/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline" onClick={() => {
                        Delete(CareerModel._id)
                        
                    }}/>
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

export default Addvacancy;