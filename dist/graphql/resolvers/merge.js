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
exports.fetchUsers = exports.fetchSingleEvent = exports.fetchEvents = exports.userTransformer = exports.bookingTransformer = exports.eventTransformer = void 0;
const event_1 = require("../../mongooseModels/event");
const user_1 = require("../../mongooseModels/user");
const dateTransform_1 = require("../../helpers/dateTransform");
const eventTransformer = (event) => {
    return Object.assign(Object.assign({}, event.toObject()), { date: (0, dateTransform_1.dateTransformer)(event.date), creator: exports.fetchUsers.bind(this, event.creator) });
};
exports.eventTransformer = eventTransformer;
const bookingTransformer = (booking) => {
    return Object.assign(Object.assign({}, booking.toObject()), { createdAt: (0, dateTransform_1.dateTransformer)(booking.createdAt), updatedAt: (0, dateTransform_1.dateTransformer)(booking.updatedAt), user: exports.fetchUsers.bind(this, booking.user), event: exports.fetchSingleEvent.bind(this, booking.event) });
};
exports.bookingTransformer = bookingTransformer;
const userTransformer = (user) => {
    return Object.assign(Object.assign({}, user.toObject()), { _id: user.id, password: null, createdEvents: exports.fetchEvents.bind(this, user.createdEvents) });
};
exports.userTransformer = userTransformer;
const fetchEvents = (eventIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.Event.find({ _id: { $in: eventIds } });
        return events.map((event) => {
            return (0, exports.eventTransformer)(event);
        });
    }
    catch (err) {
        throw err;
    }
});
exports.fetchEvents = fetchEvents;
const fetchSingleEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_1.Event.findById(eventId);
        return (0, exports.eventTransformer)(event);
    }
    catch (err) {
        throw err;
    }
});
exports.fetchSingleEvent = fetchSingleEvent;
const fetchUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUser = yield user_1.User.findById(userId);
        return (0, exports.userTransformer)(fetchedUser);
    }
    catch (err) {
        throw err;
    }
});
exports.fetchUsers = fetchUsers;
