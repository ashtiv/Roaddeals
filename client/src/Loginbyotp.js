import React from 'react'
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Loginbyotp() {
    const navigate = useNavigate();
    const [otp, setotp] = useState('');
    const [{ regemail, axiosurl }, dispatch] = useStateValue();
    const signIn = e => {
        e.preventDefault();
        const fetchdata = async () => {
            try {
                // console.log(axiosurl + '/login', " here")
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                const res = await axios.post(axiosurl + '/loginbyotp', {
                    "email": regemail,
                    "otp": otp,
                    "valid": today
                })
                if (res.data == "1") {
                    const res2 = await axios.post(axiosurl + '/getuserbyemail', {
                        "email": regemail,
                    })
                    dispatch({
                        type: 'SET_USER',
                        user: res2.data
                    })
                    navigate("/userhome");
                }
                else {
                    alert("Otp incorrect or expired");
                }
            } catch (e) {
                console.log("error during reg : ", e);
            }
        };
        fetchdata();
    }
    return (
        <form className='container col-5 mt-3'>
            <div>
                <p>Check your email and enter the otp. This otp is only valid for today.</p>
                <label class="form-label">Enter Otp</label>
                <input value={otp} onChange={e => setotp(e.target.value)} type="text" class="form-control" />
            </div>
            <button type="submit" onClick={signIn} class="btn btn-primary mt-3">Login</button>
            <br></br>
            <br></br>
            <Link to={"/"} className="container">
                <button type="submit" class="btn btn-warning">Login through username and password</button>
            </Link>
            <br></br>
            <br></br>
            <Link to={"/reg"} className="container">
                <button type="submit" class="btn btn-success">Not a member? Register</button>
            </Link>
        </form>
    )
}

export default Loginbyotp