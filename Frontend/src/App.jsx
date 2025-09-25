import { useDebugValue, useEffect, useState } from "react";
import { Loading } from "./pages/allPages.js";
import { Outlet, useLocation } from "react-router"; // Import useLocation
import { initializeAuth } from "./redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import Navbar from "./components/header/Navbar.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation(); // Get current location

    // Define routes where Navbar should NOT appear
    const hideNavbarRoutes = ['/login', '/signup'];

    // Check if current path should hide navbar
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    useEffect(() => {
        // Initialize auth state from localStorage on app start
        dispatch(initializeAuth());
    }, [dispatch]);

    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div>
            <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden transition-all duration-200 ease-in-out bg-[#FFFFFF] dark:bg-[#0D1117] text-[#404040] dark:text-[#F2F3F4]">
                {/* Conditionally render Navbar */}
                {!shouldHideNavbar && <Navbar />}
                <Outlet />
            </main>
        </div>
    );
}

export default App;