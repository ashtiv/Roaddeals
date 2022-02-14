import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const otpschema = new Schema(
    {
        Email: String,
        Otp: String,
        Valid: String
    }
);
const otpdata = mongoose.model('otpdata', otpschema)
export default otpdata;