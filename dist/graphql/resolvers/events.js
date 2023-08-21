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
const user_1 = require("../../mongooseModels/user");
const merge_1 = require("./merge");
const dateTransform_1 = require("../../helpers/dateTransform");
const eventResolver = {
    events: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findEvent = yield event_1.Event.find();
            return findEvent.map((event) => {
                return (0, merge_1.eventTransformer)(event);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    createEvent: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuth) {
            throw new Error("User not authenticated");
        }
        try {
            const event = new event_1.Event({
                title: args.eventInput.title,
                desc: args.eventInput.desc,
                price: +args.eventInput.price,
                date: (0, dateTransform_1.dateTransformer)(args.eventInput.date),
                creator: req.userID
            });
            const createdEvent = yield event.save();
            const user = yield user_1.User.findById(req.userID);
            if (!user) {
                throw new Error("user does not exist");
            }
            user.createdEvents.push(event.toObject());
            yield user.save();
            return (0, merge_1.eventTransformer)(createdEvent);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }),
};
exports.default = eventResolver;
