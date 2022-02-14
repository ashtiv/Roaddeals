import React, { useState } from 'react';
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from 'axios';

function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('User Type');
    const [{ axiosurl }, dispatch] = useStateValue();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const SignUp = e => {
        e.preventDefault();
        const fetchdata = async () => {
            try {
                console.log(axiosurl + '/search', " here")
                const res = await axios.post(axiosurl + '/search', {
                    "Username": username,
                    "Email": email,
                })
                if (username.length == 0 || password.length == 0 || email.length == 0) {
                    alert("Fill input properly");
                    return;
                }
                else if (!validateEmail(email)) {
                    alert("Invalid email address");
                    return;
                }
                else if (password.length < 8) {
                    alert("Password should have minimum length of 8 characters");
                    return;
                }
                else if (type != "Driver" && type != "Dealer") {
                    alert("Choose user type");
                    return;
                }
                if (res.data == "0") {
                    dispatch({
                        type: 'REG1',
                        regemail: email,
                        regusername: username,
                        regpassword: password,
                        regtype: type
                    })
                    if (type == "Driver") {
                        navigate("/regdriver")
                    }
                    else {
                        navigate("/regdealer")
                    }
                }
                else {
                    alert("username or email id already taken");
                }
            } catch (e) {
                console.log("error during reg : ", e);
            }
        };
        fetchdata();
    }
    return (
        <form className='container col-5 mt-5'>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="Text" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control" />
            </div>
            <div class="dropdown">
                <button class="btn btn-danger dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {type}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={e => setType("Driver")} class="dropdown-item typelist">Driver</li>
                    <li onClick={e => setType("Dealer")} class="dropdown-item typelist">Dealer</li>
                </ul>
            </div>
            <button onClick={SignUp} type="submit" class="btn btn-primary submitbutton">Register</button>
            <Link to={"/"} className="container">
                <button type="submit" class="btn btn-warning submitbutton">Already a member? Login</button>
            </Link>
        </form>
    )
}

export default Registration