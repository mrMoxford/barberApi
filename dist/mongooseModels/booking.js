"use strict";
const mongoose_1 = require("mongoose");
const bookingScbema = new mongoose_1.Schema({
    event: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
module.exports = (0, mongoose_1.model)("booking", bookingScbema);
