import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    // console.log("entered login");
    const navigate = useNavigate();
    const [{ axiosurl }, dispatch] = useStateValue();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
        const fetchdata = async () => {
            try {
                console.log(axiosurl + '/login', " here")
                const res = await axios.post(axiosurl + '/login', {
                    "username": username,
                    "password": password,
                })
                if (res.data == "1") {
                    dispatch({
                        type: 'SET_USER',
                        user: username
                    })
                    navigate("/userhome")
                }
                else {
                    alert("username or password is incorrect");
                }
            } catch (e) {
                console.log("error during reg : ", e);
            }
        };
        fetchdata();
    }
    return (
        <div>
            <div type="submit" class="btn btn-info mt-5 submitbutton" onClick={e => navigate("/verifybyotp")}>Login Through OTP</div>
            <br></br>
            <br></br>
            <h3>OR</h3>
            <form className='container col-5 mt-3'>
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="Text" class="form-control" />
                </div>
                <div>
                    <label class="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control" />
                </div>
                <button type="submit" onClick={signIn} class="btn btn-primary submitbutton">Login</button>
                <Link to={"/reg"} className="container">
                    <button type="submit" class="btn btn-warning submitbutton">Not a member? Register</button>
                </Link>
            </form>
        </div>
    )
}

export default Login