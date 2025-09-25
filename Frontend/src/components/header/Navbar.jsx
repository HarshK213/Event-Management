import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { authService } from "../../API/auth.js";
import ThemeToggle from "./ThemeBtm.jsx";

function Navbar() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await authService.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data.user);
                console.log(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const LogoutHandle = async () => {
        console.log("Starting logging out");
        try {
            // Clear local storage first
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            // Make API call to logout - this will clear the httpOnly cookie
            await authService.logout();

            console.log("Logout successful");
            setUser(null);
            navigate("/");

            // Force a hard redirect to ensure cookie is cleared
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
            // Even if API fails, clear client-side state
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);

            // Force redirect to ensure clean state
            window.location.href = "/";
        }
    };

    // Function to render middle nav options based on role
    const renderMiddleOptions = () => {
        if (!user) return null;

        const linkStyle =
            "px-3 py-1 rounded-md transition-colors duration-200 text-sm font-medium";
        const activeStyle =
            "bg-white text-black dark:bg-black dark:text-white font-semibold";
        const inactiveStyle =
            "hover:underline text-black dark:text-white hover:bg-white/10 dark:hover:bg-black/10";

        switch (user.role) {
            case "student":
                return (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkStyle} ${
                                    isActive ? activeStyle : inactiveStyle
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/myevents"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            My Events
                        </NavLink>
                        {/* <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            Events
                        </NavLink> */}
                        {/* <NavLink
                            to="/my-registrations"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            My Registrations
                        </NavLink> */}
                    </>
                );
            case "coordinator":
                return (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkStyle} ${
                                    isActive ? activeStyle : inactiveStyle
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/myevents"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            My Events
                        </NavLink>
                        {/* <NavLink
                            to="/coordinatorDashboard"
                            className={({ isActive }) =>
                                `${linkStyle} ${
                                    isActive ? activeStyle : inactiveStyle
                                }`
                            }
                        >
                            Dashboard
                        </NavLink> */}
                    </>
                );
            case "admin":
                return (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkStyle} ${
                                    isActive ? activeStyle : inactiveStyle
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/create-event"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            Create Event
                        </NavLink>
                        {/* <NavLink
                            to="/adminDashboard"
                            className={({ isActive }) =>
                                `${linkStyle} ${
                                    isActive ? activeStyle : inactiveStyle
                                }`
                            }
                        >
                            Dashboard
                        </NavLink> */}
                        {/* <NavLink
                            to="/manage-users"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            Manage Users
                        </NavLink> */}
                        {/* <NavLink
                            to="/all-events"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            All Events
                        </NavLink> */}
                        {/* <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            Reports
                        </NavLink> */}
                    </>
                );
            default:
                return null;
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="flex bg-black/40 dark:bg-white/40 h-[60px] w-screen items-center px-4 justify-between ease-in-out duration-500">
                <p className="font-extrabold text-black dark:text-white text-xl">
                    VIT EVENT MANAGEMENT
                </p>
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black dark:border-white"></div>
                    <ThemeToggle />
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-black/40 dark:bg-white/40 h-[60px] w-screen items-center px-4 justify-between ease-in-out duration-500 sticky top-0 z-50 backdrop-blur-sm">
            {/* LEFT SIDE LOGO */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
                <p className="font-extrabold text-black dark:text-white text-xl hover:opacity-80 transition-opacity">
                    VIT EVENT MANAGEMENT
                </p>
            </div>

            {/* CENTER SIDE OPTIONS */}
            <div className={`${user ? "flex" : "hidden"} items-center gap-2`}>
                {renderMiddleOptions()}
            </div>

            {/* RIGHT SIDE OPTIONS */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* User Info */}
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-medium text-black dark:text-white">
                                {user.email}
                            </span>
                            <span className="text-xs text-black/70 dark:text-white/70 capitalize">
                                {user.role}
                            </span>
                        </div>

                        {/* Profile Icon for mobile */}
                        <div className="md:hidden w-8 h-8 bg-black/20 dark:bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-black dark:text-white">
                                {user.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        <button
                            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            onClick={LogoutHandle}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            className="px-4 py-1 text-sm font-medium text-black dark:text-white border border-black/20 dark:border-white/20 rounded-full transition-all duration-200 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                        <button
                            className="px-4 py-1 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-full transition-all duration-200 hover:opacity-80"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
}

export default Navbar;
