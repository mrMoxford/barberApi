import mongoose , {Types} from "mongoose";


const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{ 
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
        type: Types.ObjectId,
        ref: 'Event'
        }
]
})
 export const User = mongoose.model("User", userSchema)