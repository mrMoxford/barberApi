"use strict";
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Event'
        }
    ]
});
module.exports = (0, mongoose_1.model)("User", userSchema);
