import { Types } from "mongoose";
import {IGetUserAuthInfoRequest} from "../../middleware/authorised"
import {Event} from "../../mongooseModels/event"
import {User} from "../../mongooseModels/user"
import {eventTransformer} from "./merge"
import {dateTransformer} from "../../helpers/dateTransform"
interface eventArgs {
    eventInput: {
     title: string,
     desc: string,
     price: number,
     date: Date,
     creator: Types.ObjectId,
    }
   }
const eventResolver = {
    events: async()=> { 
        try{
          const findEvent: (object)[] = await Event.find()
           return findEvent.map((event:any) => {
            return eventTransformer(event)
           });
         }
        catch(err){
          throw err
        }
       },
    createEvent: async(args: eventArgs, req: IGetUserAuthInfoRequest)=> {
      if(!req.isAuth){
        throw new Error ("User not authenticated")
      }
        try{
          const event = new Event({
            title: args.eventInput.title,
            desc: args.eventInput.desc,
            price: +args.eventInput.price,
            date: dateTransformer(args.eventInput.date!),
            creator: req.userID
          })
      
          const createdEvent: any = await event.save()
           const user =  await User.findById(req.userID)
            if(!user){
              throw new Error("user does not exist")
            }
            user.createdEvents.push(event.toObject());
            await user.save();
            return eventTransformer(createdEvent)
          
        }
        catch(err){
          console.log(err)
          throw err
        }
      },

}
    export default eventResolver 