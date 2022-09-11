const { Appointment } = require("../../models/appointmentModel");
const { transporter } = require("../utils/emailService.js");

function mailAppointmentNotice(receiver_email, sender_email, date, time, notes) {
    try {
        let mailOptions = {
            from: "Rent-A-Home",
            to: receiver_email,
            subject: "Appointment Confirmation",
            text: `Hello,\n\nYou have an appointment with ${sender_email} on ${date} at ${time}.\n\nNotes: ${notes}\n\nRegards,\nRent-A-Home Team.`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function scheduleAppointment(appointment_data) {
    try {
        return new Promise(async (resolve, reject) => {
            if (appointment_data.client_type == "user") {
                let user_email = appointment_data.client_email;
                let agent_email = appointment_data.agent_email;
                let date = appointment_data.date;
                let time = appointment_data.time;
                let notes = appointment_data.notes;
                let appointment_id = appointment_data._id;
                let appointment_data = { user_email, agent_email, date, time, notes, appointment_id };
                let appointment = new Appointment(appointment_data);
                await appointment.save();
                mailAppointmentNotice(agent_email, user_email, date, time, notes);
            } else if (appointment_data.client_type == "agent") {
                let agent_email = appointment_data.client_email;
                let user_email = appointment_data.user_email;
                let date = appointment_data.date;
                let time = appointment_data.time;
                let notes = appointment_data.notes;
                let appointment_id = appointment_data._id;
                let appointment_data = { agent_email, user_email, date, time, notes, appointment_id };
                let appointment = new Appointment(appointment_data);
                await appointment.save();
                mailAppointmentNotice(user_email, agent_email, date, time, notes);
            }
            resolve({ message: "Appointment scheduled successfully" });

        });
    } catch (error) {
        console.log(error);
        reject(error);
    }
}

module.exports = {
    scheduleAppointment
}