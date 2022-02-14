import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const driverschema = new Schema(
    {
        Username: String,
        Email: String,
        Name: String,
        Age: Number,
        Trucknumber: String,
        Mobilenumber: String,
        Truckcapacity: Number,
        Transportername: String,
        Dexp: Number,
        Interestedroute: []
    }
);
const driver = mongoose.model('drivers', driverschema)
export default driver;