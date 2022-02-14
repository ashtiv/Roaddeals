import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useStateValue } from './StateProvider';
import { Link, useNavigate } from 'react-router-dom';

function Verify() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [{ axiosurl, regemail }, dispatch] = useStateValue();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const verifybyotp = e => {
        e.preventDefault();
        const fetchdata = async () => {
            try {
                if (email.length == 0) {
                    alert("Fill input properly");
                    return;
                }
                else if (!validateEmail(email)) {
                    alert("Invalid email address");
                    return;
                }
                const res = await axios.post(axiosurl + '/searchemail', {
                    "Email": email,
                })
                if (res.data == "0") {
                    alert("No such email address registered");
                }
                else {
                    const fetchdata2 = async () => {
                        try {
                            const res2 = await axios.post(axiosurl + '/verifyemail', {
                                "Email": email,
                            })
                            if (res2.data != 'error') {
                                var today = new Date();
                                var dd = String(today.getDate()).padStart(2, '0');
                                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                var yyyy = today.getFullYear();
                                today = mm + '/' + dd + '/' + yyyy;
                                console.log("today ", today);
                                const res3 = await axios.post(axiosurl + '/addotp', {
                                    "Email": email,
                                    "Otp": res2.data,
                                    "Valid": today
                                })
                                if (res3.data == "success") {
                                    navigate("/loginbyotp");
                                }
                                dispatch({
                                    type: 'REG1',
                                    regemail: email,
                                    regusername: null,
                                    regpassword: null,
                                    regtype: null
                                })
                            }
                            else {
                                alert("Some error occured. Try again after refresh");
                            }
                        } catch (e) {
                            console.log("error : ", e);
                        }
                    }
                    fetchdata2();
                }
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }
    return (
        <form className='container col-5 mt-3'>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" />
            </div>
            <button type="submit" onClick={verifybyotp} class="btn btn-primary">Login</button>
            <br></br>
            <br></br>
            <Link to={"/"} className="container">
                <button type="submit" class="btn btn-warning">Login through username and password</button>
            </Link>
            <Link to={"/reg"} className="container">
                <button type="submit" class="btn btn-success">Not a member? Register</button>
            </Link>
        </form>
    )
}

export default Verify