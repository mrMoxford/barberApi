import {Event} from "../../mongooseModels/event"
import {User} from "../../mongooseModels/user"
import {dateTransformer} from "../../helpers/dateTransform"




export const eventTransformer: Function = (event:any)=>{
    return {...event.toObject() ,date: dateTransformer(event.date), 
        creator: fetchUsers.bind(this, event.creator)}
   }
export const bookingTransformer: Function = (booking: any)=>{
        return {...booking.toObject(), createdAt: dateTransformer(booking.createdAt),
            updatedAt: dateTransformer(booking.updatedAt), user: fetchUsers.bind(this,booking.user), 
            event: fetchSingleEvent.bind(this,booking.event)}
    }
export const userTransformer: Function = (user: any)=>{
        return {...user.toObject(), _id: user.id, password: null, 
        createdEvents: fetchEvents.bind(this, user.createdEvents)}
    }

export const fetchEvents: Function = async (eventIds: string ) => {
    try {
      const events = await Event.find({_id: {$in: eventIds}});
      return events.map((event: any) => {
        return eventTransformer(event)
      });
    } catch (err) {
      throw err;
    }
  };
  export const fetchSingleEvent: Function = async(eventId: string )=> {
    try{
        const event = await Event.findById(eventId)
       return eventTransformer(event)
    }catch(err){throw err}
  }
 export const fetchUsers: Function = async (userId: string) => {
    try {
     const fetchedUser = await User.findById(userId)
     return userTransformer(fetchedUser)
    } catch(err){ throw err}
    }
 