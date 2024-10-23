const express = require('express');
const Event = require('../models/Event'); // Import the Event model

const router = express.Router();

// POST route for adding an event
router.post('/add', async (req, res) => {
    const { title, description, date, location, imageURL } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            imageURL,   // Handle imageURL from the request body
            bookings: 0 // Initialize bookings to 0 when adding a new event
        });

        await newEvent.save();
        res.status(201).json({ msg: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// PUT route for updating an event by ID
router.put('/:id', async (req, res) => {
    const { title, description, date, location, imageURL } = req.body;

    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Update event fields if they are provided in the request body
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.imageURL = imageURL || event.imageURL;

        await event.save();

        res.json({ msg: 'Event updated successfully', event });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// DELETE route for deleting an event by ID (Fix)
router.delete('/delete/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove()
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(200).json({ msg: 'Event deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET route for fetching all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events); // Automatically includes imageURL and bookings
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
