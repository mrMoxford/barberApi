"use strict";
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = (0, mongoose_1.model)("Event", eventSchema);
