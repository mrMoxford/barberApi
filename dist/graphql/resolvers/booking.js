"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../mongooseModels/event");
const booking_1 = require("../../mongooseModels/booking");
const merge_1 = require("./merge");
const bookingResolver = {
    booking: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookings = yield booking_1.Booking.find();
            return bookings.map((booking) => {
                return (0, merge_1.bookingTransformer)(booking);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    createBooking: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuth) {
            throw new Error("User not authenticated");
        }
        const fetchedEvent = yield event_1.Event.findOne({ _id: args.eventID });
        const booking = new booking_1.Booking({
            user: req.userID,
            event: fetchedEvent
        });
        const result = yield booking.save();
        return (0, merge_1.bookingTransformer)(result);
    }),
    cancelBooking: (args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = yield booking_1.Booking.findById(args.bookingID).populate('event');
            const event = (0, merge_1.eventTransformer)(booking.event);
            yield booking_1.Booking.deleteOne({ _id: args.bookingID });
            return event;
        }
        catch (err) {
            throw err;
        }
    })
};
exports.default = bookingResolver;
