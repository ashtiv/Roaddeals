import React, { useState } from 'react';
import { useStateValue } from "./StateProvider";
import "./Regdealer.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Regdealer() {
    const navigate = useNavigate();
    const [{ regemail, regusername, regtype, regpassword, axiosurl, user }, dispatch] = useStateValue();
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [natureofmat, setnatureofmat] = useState('');
    const [capacity, setcapacity] = useState(0);
    const [pin1, setpin1] = useState('');
    const [pin1city, setpin1city] = useState('Pin not entered');
    const searchpin1city = e => {
        if (pin1.length == 0) {
            setpin1city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin1)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin1city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin1city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const handlesubmit = () => {
        console.log("handling");
        if (pin1city == "Pin not entered" || pin1city == "Invalid Pin") {
            alert("Please enter valid PIN of your location and then click check")
        }
        if (name.length == 0) {
            alert("Please enter name");
            return;
        }
        if (mobile.length == 0) {
            alert("Please enter phone number");
            return;
        }
        const fetchdata = async () => {
            try {
                console.log(axiosurl + '/regthisdealer', " here")
                const res = await axios.post(axiosurl + '/regthisdealer', {
                    "Username": regusername,
                    "Email": regemail,
                    "Name": name,
                    "Mobilenumber": mobile,
                    "Quantity": capacity,
                    "City": pin1city,
                })
                console.log("done")
                navigate("/userhome")
            } catch (e) {
                console.log("error during reg : ", e);
            }
            dispatch({
                type: 'SET_USER',
                user: regusername,
            })
        };
        const fetchdata2 = async () => {
            try {
                console.log(axiosurl + '/step_d', " here")
                const res = await axios.post(axiosurl + '/step_d', {
                    "Username": regusername,
                    "Email": regemail,
                    "Pass": regpassword,
                    "Type": regtype,
                    "Booked": []
                })
                console.log("done")
                navigate("/userhome")
            } catch (e) {
                console.log("error during reg : ", e);
            }
        };
        fetchdata();
        fetchdata2();
    }
    return (
        <div>
            <div class="card container mt-3" style={{ width: '18rem' }}>
                <div class="card-body">
                    <h5 class="card-title">User Details</h5>
                    <h6 class="card-subtitle mb-2 bg-info">Username : {regusername}</h6>
                    <h6 class="card-subtitle mb-2 bg-info">Email : {regemail}</h6>
                    <h6 class="card-subtitle mb-2 bg-info">User Type : {regtype}</h6>
                </div>
            </div>
            <form className='container col-5 mt-3'>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input value={name} onChange={e => setname(e.target.value)} type="Text" class="form-control" />
                </div>
                <div>
                    <label class="form-label">Phone No.</label>
                    <input value={mobile} onChange={e => setmobile(e.target.value)} type="Text" class="form-control" />
                </div>
                <div>
                    <label class="form-label">Nature of Material</label>
                    <input value={natureofmat} onChange={e => setnatureofmat(e.target.value)} type="Text" class="form-control" />
                </div>
                <div class="dropdown mt-3">
                    <button class="btn btn-danger dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {capacity == 0 ? "Quantity/weight of material" : capacity}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={e => setcapacity(200)} class="dropdown-item typelist">200 tons</li>
                        <li onClick={e => setcapacity(400)} class="dropdown-item typelist">400 tons</li>
                        <li onClick={e => setcapacity(600)} class="dropdown-item typelist">600 tons</li>
                    </ul>
                </div>
                <p className='mt-5'>Enters PIN and then click check</p>
                <div className='mb-5 mt-3 col'>
                    <label class="form-label">PIN of your Location</label>
                    <input className='pininput' value={pin1} onChange={e => setpin1(e.target.value)} type="Text" />
                    <div class="btn btn-success" onClick={searchpin1city}>Check</div>
                    <br></br>
                    {pin1city}
                </div>
                <div type="submit" onClick={handlesubmit} class="btn btn-primary">Submit</div>
            </form>
        </div>
    )
}

export default Regdealer