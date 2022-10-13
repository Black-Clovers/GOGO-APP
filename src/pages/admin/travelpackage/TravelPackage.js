import React from "react";
import "./PackageStyle.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import VueSweetalert2 from "sweetalert2";

function TravelPackage() {
  
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
  const [listOfpackage, setlistOfpackage] = useState([]);
  const [PackageSearch, setpkgSearch] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    sub();
    setIsSubmit(true);
  };

  const validate = () => {
    const errors = {};

    if (!package_name) {
      errors.package_name = "Package Name is required!";
    }
    if (!vehicle_type) {
      errors.vehicle_type = "Vehicle type is required!";
    }
    if (!price) {
      errors.price = "Price is required!";
    }
    if (!contacts) {
      errors.contacts = "Phone is required!";
    } else if (contacts.length !== 10) {
      errors.contacts = "Phone number is invalid!";
    }

    return errors;
  };
  const sub = () => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      createcPackage();
    }
  };

  const createcPackage = () => {
    Axios.post("http://localhost:8000/api/package/", {
      
      package_name,
      vehicle_type,
      package_overview,
      package_include,
      contacts,
      image_url,
      add_info,
      price,
      mpassengers,
      status,
    }).then((response) => {
      setlistOfpackage([
        ...listOfpackage,
        {
          
          package_name,
          vehicle_type,
          package_overview,
          package_include,
          contacts,
          image_url,
          add_info,
          price,
          mpassengers,
          status,
        },
      ]);
    });
    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        icon: 'success',
        title: 'Your Package details added to the System',
    }).then(function () {
      // Redirect the user
      window.location.href = "/admin/package";
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/package/all").then((response) => {
      setlistOfpackage(response.data);
    });
  }, []);

  function sendPackage(e) {
    e.preventDefault();
    alert("Going to Update Package");
    const newPackage = {
      package_ids,
      package_name,
      vehicle_type,
      package_overview,
      package_include,
      contacts,
      image_url,
      add_info,
      price,
      mpassengers,
      status,
    };
    
    
    Axios.put(`http://localhost:8000/api/package/${package_ids}`,newPackage).then(()=>{})
      .catch((err) => {
        console.log(err);
      });
      VueSweetalert2.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1800,
        icon: 'success',
        title: 'Your Package details Updated Successfully',
    }).then(function () {
        // Redirect the user
        window.location.href = "/admin/package";
      });
    
  }

  const loadPackageDetailsedit = (travelpackage) => {
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("delete").setAttribute("disabled", "true");
    setpkg_id(travelpackage._id);
    setpkg_name(travelpackage.package_name);
    setpkg_vehicle(travelpackage.vehicle_type);
    setcontacts(travelpackage.contacts);
    setimage_url(travelpackage.image_url);
    setpkg_passenger(travelpackage.mpassengers);
    setpkg_price(travelpackage.price);
    setpkg_status(travelpackage.status);
    setpkg_info(travelpackage.add_info);
    setpkg_overview(travelpackage.package_overview);
  };

  const loadPackageDetailsdelete = (travelpackage) => {
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("edit").setAttribute("disabled", "true");
    setpkg_id(travelpackage._id);
    setpkg_name(travelpackage.package_name);
    setpkg_vehicle(travelpackage.vehicle_type);
    setcontacts(travelpackage.contacts);
    setimage_url(travelpackage.image_url);
    setpkg_passenger(travelpackage.mpassengers);
    setpkg_price(travelpackage.price);
    setpkg_status(travelpackage.status);
    setpkg_info(travelpackage.add_info);
    setpkg_overview(travelpackage.package_overview);
  };
  const addcoverimage= () => {
    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none")
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
        imgUploaderElement.click();
        imgUploaderElement.addEventListener("change", () => {
            imgUploaderElement = document.getElementById("imgUploader");
            console.log(imgUploaderElement);
            if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                if (imgUploaderElement.files.length > 0) {
                    const fileReader = new FileReader();

                    fileReader.onload = function (event) {
                      setimage_url(event.target.result);
                    };

                    fileReader.readAsDataURL(imgUploaderElement.files[0]);
                }
            }
        });
    }

    document.getElementById("btnEditImg").removeAttribute("disabled");
    document.getElementById("btnImgDelete").removeAttribute("disabled");
}

const updatecoverimage = () => {
    document.getElementById("ProfileImage").removeAttribute("src");
    document.getElementById("btnAddImg").setAttribute("disabled", "true");

    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("required", "true");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none")
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
        imgUploaderElement.click();
        imgUploaderElement.addEventListener("change", () => {
            imgUploaderElement = document.getElementById("imgUploader");
            console.log(imgUploaderElement);
            if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                if (imgUploaderElement.files.length > 0) {
                    const fileReader = new FileReader();

                    fileReader.onload = function (event) {
                      setimage_url(event.target.result);
                    };

                    fileReader.readAsDataURL(imgUploaderElement.files[0]);
                }
            }
        });
    }

}
const removecoverImages = () => {
  document.getElementById("ProfileImage").removeAttribute("src");
  document.getElementById("btnImgDelete").setAttribute("disabled", "true");
}

const  deletePackage= () => {
  alert("You want to delete Course");
  Axios.delete(`http://localhost:8000/api/package/${package_ids}`).then((res) => {
      
   
    });
    VueSweetalert2.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1800,
        icon: 'success',
        title: 'Package Deleted Successfully',
    }).then(function () {
      // Redirect the user
      window.location.href = "/admin/package";
    });
  };
 


  return (
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
          <form>
                            <div className="row">
                                <div className="col d-flex justify-content-end align-items-center">
                                    <div className="col d-flex justify-content-end">
                                        <div>
                                            <button className="btn btnAddImg" id="btnAddImg" type="button"
                                                    onClick={() => {
                                                      addcoverimage()
                                                    }}>
                                                <i className="fa fa-plus text-white" aria-hidden="true"/>
                                            </button>
                                            <button className="btn btnEditImg" id="btnEditImg" type="button"
                                                    onClick={() => {
                                                      updatecoverimage()
                                                    }}>
                                                <i className="fa-solid fa-pen text-white"/>
                                            </button>
                                            <button className="btn btnImgDelete" id="btnImgDelete" type="button"
                                                    onClick={() => {
                                                        removecoverImages()
                                                    }}>
                                                <i className="fa-solid fa-trash-can d-inline text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="imgInputDiv">
                                        <div>
                                            <img id="ProfileImage" className="imgDiv" src={image_url}
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

              <div className="row mt-4">
                
                <div className="col">
                  <input
                    type="text"
                    value={package_name}
                    className="form-control"
                    placeholder="Package Name"
                    onChange={(event) => {
                      setpkg_name(event.target.value);
                    }}
                  />
                  <p class="alert-txt">{formErrors.package_name}</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <select
                    name="type"
                    value={vehicle_type}
                    className="form-select"
                    aria-label="role" 
                    onChange={(event) => {
                      setpkg_vehicle(event.target.value);
                    }}
                  >
                    <option selected disabled value="0" >
                      Vehicle Type
                    </option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Mini Van">Mini van</option>
                    <option value="Tuk Tuk">Tuk Tuk</option>
                  </select>
                  <p class="alert-txt">{formErrors.vehicle_type}</p>
                </div>

                <div className="col">
                  <input
                    type="text"
                    value={contacts}
                    className="form-control"
                    placeholder="Contacts"
                    onChange={(event) => {
                      setcontacts(event.target.value);
                    }}
                  />
                  <p class="alert-txt">{formErrors.contacts}</p>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <input
                    type="text"
                    value={mpassengers}
                    className="form-control"
                    placeholder="Maximum Passengers"
                    onChange={(event) => {
                      setpkg_passenger(event.target.value);
                    }}
                  />
                  <p class="alert-txt">{formErrors.mpassengers}</p>
                </div>
                <div className="col">
                  <input
                    type="text"
                    value={price}
                    className="form-control"
                    placeholder="Price"
                    onChange={(event) => {
                      setpkg_price(event.target.value);
                    }}
                  />
                  <p className="alert-txt">{formErrors.price} </p>
                </div>
                <div className="col">
                  <select
                    name="status"
                    value={status}
                    className="form-select"
                    aria-label="role"
                    onChange={(event) => {
                      setpkg_status(event.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      Status
                    </option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      value={package_overview}
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Package Overview"
                      onChange={(event) => {
                        setpkg_overview(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      value={add_info}
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Additional Info"
                      onChange={(event) => {
                        setpkg_info(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="d-flex justify-content-around align-items-center">
                  <button
                    type="submit"
                    id="reg"
                    className="btn btnRegister "
                    onClick={handleSubmit}
                  >
                    Add Package
                  </button>
                  <button
                    type="button"
                    id="edit"
                    className="btn btnUpdate"
                    onClick={sendPackage}
                  >
                    Update
                  </button>
                  <button type="button" id="delete" className="btn btnDelete" onClick={deletePackage}>
                  Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row mt-5 px-3">
            <h6 className="mb-0 fw-bold mt-2 mb-2">Current Packages</h6>
            <div className="row mb-5">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    id="searchID"
                    type="text"
                    className="form-control col-8 me-5 px-5"
                    placeholder="Package Name"
                    onChange={(e) => {
                      setpkgSearch(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="button"
                    className="form-control btnSearch text-white"
                    value="Search"
                  />
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
                    <th scope="col">Package ID</th>
                    <th scope="col">Cover Image</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Vehicle Type</th>
                    <th scope="col">contacts</th>
                    <th scope="col">Passengers</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listOfpackage &&
                    listOfpackage
                      .filter((value) => {
                        if (PackageSearch === "") {
                          return value;
                        } else if (
                          value.package_name
                            .toLowerCase()
                            .includes(PackageSearch.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((travelpackage, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{travelpackage._id}</td>
                          <td className="crs-td">< img src={travelpackage.image_url} class="crsthumimg" alt=""/></td>
                          <td className="crs-td">
                            {travelpackage.package_name}
                          </td>
                          <td className="crs-td">
                            {travelpackage.vehicle_type}
                          </td>
                          <td className="crs-td">{travelpackage.contacts}</td>
                          <td className="crs-td">
                            {travelpackage.mpassengers}
                          </td>
                          <td className="crs-td">{travelpackage.price}</td>
                          <td className="crs-td">{travelpackage.status}</td>
                          <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline fa-2x" onClick={() => {
                         loadPackageDetailsedit(travelpackage);
                    }}/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x" onClick={() => {
                        loadPackageDetailsdelete(travelpackage);
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

export default TravelPackage;
