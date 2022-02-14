import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dealerschema = new Schema(
    {
        Username: String,
        Email: String,
        Name: String,
        Mobilenumber: String,
        Natureofmat: String,
        Quantity: Number,
        City: String,
    }
);
const dealer = mongoose.model('dealers', dealerschema)
export default dealer;