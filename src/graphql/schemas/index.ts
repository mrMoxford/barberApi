import { buildSchema } from "graphql";


export const graphqlSchema = buildSchema(`

type Booking {
    _id: ID! 
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  desc: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}
type LoginData {
  userID: ID!
  token: String!
  tokenExpiry: Int!
}

input EventInput {
  title: String!
  desc: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String
}
type rootQuery {
  events: [Event!]!
  users: [User!]! 
  bookings: [Booking!]!
  login(email: String!, password: String!):LoginData!
}
type rootMutation {
 
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createBooking(eventID: ID): Booking
  cancelBooking(bookingID: ID): Event
}

schema {
  query: rootQuery
  mutation: rootMutation
}
`)