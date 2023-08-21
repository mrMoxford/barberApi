import mongoose, {Types} from "mongoose";
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title:{ 
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
})
 export const Event = mongoose.model("Event", eventSchema)