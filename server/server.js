import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import driver from './drivermodel.js'
import dealer from './dealermodel.js';
import userofroad from './userofroadmodel.js';
import nodemailer from 'nodemailer';
import otpdata from './otpmodel.js';
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
        // here enter your email and password of gmail account
    }
});
const app = express();
app.use(express.json());
app.use(cors({ credentials: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
const port = process.env.PORT || 5000;
const connection_url = 'mongodb+srv://ashitiv:ashtiv@cluster0.vcvjy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;
app.get('/', (req, res) => { res.send('Welcome to server') })
app.post('/regthisdriver', (req, res) => {
    const obj = new driver(req.body)
    // console.log(obj, " oobbjj"); 
    obj.save();
    res.send("added driver")
})
app.post('/regthisdealer', (req, res) => {
    const obj = new dealer(req.body)
    // console.log(obj, " oobbjj"); 
    obj.save();
    res.send("added dealer")
})
app.post('/step_d', (req, res) => {
    const obj = new userofroad(req.body)
    // console.log(obj, " oobbjj"); 
    obj.save();
    res.send("added driver step1")
})
app.post('/search', (req, res) => {
    const uname = req.body.Username;
    const email = req.body.Email;
    var cnt = parseInt(0);
    const fetchdata = async () => {
        userofroad.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                for (var i = parseInt(0); i < data.length; i++) {
                    if (data[i].Username == uname || data[i].Email == email) {
                        cnt = cnt + 1;
                    }
                }
                res.send(cnt.toString());
            }
        })
    }
    fetchdata();
})
app.post('/searchemail', (req, res) => {
    const email = req.body.Email;
    var cnt = parseInt(0);
    const fetchdata = async () => {
        userofroad.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                for (var i = parseInt(0); i < data.length; i++) {
                    if (data[i].Email == email) {
                        cnt = cnt + 1;
                    }
                }
                res.send(cnt.toString());
            }
        })
    }
    fetchdata();
})
app.post('/verifyemail', (req, res) => {
    const email = req.body.Email;
    const otp = Math.floor((Math.random() * 999999) + 100000);
    const mailDetails = {
        from: 'e90055589@gmail.com',
        to: email,
        subject: 'Verify OTP for roaddeals signin',
        text: 'Your OTP for roaddeals singin is : ' + otp + '. It is valid for today only',
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            // console.log(err, 'Error occurs')
            res.send('error');
        } else {
            console.log('Email sent successfully');
            res.send(otp.toString());
        }
    });
})
app.post('/addotp', (req, res) => {
    const obj = req.body;
    const fetchdata = async () => {
        otpdata.findOneAndUpdate({ Email: obj.Email }, { Otp: obj.Otp, Valid: obj.Valid }, { upsert: true }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                console.log("otp updated")
                res.send("success");
            }
        })
    }
    fetchdata();
})
app.post('/login', (req, res) => {
    const uname = req.body.username;
    const pass = req.body.password;
    var cnt = parseInt(0);
    const fetchdata = async () => {
        userofroad.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                for (var i = parseInt(0); i < data.length; i++) {
                    // console.log(data[i]);
                    // console.log(uname, pass);
                    if (data[i].Username == uname && data[i].Pass == pass) {
                        cnt = 1;
                        break;
                    }
                }
                res.send(cnt.toString());
            }
        })
    }
    fetchdata();
})
app.post('/loginbyotp', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const valid = req.body.valid;
    var cnt = parseInt(0);
    const fetchdata = async () => {
        otpdata.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                for (var i = parseInt(0); i < data.length; i++) {
                    if (data[i].Email == email && data[i].Otp == otp && data[i].Valid == valid) {
                        cnt = 1;
                        break;
                    }
                }
                res.send(cnt.toString());
            }
        })
    }
    fetchdata();
})
app.post('/getuserbyemail', (req, res) => {
    console.log('getuserbyemail called');
    const email = req.body.email;
    const fetchdata = async () => {
        userofroad.find({ Email: email }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data[0].Username);
            }
        })
    }
    fetchdata();
})
app.post('/getusertype', (req, res) => {
    const uname = req.body.username;
    console.log(uname, " uname");
    const fetchdata = async () => {
        userofroad.find({ Username: uname }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data[0]);
            }
        })
    }
    fetchdata();
})
app.post('/getuserdata', (req, res) => {
    const uname = req.body.username;
    const type = req.body.type;
    // console.log(uname, " uname");
    if (type == "Dealer") {
        const fetchdata = async () => {
            dealer.find({ Username: uname }, (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(data[0]);
                }
            })
        }
        fetchdata();
    }
    else if (type == "Driver") {
        const fetchdata = async () => {
            driver.find({ Username: uname }, (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(data[0]);
                }
            })
        }
        fetchdata();
    }
})
app.post('/getuserofroaddata', (req, res) => {
    const uname = req.body.username;
    // console.log(uname, " uname");
    const fetchdata = async () => {
        userofroad.find({ Username: uname }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data[0]);
            }
        })
    }
    fetchdata();
})
app.post('/listofdrivers', (req, res) => {
    const city = req.body.city;
    var result = [];
    const fetchdata = async () => {
        driver.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < 6; j++) {
                        if (city == data[i].Interestedroute[j]) {
                            result.push(data[i]);
                            break;
                        }
                    }
                }
                res.send(result);
            }
        })
    }
    fetchdata();
})
app.post('/listofdealers', (req, res) => {
    const uname = req.body.username;
    var result = [];
    console.log("leastofdealers called")
    const fetchdata = async () => {
        userofroad.find({ Type: "Dealer" }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                // console.log(data);
                console.log(uname, " uname");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].Booked.length; j++) {
                        if (uname == data[i].Booked[j]) {
                            result.push(data[i].Username);
                            break;
                        }
                    }
                }
                console.log(result);
                res.send(result);
            }
        })
    }
    fetchdata();
})
app.post('/listofdealersbyusername', (req, res) => {
    console.log("listofdealersbyusername called");
    const datas = req.body.datas;
    var result = [];
    const fetchdata = async () => {
        dealer.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                console.log(datas);
                console.log(data);
                for (var i = 0; i < datas.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].Username == datas[i]) {
                            result.push(data[j]);
                            break;
                        }
                    }
                }
                res.send(result);
            }
        })
    }
    fetchdata();
})
app.post('/bookhim', (req, res) => {
    const curruser = req.body.curruser;
    const listuser = req.body.listuser;
    var arr = req.body.curruser.Booked;
    var cnt = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == listuser) {
            cnt++;
        }
    }
    if (cnt == 0) {
        arr.push(listuser);
    }
    const fetchdata = async () => {
        userofroad.findOneAndUpdate({ Username: curruser.Username }, { Booked: arr }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                // console.log(data);
                // var arr = data[0].booked;
                // console.log(data);
                res.send("done");
            }
        })
    }
    fetchdata();
})
app.post('/checkbyroute', (req, res) => {
    const city = req.body.city;
    var result = [];
    const fetchdata = async () => {
        driver.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Interestedroute[0] == city[0] && data[i].Interestedroute[1] == city[1]) {
                        result.push(data[i]);
                    }
                    else if (data[i].Interestedroute[2] == city[0] && data[i].Interestedroute[3] == city[1]) {
                        result.push(data[i]);
                    }
                    else if (data[i].Interestedroute[4] == city[0] && data[i].Interestedroute[5] == city[1]) {
                        result.push(data[i]);
                    }
                }
                res.send(result);
            }
        })
    }
    fetchdata();
})
app.post('/sendotp', (req, res) => {

})
app.listen(port, () => console.log(`Listening on localhost:${port}`));

