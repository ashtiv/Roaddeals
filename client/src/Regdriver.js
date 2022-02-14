import React, { useState } from 'react';
import { useStateValue } from "./StateProvider";
import "./Regdriver.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Regdriver() {
    const navigate = useNavigate();
    const [{ regemail, regusername, regtype, regpassword, axiosurl }, dispatch] = useStateValue();
    // console.log(regpass, " password");
    const [name, setname] = useState('');
    const [age, setage] = useState(0);
    const [trucknumber, settrucknumber] = useState('');
    const [mobile, setmobile] = useState('');
    const [capacity, setcapacity] = useState(0);
    const [trasnportername, settransportername] = useState('');
    const [dexp, setdexp] = useState(0);
    const [pin1, setpin1] = useState('');
    const [pin2, setpin2] = useState('');
    const [pin3, setpin3] = useState('');
    const [pin4, setpin4] = useState('');
    const [pin5, setpin5] = useState('');
    const [pin6, setpin6] = useState('');
    const [pin1city, setpin1city] = useState('Pin not entered');
    const [pin2city, setpin2city] = useState('Pin not entered');
    const [pin3city, setpin3city] = useState('Pin not entered');
    const [pin4city, setpin4city] = useState('Pin not entered');
    const [pin5city, setpin5city] = useState('Pin not entered');
    const [pin6city, setpin6city] = useState('Pin not entered');
    var city = ['', '', '', '', '', '']
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
    const searchpin2city = e => {
        if (pin2.length == 0) {
            setpin2city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin2)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin2city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin2city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const searchpin3city = e => {
        if (pin3.length == 0) {
            setpin3city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin3)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin3city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin3city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const searchpin4city = e => {
        if (pin4.length == 0) {
            setpin4city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin4)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin4city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin4city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const searchpin5city = e => {
        if (pin5.length == 0) {
            setpin5city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin5)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin5city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin5city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const searchpin6city = e => {
        if (pin6.length == 0) {
            setpin6city("Pin not entered");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.postalpincode.in/pincode/" + pin6)
                if (res?.data[0].Status == "Success") {
                    const state = "(" + res?.data[0].PostOffice[0].State + ")";
                    setpin6city(res?.data[0].PostOffice[0].District + state)
                }
                else {
                    setpin6city("Invalid Pin")
                }

            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchData();
    }
    const handlesubmit = () => {
        console.log("handling");
        city = [pin1city, pin2city, pin3city, pin4city, pin5city, pin6city];
        for (var i = 0; i < 6; i++) {
            if (city[i] == "Pin not entered" || city[i] == "Invalid Pin") {
                alert("Please enter valid pin in every route and click check");
                return;
            }
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
                console.log(axiosurl + '/regthisdriver', " here")
                const res = await axios.post(axiosurl + '/regthisdriver', {
                    "Username": regusername,
                    "Email": regemail,
                    "Name": name,
                    "Age": age,
                    "Trucknumber": trucknumber,
                    "Mobilenumber": mobile,
                    "Truckcapacity": capacity,
                    "Trasnportername": trasnportername,
                    "Dexp": dexp,
                    "Interestedroute": city
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
                    <label class="form-label">Age in years</label>
                    <input value={age} onChange={e => setage(e.target.value)} type="number" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Truck Number</label>
                    <input value={trucknumber} onChange={e => settrucknumber(e.target.value)} type="Text" class="form-control" />
                </div>
                <div>
                    <label class="form-label">Phone No.</label>
                    <input value={mobile} onChange={e => setmobile(e.target.value)} type="Text" class="form-control" />
                </div>
                <div class="dropdown mt-3">
                    <button class="btn btn-danger dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {capacity == 0 ? "Choose capacity" : capacity}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={e => setcapacity(200)} class="dropdown-item typelist">200 tons</li>
                        <li onClick={e => setcapacity(400)} class="dropdown-item typelist">400 tons</li>
                        <li onClick={e => setcapacity(600)} class="dropdown-item typelist">600 tons</li>
                    </ul>
                </div>
                <div class="mb-3 mt-3">
                    <label class="form-label">Transporter Name</label>
                    <input value={trasnportername} onChange={e => settransportername(e.target.value)} type="Text" class="form-control" />
                </div>
                <div>
                    <label class="form-label">Driving experience in years</label>
                    <input value={dexp} onChange={e => setdexp(e.target.value)} type="number" class="form-control" />
                </div>
                <p className='mt-5'>Enters PINs and then click check</p>
                <div className='row'>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of source of route 1</label>
                        <input className='pininput' value={pin1} onChange={e => setpin1(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin1city}>Check</div>
                        <br></br>
                        {pin1city}
                    </div>
                    <div class="col mt-5"><h3>To</h3></div>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of destination of route 1</label>
                        <input className='pininput' value={pin2} onChange={e => setpin2(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin2city}>Check</div>
                        <br></br>
                        {pin2city}
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of source of route 2</label>
                        <input className='pininput' value={pin3} onChange={e => setpin3(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin3city}>Check</div>
                        <br></br>
                        {pin3city}
                    </div>
                    <div class="col mt-5"><h3>To</h3></div>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of destination of route 2</label>
                        <input className='pininput' value={pin4} onChange={e => setpin4(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin4city}>Check</div>
                        <br></br>
                        {pin4city}
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of source of route 3</label>
                        <input className='pininput' value={pin5} onChange={e => setpin5(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin5city}>Check</div>
                        <br></br>
                        {pin5city}
                    </div>
                    <div class="col mt-5"><h3>To</h3></div>
                    <div className='mb-5 mt-3 col'>
                        <label class="form-label">PIN of destination of route 3</label>
                        <input className='pininput' value={pin6} onChange={e => setpin6(e.target.value)} type="Text" />
                        <div class="btn btn-success" onClick={searchpin6city}>Check</div>
                        <br></br>
                        {pin6city}
                    </div>
                </div>
                <div type="submit" onClick={handlesubmit} class="btn btn-primary">Submit</div>
            </form>
        </div>
    )
}

export default Regdriver