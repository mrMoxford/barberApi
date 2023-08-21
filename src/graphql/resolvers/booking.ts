import {Event} from "../../mongooseModels/event"
import { Booking } from "../../mongooseModels/booking"
import {Types} from "mongoose"
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
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking: any) => {
        return bookingTransformer(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args: bookingArgs) => {
    const fetchedEvent = await Event.findOne({ _id: args.eventID });
    const booking = new Booking({
      user: '5c0fbd06c816781c518e4f3e',
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