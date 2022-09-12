const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const status = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Agent", "EndUser"]
    },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamp: true })

const Status = mongoose.model("Status", status)

module.exports = {
    Status
}