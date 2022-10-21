import React, { useState , useEffect } from 'react'
import Axios from 'axios'
import './registerVacancy.css'
import swal from "sweetalert";
import logo from '../../../assets/logo/logo.svg'
import { Link } from 'react-router-dom';
 

const RegisterVacancy = () => {

   let formData = new FormData();
   
   const onFileChange = (e) =>{
    console.log(e.target.files[0])
    if(e.target && e.target.files[0]){
      formData.append('file', e.target.files[0]);
    }
   }

  
 
    const [Job_Title,setJob_Title]= useState("");
    const [F_Name,setF_Name]= useState("");
    const [L_Name,setL_Name]= useState("");
    const [NIC,setNIC]= useState("");
    const [Age,setAge]=useState("");
    const [Phone_Number,setPhone_Number]= useState("");
    const [Email,setEmail]= useState("");
    const [Address,setAddress]= useState("");
    const [Cv,setCv]= useState("");
    const [Describe,setDescribe]= useState("");
    const [EmailError,setEmailError]= useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [listofRegisterVacancies, setListofRegisterVacancies] = useState([]);


    useEffect(() => {
      Axios.get("http://localhost:8000/api/registerVacancy/all").then(res => {
         setListofRegisterVacancies(res.data);
         console.log(res.data);
      })		
      }, [])


    
      const handleSubmit = (e) => {


        Axios.post(
          'https://v2.convertapi.com/upload',
          {formData}
        ).then(res => {
          console.log(res);
        })
        .catch(error =>{
          console.log(error);
        })

        e.preventDefault();
        setFormErrors(validate());
        sub();
        setIsSubmit(true);
        
      };

    

      

      const validate=()=>{
        const errors = {};
      const emailModel = /\S+@\S+\.\S+/;
      const nameModel = /^[a-zA-Z]+$/
      var mobiles =/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/
      
    
        
  
        if(!Job_Title){
            errors.Job_Title = "Job Title is required!";
           
        }
        if(!F_Name){
          errors.F_Name = "First name is required!";
         
      }
      if(!L_Name){
        errors.L_Name = "Last name is required!";
      }
      if(!Age){
        errors.Age = "Age is required!";
      }
      if(!Cv){
        errors.Cv = "Cv is required!";
      }
      if(!Phone_Number){
        errors.Phone_Number = "Phone number is required!";
      }else if(Phone_Number.length !==10){
        errors.Phone_Number = "Phone number is invalid";
      }
      if(!NIC){
        errors.NIC = "NIC is required!";
      }else if(NIC.length !==10){
        errors.NIC = "NIC is invalid";
      }
      
      if(!Email){
        errors.Email = "Email is required!";
      }else if (!emailModel.test(Email)) {
        errors.Email = "Please Enter a valid email";
      
    }
      if(!Address){
        errors.Address = "Address is required!";
      }
     
      if(!Describe){
        errors.Describe = "This is required!";
      }
      
      
        return errors;
      }
      const sub =() => {
       
        if (Object.keys(formErrors).length == 0 && isSubmit) {
          Registervacancy();
         
        }
      }

      const Registervacancy = () => {
        Axios.post("http://localhost:8000/api/registerVacancy", {
        
        Job_Title,
		F_Name,
		L_Name,
    NIC,
		Age,
		Phone_Number,
		Email,
		Address,
		Cv,
		Describe,
    }).then((response) => {
        setListofRegisterVacancies([
            ...listofRegisterVacancies,
            { 
              Job_Title,
              F_Name,
              L_Name,
              NIC,
              Age,
              Phone_Number,
              Email,
              Address,
              Cv,
              Describe, 
            },
        ]);
    }); swal({
        title: "Registered Successfuly!",
        icon: "success",
        confirmButtonText: "OK",
          }).then(function () {
              // Redirect the admin
              window.location.href = "./career";
            });
       
    
    };


   


    const demo = () => {
      setJob_Title("Software Engineer");
      setF_Name("Tharindu");
      setL_Name("Thilakarathne");
      setNIC("991203931V");
      setAge("27");
      setPhone_Number("0764668388");
      setEmail("samitha@gmail.com");
      setAddress("kegalle,KandyRoad");
      setDescribe("The industry events page contains upcoming conferences, meetings, webinars, and other types of events covering current trends and new findings in each industry. These events take place internationally and each event listed on the page links to the event's official website. An events sites section is also available which contains links to websites that provide a listing of upcoming events specific to each industry.");
     
    };








     
   

      return (
<div>
        
<div className='formregister'>
  <div className="registercard">
    <h1 className='registerheader'>Job Application</h1>
    <div  id="regimage" className="col-7  d-flex justify-content-end">

                    <img src={logo} alt=""/>
                  
                </div>

                <div>

                <div className="row mt-5 px-3">
                        <form>

                        <div className="row mt-4">
                            <div className="col">
                              <label className='laybelname' >Job Title:</label>
                                    <input type="text" value={Job_Title}  className="form-control" placeholder="Job Title" onChange={(e)=>{ setJob_Title(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Job_Title}</p>
                                </div>

                               

                                </div>
                            

                       
                        <div className="row mt-4">
                                   <div className="col">
                                   <label className='laybelname'>First Name:</label>
                                    <input type="text" value={F_Name}  className="form-control" placeholder="First Name" onChange={(e)=>{ setF_Name(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.F_Name}</p>
                                </div>
                                  
                                <div className="col">
                                <label className='laybelname'>Last Name:</label>
                                <input type="text"  className="form-control" placeholder="Last Name" onChange={(e)=>{ setL_Name(e.target.value);}} />
                                    <p class="alert-txt">{formErrors.L_Name}</p>
                                </div>

                                </div>
                            
                       <div className="row mt-4">
                            <div className="col">
                            <label className='laybelname'>NIC:</label>
                                    <input type="text" value={NIC} className="form-control" placeholder="NIC Number" onChange={(e)=>{ setNIC(e.target.value);}} />
                                    <p class="alert-txt">{formErrors.NIC}</p>
                                </div>
                                <div className="col">
                                <label className='laybelname'>Phone Number:</label>
                                    <input type="text" value={Phone_Number} className="form-control" placeholder="Phone Number" onChange={(e)=>{ setPhone_Number(e.target.value);}} />
                                    <p class="alert-txt">{formErrors.Phone_Number}</p>
                                </div>

                               

                                </div>
                            
                                <div className="row mt-4">
                                <div className="col">
                                <label className='laybelname'>Address:</label>
                                <input type="text" value={Address} className="form-control" placeholder="Address" onChange={(e)=>{ setAddress(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Address}</p>
                                    
                                </div>
                                <div className="col">
                                <label className='laybelname'>Email:</label>
                                <input type="text" value={Email} className="form-control" placeholder="E-mail" onChange={(e)=>{ setEmail(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Email}</p>
                                    
                                </div>
                               
                            </div> 
                
                            
                            <div className="row mt-4">
                               
                                
                            <div className="col">
                            <label className='laybelname'>Age:</label>
                                <input type="text" value={Age} className="form-control" placeholder="Age" onChange={(e)=>{ setAge(e.target.value);}}/>
                                    <p class="alert-txt">{formErrors.Age}</p>
                                    
                                </div>
                            </div>
                            <div className="row mt-4">
                              
                                
                                <div className="row mt-4">

                                <div class="form-group">
    <label className='laybelname'>Describe Your Skills:</label>
    <textarea class="form-control" value={Describe}  id="exampleFormControlTextarea1" placeholder="Details" rows="3" onChange={(e)=>{ setDescribe(e.target.value);}}>
    
    </textarea>
    <p class="alert-txt">{formErrors.Describe}</p>
    
  </div>
  <div className="col">
  <label className='laybelname'>Upload Cv:</label>
<input class="form-control" value={Cv} type="file" id="formFileMultiple"  multiple onChange={(e)=>{ setCv(e.target.value);}} />

<p class="alert-txt">{formErrors.Cv}</p>
  </div>
  
                            </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center" >
                               
                                <button type="submit"  className="btn btnRegister " onClick={handleSubmit}>Register</button>
                                   
                                </div>
                            </div>
                            
                        </form>

                        <button
              type="button"
              onClick={demo}
              class="btn store-order-form-button my-4"
              id="product-details-buy-now"
            >
              Demo
            </button>
                    </div>

  

                </div>

   </div>

</div>

</div>
    
  );
      
  
}

export default RegisterVacancy;

