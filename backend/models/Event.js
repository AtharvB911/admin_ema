// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    imageURL: { type: String, required: true },  // New field to store image URL
    bookings: { type: Number, default: 0 },  // New field to store number of bookings
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
