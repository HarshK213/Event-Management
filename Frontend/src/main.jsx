import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import {
    Home,
    Login,
    Signup,
    AdminDashboard,
    MyEvents,
    CreateEvent,
    EventDetails,
    StudentDashboard,
} from "./pages/allPages.js";
import { store } from "./redux/store.js";
import { ProtectedRoute } from "./components/allComponents.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/adminDashboard",
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/myevents",
                element: (
                    <ProtectedRoute allowedRoles={['coordinator', 'student']}>
                        <MyEvents />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/studentDashboard",
                element: (
                    <ProtectedRoute allowedRoles={['student']}>
                        <StudentDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/create-event",
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <CreateEvent />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/event-register/:id",
                element: <EventDetails />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
