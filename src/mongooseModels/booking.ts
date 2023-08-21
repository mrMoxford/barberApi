import {Schema, Types, model} from "mongoose"



const bookingScbema = new Schema({
    event: {
        type: Types.ObjectId,
        ref: 'Event'
      },
      user: {
        type: Types.ObjectId,
        ref: 'User'
      }
    },
    { timestamps: true }
)

export = model("booking", bookingScbema) 