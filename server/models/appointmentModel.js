const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
    agent_email_fkey: { type: String },
    user_email_fkey: { type: String },
    date: { type: Date },
    time: { type: String },
    status: { type: String },
    notes: { type: String },
    date_created: { type: Date },
}, { timestamps: true });

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = { Appointment }