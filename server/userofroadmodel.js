import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userschema = new Schema(
    {
        Username: String,
        Email: String,
        Pass: String,
        Type: String,
        Booked: []
    }
)
const userofroad = mongoose.model('usersofroad', userschema)
export default userofroad;