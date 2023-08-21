import eventResolver from "./events";
import userResolver from "./auth";
import bookingResolver from "./booking";

const graphqlResolvers =  {...eventResolver,...userResolver,...bookingResolver}
export default graphqlResolvers;