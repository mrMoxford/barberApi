import {Event} from "../../mongooseModels/event"
import { Booking } from "../../mongooseModels/booking"
import {Types} from "mongoose"
import {IGetUserAuthInfoRequest} from "../../middleware/authorised"
import {bookingTransformer,eventTransformer} from "./merge"
  
interface bookingArgs {
    eventID:{
     event: Types.ObjectId
     user: Types.ObjectId
    }
}

interface cancelBookingArgs {
  bookingID: {
    event: Types.ObjectId
    uaer: Types.ObjectId
  }
}
const bookingResolver = {
  booking: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking: any) => {
        return bookingTransformer(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  createBooking: async (args: bookingArgs,req: IGetUserAuthInfoRequest) => {
    if(!req.isAuth){
      throw new Error ("User not authenticated")
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventID });
    const booking = new Booking({
      user: req.userID,
      event: fetchedEvent
    });
    const result = await booking.save();
    return bookingTransformer(result);
  },
  cancelBooking: async (args: cancelBookingArgs) => {
    try {
      const booking = await Booking.findById(args.bookingID).populate('event');
      const event = eventTransformer(booking!.event);
      await Booking.deleteOne({ _id: args.bookingID });
      return event;
    } catch (err) {
      throw err;
    }
  }
  };
  
  export default bookingResolver