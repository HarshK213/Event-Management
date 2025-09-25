// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { studentService } from "../API/student";
// import { authService } from "../API/auth"; // Import auth service
// import { RegisterInEvent } from "../components/allComponents";

// function EventDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [events, setEvents] = useState(null);
//     const [register, setRegister] = useState(false);
//     const [user, setUser] = useState(null); // Add user state
//     const [loading, setLoading] = useState(true); // Add loading state

//     // Check authentication status
//     const checkAuthStatus = async () => {
//         try {
//             const response = await authService.getCurrentUser();
//             if (response.success && response.data) {
//                 setUser(response.data.user);
//             }
//         } catch (error) {
//             console.error("Auth check failed:", error);
//             setUser(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getAllEvents = async () => {
//         try {
//             const res = await studentService.getUpcomingEvents();
//             if (res.success && res.data) {
//                 setEvents(res.data);
//             }
//         } catch (error) {
//             console.error("Event fetch failed : ", error);
//         }
//     };

//     useEffect(() => {
//         checkAuthStatus();
//         getAllEvents();
//     }, []);

//     const handleRegisterClick = () => {
//         // If user is not logged in, navigate to login page
//         if (!user) {
//             navigate("/login");
//             return;
//         }

//         // If user is admin, don't show register form
//         if (user.role === "admin") {
//             alert("Admins cannot register for events.");
//             return;
//         }

//         // If user is student or coordinator, show register form
//         if (user.role === "student" || user.role === "coordinator") {
//             setRegister(true);
//         }
//     };

//     const event = events ? events.find((e) => e._id === id) : null;

//     if (!event) {
//         return (
//             <div>
//                 <div className="p-8 text-center text-xl font-semibold">
//                     Event not found.
//                 </div>
//             </div>
//         );
//     }

//     // Show loading state while checking authentication
//     if (loading) {
//         return (
//             <div>
//                 <div className="p-8 text-center text-xl font-semibold">
//                     Loading...
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="relative">
//             {/* Register Overlay - Conditionally rendered */}
//             {register && (
//                 <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
//                     <RegisterInEvent 
//                         onClose={() => setRegister(false)} 
//                         event={event}
//                     />
//                 </div>
//             )}
            
//             {/* Main Content */}
//             <div className={register ? "blur-sm" : ""}>

//                 <div className="px-8 py-6 space-y-8 ">
//                     {/* Top Section */}
//                     <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4 h-[60px]">
//                         <h1 className="text-3xl font-bold">{event.name}</h1>
//                         <div className="flex items-center space-x-4">
//                             <p className="text-xl font-semibold">
//                                 Fee: ₹{event.fee}
//                             </p>
                            
//                             {/* Show Register button only if user is student or coordinator */}
//                             {(user?.role === "student" || user?.role === "coordinator") && (
//                                 <button
//                                     className="text-sm font-semibold w-20 text-center rounded-lg 
//                    border-b-4 border-r-4 border-black 
//                    px-2 py-2 bg-blue-500 
//                    transition-all duration-200 
//                    active:border-b-0 active:border-r-0 
//                    active:translate-x-1 active:translate-y-1"
//                                     onClick={handleRegisterClick}
//                                 >
//                                     Register
//                                 </button>
//                             )}
                            
//                             {/* Show message for admin */}
//                             {user?.role === "admin" && (
//                                 <span className="text-sm text-gray-500 italic">
//                                     Admins cannot register for events
//                                 </span>
//                             )}
                            
//                             {/* Show login prompt for non-logged in users */}
//                             {!user && (
//                                 <button
//                                     className="text-sm font-semibold w-20 text-center rounded-lg 
//                    border-b-4 border-r-4 border-black 
//                    px-2 py-2 bg-blue-500 
//                    transition-all duration-200 
//                    active:border-b-0 active:border-r-0 
//                    active:translate-x-1 active:translate-y-1"
//                                     onClick={handleRegisterClick}
//                                 >
//                                     Register
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Details Section */}
//                     <div className="flex justify-between">
//                         <div className="space-y-3 text-lg">
//                             <p>
//                                 <span className="font-semibold">
//                                     Description:
//                                 </span>{" "}
//                                 {event.description}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">Date:</span>{" "}
//                                 {event.date}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">Time:</span>{" "}
//                                 {event.time}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">Venue:</span>{" "}
//                                 {event.venue}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">
//                                     Seats Available:
//                                 </span>{" "}
//                                 {event.seats - event.registered}
//                             </p>
//                             <p>
//                                 <span className="font-semibold">
//                                     Coordinator Email:
//                                 </span>{" "}
//                                 {event.coordinatorId}
//                             </p>
//                         </div>

//                         {/* Bank Details (Only if fee > 0) */}
//                         {event.fee > 0 && (
//                             <div className="border-2 border-black p-4 h-fit rounded-xl">
//                                 <h2 className="text-2xl font-bold mb-3">
//                                     Bank Details
//                                 </h2>
//                                 <p>
//                                     <span className="font-semibold">
//                                         Bank Name:
//                                     </span>{" "}
//                                     {event.bankName}
//                                 </p>
//                                 <p>
//                                     <span className="font-semibold">
//                                         IFSC Code:
//                                     </span>{" "}
//                                     {event.IFSCcode}
//                                 </p>
//                                 <p>
//                                     <span className="font-semibold">
//                                         Account Number:
//                                     </span>{" "}
//                                     {event.bankAccNum}
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EventDetails;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentService } from "../API/student.js";
import { authService } from "../API/auth.js";
import { coordinatorService } from "../API/coordinator.js"; // Import coordinator service
import { RegisterInEvent } from "../components/allComponents.js";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"; // Import Material-UI components

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState(null);
    const [register, setRegister] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [eventStatus, setEventStatus] = useState("");
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [updating, setUpdating] = useState(false);

    // Check authentication status
    const checkAuthStatus = async () => {
        try {
            const response = await authService.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const getAllEvents = async () => {
        try {
            const res = await studentService.getUpcomingEvents();
            if (res.success && res.data) {
                setEvents(res.data);
                // Set initial event status when events are loaded
                const currentEvent = res.data.find((e) => e._id === id);
                if (currentEvent) {
                    setEventStatus(currentEvent.status || "open");
                }
            }
        } catch (error) {
            console.error("Event fetch failed : ", error);
        }
    };

    useEffect(() => {
        checkAuthStatus();
        getAllEvents();
    }, [id]);

    const handleRegisterClick = () => {
        // If user is not logged in, navigate to login page
        if (!user) {
            navigate("/login");
            return;
        }

        // If user is student, show register form
        if (user.role === "student") {
            setRegister(true);
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setEventStatus(newStatus);
        
        // Show update button if status is different from current event status
        const currentEvent = events.find((e) => e._id === id);
        setShowUpdateButton(currentEvent && currentEvent.status !== newStatus);
    };

    const handleStatusUpdate = async () => {
        if (!eventStatus) return;
        
        try {
            setUpdating(true);
            const response = await coordinatorService.changeEventStatus(id, eventStatus);
            
            if (response.success) {
                // Update the event status in local state
                setEvents(prevEvents => 
                    prevEvents.map(event => 
                        event._id === id 
                            ? { ...event, status: eventStatus }
                            : event
                    )
                );
                setShowUpdateButton(false);
                alert("Event status updated successfully!");
            } else {
                alert("Failed to update event status");
            }
        } catch (error) {
            console.error("Error updating event status:", error);
            alert("Error updating event status");
        } finally {
            setUpdating(false);
        }
    };

    const event = events ? events.find((e) => e._id === id) : null;

    if (!event) {
        return (
            <div>
                <div className="p-8 text-center text-xl font-semibold">
                    Event not found.
                </div>
            </div>
        );
    }

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div>
                <div className="p-8 text-center text-xl font-semibold">
                    Loading...
                </div>
            </div>
        );
    }

    // Check if current user is the coordinator of this event
    const isEventCoordinator = user && user.role === "coordinator" && event.coordinatorId === user._id;

    return (
        <div className="relative">
            {/* Register Overlay - Conditionally rendered */}
            {register && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <RegisterInEvent 
                        onClose={() => setRegister(false)} 
                        event={event}
                    />
                </div>
            )}
            
            {/* Main Content */}
            <div className={register ? "blur-sm" : ""}>

                <div className="px-8 py-6 space-y-8 ">
                    {/* Top Section */}
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4 h-[60px]">
                        <h1 className="text-3xl font-bold">{event.name}</h1>
                        <div className="flex items-center space-x-4">
                            <p className="text-xl font-semibold">
                                Fee: ₹{event.fee}
                            </p>
                            
                            {/* Show Register button only if user is student */}
                            {user?.role === "student" && (
                                <button
                                    className="text-sm font-semibold w-20 text-center rounded-lg 
                   border-b-4 border-r-4 border-black 
                   px-2 py-2 bg-blue-500 
                   transition-all duration-200 
                   active:border-b-0 active:border-r-0 
                   active:translate-x-1 active:translate-y-1"
                                    onClick={handleRegisterClick}
                                >
                                    Register
                                </button>
                            )}
                            
                            {/* Show message for admin and coordinator */}
                            {(user?.role === "admin" || user?.role === "coordinator") && (
                                <span className="text-sm text-gray-500 italic">
                                    {user.role === "admin" 
                                        ? "Admins cannot register for events" 
                                        : "Coordinators cannot register for events"}
                                </span>
                            )}
                            
                            {/* Show login prompt for non-logged in users */}
                            {!user && (
                                <button
                                    className="text-sm font-semibold w-20 text-center rounded-lg 
                   border-b-4 border-r-4 border-black 
                   px-2 py-2 bg-blue-500 
                   transition-all duration-200 
                   active:border-b-0 active:border-r-0 
                   active:translate-x-1 active:translate-y-1"
                                    onClick={handleRegisterClick}
                                >
                                    Register
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex justify-between">
                        <div className="space-y-3 text-lg">
                            <p>
                                <span className="font-semibold">
                                    Description:
                                </span>{" "}
                                {event.description}
                            </p>
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {event.date}
                            </p>
                            <p>
                                <span className="font-semibold">Time:</span>{" "}
                                {event.time}
                            </p>
                            <p>
                                <span className="font-semibold">Venue:</span>{" "}
                                {event.venue}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Seats Available:
                                </span>{" "}
                                {event.seats - event.registered}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Coordinator Email:
                                </span>{" "}
                                {event.coordinatorId}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Status:
                                </span>{" "}
                                <span className={`font-semibold ${
                                    event.status === 'open' ? 'text-green-600' :
                                    event.status === 'paused' ? 'text-yellow-600' :
                                    'text-red-600'
                                }`}>
                                    {event.status?.toUpperCase() || 'OPEN'}
                                </span>
                            </p>

                            {/* Status Selector for Event Coordinator */}
                            {isEventCoordinator && (
                                <div className="flex items-center space-x-4 mt-4">
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            value={eventStatus}
                                            onChange={handleStatusChange}
                                        >
                                            <MenuItem value="open">Open</MenuItem>
                                            <MenuItem value="paused">Paused</MenuItem>
                                            <MenuItem value="closed">Closed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                    {showUpdateButton && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleStatusUpdate}
                                            disabled={updating}
                                            size="small"
                                        >
                                            {updating ? "Updating..." : "Update"}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bank Details (Only if fee > 0) */}
                        {event.fee > 0 && (
                            <div className="border-2 border-black p-4 h-fit rounded-xl">
                                <h2 className="text-2xl font-bold mb-3">
                                    Bank Details
                                </h2>
                                <p>
                                    <span className="font-semibold">
                                        Bank Name:
                                    </span>{" "}
                                    {event.bankName}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        IFSC Code:
                                    </span>{" "}
                                    {event.IFSCcode}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Account Number:
                                    </span>{" "}
                                    {event.bankAccNum}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;