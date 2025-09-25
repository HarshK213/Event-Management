import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import { studentService } from "../API/student.js";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllEvents = async () => {
        try {
            const res = await studentService.getUpcomingEvents();
            if (res.success && res.data) {
                setEvents(res.data);
            }
        } catch (error) {
            console.error("Event fetch failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 w-screen min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    VIT Event Management
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Discover and register for upcoming events
                </p>
            </div>

            {/* All Events Section */}
            <div className="max-w-7xl mx-auto">
                <p className="px-4 font-bold text-4xl mb-4">All Events</p>
                <div className="border-2 border-black mx-5 mb-6"></div>
                
                <div className="flex flex-wrap px-5">
                    {events && events.length > 0 ? (
                        events.map((event) => (
                            <div key={event._id} className="p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <EventCard
                                    _id={event._id}
                                    name={event.name}
                                    seatsLeft={event.seats - event.registered}
                                    price={event.fee}
                                    venue={event.venue}
                                    date={event.date}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-12">
                            <p className="text-xl text-gray-500">No events available at the moment.</p>
                            <p className="text-gray-400 mt-2">Check back later for new events!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;