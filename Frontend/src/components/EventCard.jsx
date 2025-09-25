import React from "react";
import { Link } from "react-router-dom";

function EventCard({ _id, name, seatsLeft, price, venue , date}) {
    
    return (
        <Link to={`/event-register/${_id}`}>
            <div className="w-72 h-48 p-4 rounded-2xl shadow-md border bg-white flex flex-col justify-between">
                {/* Event Name */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {name}
                </h2>

                {/* Venue */}
                <p className="text-sm text-gray-500">{venue}</p>

                {/* Seats Left */}
                <p className="text-sm font-medium text-gray-700">
                    Seats Left:{" "}
                    <span className="text-gray-900">
                        {seatsLeft > 0 ? seatsLeft : "Full"}
                    </span>
                </p>

                <div className="w-full flex justify-between items-center">
                    {/* Date */}
                    <span className="text-sm text-gray-600">
                        {date}
                    </span>
                    {/* Price */}
                    <span
                        className={`text-sm font-semibold w-20  text-center rounded-lg border-b-4 border-r-4 border-black px-2 py-2 bg-blue-500`}
                    >
                        {price == 0 ? "FREE" : `₹ ${price}`}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default EventCard;
