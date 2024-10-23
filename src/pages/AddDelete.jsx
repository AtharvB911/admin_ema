import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddDelete() {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        imageURL: ''  // Add imageURL field
    });

    const [events, setEvents] = useState([]);

    // Fetch all events from the database to display
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');  // Adjust URL if needed
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    // Handle input changes for the form
    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    // Submit the form to add a new event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/events/add', eventData);
            alert(res.data.msg);  // Feedback for the user
            setEvents([...events, res.data.event]);  // Add the new event to the state list
            setEventData({ title: '', description: '', date: '', location: '', imageURL: '' });  // Clear form fields after submission
        } catch (err) {
            console.error('Error adding event:', err);
        }
    };

    // Delete an event by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/delete/${id}`);
            setEvents(events.filter((event) => event._id !== id));  // Remove deleted event from state
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    return (
        <div className="admin-dashboard flex flex-col items-center min-h-screen bg-gray-100">
            {/* Header Section */}
            <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 text-center">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-lg mt-2">Manage events, view bookings, and control your event management system.</p>
            </section>

            {/* Add New Event Section */}
            <section className="my-16 px-4 sm:px-8 lg:px-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Add a New Event</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={eventData.title}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={eventData.description}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Event Location"
                        value={eventData.location}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="Image URL"
                        value={eventData.imageURL}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded font-semibold hover:bg-purple-700 transition duration-300">
                        Add Event
                    </button>
                </form>
            </section>

            {/* Existing Events Section */}
            <section className="w-full bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Manage Existing Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img src={event.imageURL} alt={event.title} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{event.title}</h3>
                                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-gray-600">{event.location}</p>
                                <p className="text-gray-600">{event.description}</p>
                                <p className="text-gray-600 font-bold">Bookings: {event.bookings}</p> {/* Show number of bookings */}
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="mt-4 w-full bg-red-500 text-white p-2 rounded font-semibold hover:bg-red-600 transition duration-300"
                                >
                                    Delete Event
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="w-full bg-gray-800 text-gray-400 p-8 text-center">
                <p className="mb-2">© 2024 Admin Dashboard. All Rights Reserved.</p>
                <p>
                    <a href="#" className="text-white underline">
                        Privacy Policy
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-white underline">
                        Terms of Service
                    </a>
                </p>
            </footer>
        </div>
    );
}
