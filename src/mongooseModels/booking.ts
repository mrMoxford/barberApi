import mongoose, {Types} from "mongoose";
const Schema = mongoose.Schema


const bookingSchema = new Schema({
    event: {
        type: Types.ObjectId,
        ref : "Event"
    },
    user: {
        type: Types.ObjectId,
        ref : "User"
    },
    
},{ timestamps: true},)

export const Booking: any = mongoose.model("Booking", bookingSchema)