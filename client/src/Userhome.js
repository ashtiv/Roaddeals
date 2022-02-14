import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import axios from 'axios';

function Userhome() {
    const navigate = useNavigate();
    const [{ user, axiosurl }, dispatch] = useStateValue();
    const [usertype, setusertype] = useState('');
    const [userdetails, setuserdetails] = useState({});
    const [listofdrivers, setlistofdrivers] = useState([]);
    const [listofdealers, setlistofdealers] = useState([]);
    const [userofroaddetails, setuserofroaddetails] = useState({});
    const [pin1, setpin1] = useState('');
    const [pin2, setpin2] = useState('');
    const [pin1city, setpin1city] = useState('Pin not entered');
    const [pin2city, setpin2city] = useState('Pin not entered');
    const [listofdriversbyroutes, setlistofdriversbyroutes] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.post(axiosurl + "/getusertype", {
                    "username": user
                })
                if (res.data.Type == "Driver" || res.data.Type == "Dealer") {
                    setusertype(res.data.Type);
                    const fetchdata2 = async () => {
                        try {
                            const res2 = await axios.post(axiosurl + "/getuserdata", {
                                "username": user,
                                "type": res.data.Type
                            })
                            setuserdetails(res2.data);
                            const res3 = await axios.post(axiosurl + "/getuserofroaddata", {
                                "username": user,
                            })
                            setuserofroaddetails(res3.data);
                        } catch (e) {
                            console.log("error : ", e);
                        }
                    };
                    fetchdata2();
                }
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.post(axiosurl + "/getusertype", {
                    "username": user
                })
                if (res.data.Type == "Driver" || res.data.Type == "Dealer") {
                    setusertype(res.data.Type);
                    const fetchdata2 = async () => {
                        try {
                            const res2 = await axios.post(axiosurl + "/getuserdata", {
                                "username": user,
                                "type": res.data.Type
                            })
                            setuserdetails(res2.data);
                        } catch (e) {
                            console.log("error : ", e);
                        }
                    };
                    fetchdata2();
                }
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }, [user])
    const logout = () => {
        dispatch({
            type: 'SET_USER',
            user: null,
        })
        navigate("/");
    }
    const viewlistofdrivers = () => {
        console.log("listing")
        const fetchdata = async () => {
            try {
                const res = await axios.post(axiosurl + "/listofdrivers", {
                    "city": userdetails.City
                })
                console.log(res.data);
                setlistofdrivers(res.data);
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }
    const viewmydealers = () => {
        console.log("listing dealers")
        const fetchdata = async () => {
            try {
                const res = await axios.post(axiosurl + "/listofdealers", {
                    "username": user
                })
                console.log(res.data);
                const res2 = await axios.post(axiosurl + "/listofdealersbyusername", {
                    "datas": res.data
                })
                console.log(res2.data)
                setlistofdealers(res2.data);
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }
    const bookhim = (username) => {
        console.log("booking")
        const fetchdata = async () => {
            try {
                console.log(username, " username for book")
                console.log(userdetails, " userdetails")
                const res = await axios.post(axiosurl + "/bookhim", {
                    "curruser": userofroaddetails,
                    "listuser": username,
                })
                const res2 = await axios.post(axiosurl + "/getuserofroaddata", {
                    "username": user,
                })
                setuserofroaddetails(res2.data);
            } catch (e) {
                console.log("error : ", e);
            }
        };
        fetchdata();
    }
    console.log(userofroaddetails, " userofroadetails");
    const check = (arr, username) => {
        console.log(arr, username, " arr and username");
        if (arr == undefined) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == username) {
                return true;
            }
        }
        return false;
    }
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
    const checkdrivers = e => {
        console.log("handling");
        const city = [pin1city, pin2city];
        for (var i = 0; i < 2; i++) {
            if (city[i] == "Pin not entered" || city[i] == "Invalid Pin") {
                alert("Please enter valid pin in every route and click check");
                return;
            }
        }
        const fetchdata = async () => {
            try {
                const res = await axios.post(axiosurl + '/checkbyroute', {
                    "city": city,
                })
                setlistofdriversbyroutes(res.data);
            } catch (e) {
                console.log("error : ", e);
            }
        }
        fetchdata();
    }
    return (
        <div>
            {usertype == "Driver" ?
                <div>
                    <h2>Welcome {userdetails.Name}</h2>
                    <div className='btn btn-primary' onClick={logout}>Logout</div>
                    <br></br>
                    <div className='btn btn-success mt-5' onClick={viewmydealers}>View/Refresh dealers who have booked me</div>
                    <p>If dealers are not shown then you must haven't refreshed yet or there is no such dealer who booked you</p>
                    <div>{listofdealers.map((i) =>
                        <li className='container card col-5 mt-3 bg-info'>
                            <p>Dealer Name : {i.Name}</p>
                            <p>Dealer's phone number : {i.Mobilenumber}</p>
                            <p>Dealer's material quantity: {i.Quantity} tons</p>
                            <p>Dealer's Location: {i.City}</p>
                        </li>
                    )}</div>
                </div>
                :
                <div>
                    <h2>Welcome {userdetails.Name}</h2>
                    <div className='btn btn-primary' onClick={logout}>Logout</div>
                    <br></br>
                    <div className='btn btn-success mt-5' onClick={viewlistofdrivers}>View/Refresh drivers list interested in my location i.e {userdetails.City}</div>
                    <p>If drivers are not shown then you must haven't refreshed yet or there is no such driver through your location</p>
                    <div>{listofdrivers.map((i) =>
                        <li className='container card col-5 mt-3'>
                            <p>Driver Name : {i.Name}</p>
                            <p>Drivers phone number : {i.Mobilenumber}</p>
                            <p>Drivers truck capacity : {i.Truckcapacity} tons</p>
                            <div className='btn btn-warning' onClick={e => bookhim(i.Username)}>{check(userofroaddetails?.Booked, i.Username) ? <p>Booked</p> : <p>Book Him</p>}</div>
                        </li>
                    )}</div>
                    <form className='container col-6 border border-danger mt-3 mb-3'>
                        <h3 className='border m-1 p-2 border-success'>Search drivers by routes</h3>
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
                        <div onClick={checkdrivers} type="submit" class="btn btn-primary">Check Drivers</div>
                        <p>If drivers are not shown then you must haven't checked routes or there is no such driver on this route</p>
                        <div>{listofdriversbyroutes.map((i) =>
                            <li className='container card col-10 mt-3'>
                                <p>Driver Name : {i.Name}</p>
                                <p>Drivers phone number : {i.Mobilenumber}</p>
                                <p>Drivers truck capacity : {i.Truckcapacity} tons</p>
                                <div className='btn btn-warning' onClick={e => bookhim(i.Username)}>{check(userofroaddetails?.Booked, i.Username) ? <p>Booked</p> : <p>Book Him</p>}</div>
                            </li>
                        )}</div>
                    </form>
                </div>
            }
        </div >
    )
}

export default Userhome