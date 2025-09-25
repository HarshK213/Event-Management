// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { studentService } from '../API/student.js'; // Adjust path as needed
// import {EventCard} from '../components/allComponents.js'; // Adjust path as needed

// function MyEvents() {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     const { user } = useSelector((state) => state.auth);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 setLoading(true);
//                 setError('');

//                 if (user?.role === 'coordinator') {
//                     // Fetch all events and filter by coordinator email
//                     const response = await studentService.getUpcomingEvents();
//                     if (response.success && response.data) {
//                         // Filter events where coordinatorId matches current user's email
//                         const coordinatorEvents = response.data.filter(
//                             event => event.coordinatorId === user._id
//                         );
//                         setEvents(coordinatorEvents);
//                     }
//                 } else if (user?.role === 'student') {
//                     // Fetch student's registered events
//                     const response = await studentService.getMyEvents();
//                     if (response.success && response.data) {
//                         setEvents(response.data);
//                     } else {
//                         setEvents([]);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//                 setError('Failed to load events');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user) {
//             fetchEvents();
//         }
//     }, [user]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-red-500 text-xl">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//             {/* Header based on role */}
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                     {user?.role === 'coordinator' ? 'My Coordinated Events' : 'My Registered Events'}
//                 </h1>
                
//                 {/* Events Grid */}
//                 {events.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {events.map((event) => (
//                             <EventCard
//                                 key={event._id}
//                                 _id={event._id}
//                                 name={event.name}
//                                 seatsLeft={event.seats - event.registered}
//                                 price={event.fee}
//                                 venue={event.venue}
//                                 date={event.date}
//                                 // Add additional props if needed
//                                 description={event.description}
//                                 time={event.time}
//                                 registered={event.registered}
//                                 totalSeats={event.seats}
//                             />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <div className="text-gray-500 dark:text-gray-400 text-lg">
//                             {user?.role === 'coordinator' 
//                                 ? "You haven't coordinated any events yet."
//                                 : "You haven't registered for any events yet."
//                             }
//                         </div>
//                         {user?.role === 'student' && (
//                             <button 
//                                 onClick={() => window.location.href = '/'}
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//                             >
//                                 Browse Events
//                             </button>
//                         )}
//                     </div>
//                 )}

//                 {/* Stats for Coordinator */}
//                 {user?.role === 'coordinator' && events.length > 0 && (
//                     <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                         <h2 className="text-xl font-semibold mb-4">Event Statistics</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded">
//                                 <div className="text-2xl font-bold">{events.length}</div>
//                                 <div className="text-sm">Total Events</div>
//                             </div>
//                             <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded">
//                                 <div className="text-2xl font-bold">
//                                     {events.reduce((total, event) => total + event.registered, 0)}
//                                 </div>
//                                 <div className="text-sm">Total Registrations</div>
//                             </div>
//                             <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded">
//                                 <div className="text-2xl font-bold">
//                                     {events.reduce((total, event) => total + (event.seats - event.registered), 0)}
//                                 </div>
//                                 <div className="text-sm">Available Seats</div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default MyEvents;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { studentService } from "../API/student.js"; // Adjust path as needed
// import EventCard from "../components/EventCard.jsx"; // Adjust path as needed

// function MyEvents() {
//     const [registrations, setRegistrations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     const { user } = useSelector((state) => state.auth);

//     useEffect(() => {
//         const fetchMyEvents = async () => {
//             try {
//                 setLoading(true);
//                 setError('');

//                 const response = await studentService.getMyEvents();
//                 if (response.success) {
//                     // Handle the array of registration objects
//                     const registrationsData = Array.isArray(response.data) 
//                         ? response.data 
//                         : response.data?.myEvents || response.data?.events || [];
                    
//                     setRegistrations(registrationsData);
//                     console.log('Registrations data:', registrationsData);
//                 } else {
//                     setRegistrations([]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//                 setError('Failed to load events');
//                 setRegistrations([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user) {
//             fetchMyEvents();
//         }
//     }, [user]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-red-500 text-xl">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                     {user?.role === 'coordinator' ? 'My Coordinated Events' : 'My Registered Events'}
//                 </h1>
                
//                 {/* Events Grid */}
//                 {registrations.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {registrations.map((registration) => {
//                             // Extract event data from registration object
//                             // Since you have eventId field, we need to handle it properly
//                             const eventData = registration.eventId 
//                                 ? { 
//                                     _id: registration.eventId,
//                                     // If eventId is an object with event details, spread them
//                                     ...(typeof registration.eventId === 'object' ? registration.eventId : {})
//                                   }
//                                 : registration; // Fallback to registration if no eventId
                            
//                             return (
//                                 <div key={registration._id} className="p-2">
//                                     <EventCard
//                                         _id={eventData._id}
//                                         name={eventData.name || 'Event Name'}
//                                         seatsLeft={eventData.seats ? eventData.seats - eventData.registered : 0}
//                                         price={eventData.fee || 0}
//                                         venue={eventData.venue || 'Venue not specified'}
//                                         date={eventData.date || 'Date not specified'}
//                                         // Additional props if your EventCard supports them
//                                         description={eventData.description}
//                                         time={eventData.time}
//                                     />
//                                     {/* Show registration details if available */}
//                                     {user?.role === 'student' && (
//                                         <div className="mt-2 text-xs text-gray-500">
//                                             Registered on: {new Date(registration.createdAt).toLocaleDateString()}
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <div className="text-gray-500 dark:text-gray-400 text-lg">
//                             {user?.role === 'coordinator' 
//                                 ? "You haven't coordinated any events yet."
//                                 : "You haven't registered for any events yet."
//                             }
//                         </div>
//                         {user?.role === 'student' && (
//                             <button 
//                                 onClick={() => window.location.href = '/'}
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//                             >
//                                 Browse Events
//                             </button>
//                         )}
//                     </div>
//                 )}

//                 {/* Debug Info - Remove in production */}
//                 <details className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
//                     <summary className="cursor-pointer font-semibold">Debug Registration Data</summary>
//                     <pre className="mt-2 text-xs overflow-auto">
//                         {JSON.stringify(registrations, null, 2)}
//                     </pre>
//                 </details>
//             </div>
//         </div>
//     );
// }

// export default MyEvents;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { studentService } from "../API/student.js"; // Adjust path as needed
import EventCard from "../components/EventCard.jsx"; // Adjust path as needed

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError('');

                if (user?.role === 'coordinator') {
                    // Fetch all events and filter by coordinator ID
                    const response = await studentService.getUpcomingEvents();
                    if (response.success && response.data) {
                        // Filter events where coordinatorId matches current user's ID
                        const coordinatorEvents = response.data.filter(
                            event => event.coordinatorId === user._id
                        );
                        setEvents(coordinatorEvents);
                    } else {
                        setEvents([]);
                    }
                } else if (user?.role === 'student') {
                    // Fetch student's registered events
                    const response = await studentService.getMyEvents();
                    if (response.success && response.data) {
                        // Handle the array of registration objects
                        const registrationsData = Array.isArray(response.data) 
                            ? response.data 
                            : response.data?.myEvents || response.data?.events || [];
                        
                        setEvents(registrationsData);
                        console.log('Student registrations data:', registrationsData);
                    } else {
                        setEvents([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events');
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchEvents();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    const renderEventCard = (eventItem, index) => {
        if (user?.role === 'coordinator') {
            // For coordinators, eventItem is the event object directly
            return (
                <div key={eventItem._id || index} className="p-2">
                    <EventCard
                        _id={eventItem._id}
                        name={eventItem.name || 'Event Name'}
                        seatsLeft={eventItem.seats ? eventItem.seats - eventItem.registered : 0}
                        price={eventItem.fee || 0}
                        venue={eventItem.venue || 'Venue not specified'}
                        date={eventItem.date || 'Date not specified'}
                        description={eventItem.description}
                        time={eventItem.time}
                    />
                    <div className="mt-2 text-xs text-gray-500">
                        Created on: {new Date(eventItem.createdAt).toLocaleDateString()}
                    </div>
                </div>
            );
        } else {
            // For students, eventItem is a registration object
            const eventData = eventItem.eventId 
                ? { 
                    _id: eventItem.eventId,
                    // If eventId is an object with event details, spread them
                    ...(typeof eventItem.eventId === 'object' ? eventItem.eventId : {})
                  }
                : eventItem; // Fallback to eventItem if no eventId
            
            return (
                <div key={eventItem._id || index} className="p-2">
                    <EventCard
                        _id={eventData._id}
                        name={eventData.name || 'Event Name'}
                        seatsLeft={eventData.seats ? eventData.seats - eventData.registered : 0}
                        price={eventData.fee || 0}
                        venue={eventData.venue || 'Venue not specified'}
                        date={eventData.date || 'Date not specified'}
                        description={eventData.description}
                        time={eventData.time}
                    />
                    <div className="mt-2 text-xs text-gray-500">
                        Registered on: {new Date(eventItem.createdAt).toLocaleDateString()}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {user?.role === 'coordinator' ? 'My Coordinated Events' : 'My Registered Events'}
                </h1>
                
                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((eventItem, index) => renderEventCard(eventItem, index))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400 text-lg">
                            {user?.role === 'coordinator' 
                                ? "You haven't coordinated any events yet."
                                : "You haven't registered for any events yet."
                            }
                        </div>
                        {user?.role === 'student' && (
                            <button 
                                onClick={() => window.location.href = '/'}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Browse Events
                            </button>
                        )}
                    </div>
                )}

                {/* Debug Info - Remove in production */}
                <details className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <summary className="cursor-pointer font-semibold">Debug Events Data</summary>
                    <pre className="mt-2 text-xs overflow-auto">
                        {JSON.stringify(events, null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}

export default MyEvents;