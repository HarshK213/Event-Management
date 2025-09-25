import {
    TextField,
    IconButton,
    InputAdornment,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {authService} from '../API/auth.js'
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice.js";

const Login = () => {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            
            switch (role) {
                case "Student":
                    response = await authService.studentLogin(email, password);
                    break;
                case "Coordinator":
                    response = await authService.coordinatorLogin(email, password);
                    break;
                case "Admin":
                    response = await authService.adminLogin(email, password);
                    break;
                default:
                    throw new Error("Please select a role");
            }

            // Save token to localStorage
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            if (response.success) {
                // Dispatch to Redux store immediately
                dispatch(loginSuccess({
                    user: response.data.user,
                    token: response.data.user.accessToken
                }))};

            navigate('/');

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Container
        <div className="flex-1 h-[100%] flex w-[100%]">
            {/* Left Part */}
            <div
                className="hidden md:flex md:flex-[1.55] md:flex-col md:items-center md:justify-center md:bg-cover md:bg-center"
                style={{ backgroundImage: "url('/images/about_the_eif.jpg')" }}
            >
                <div className="bg-white/40 p-[50px] rounded-xl backdrop-blur-xs">
                    {/* Text */}
                    <h1 className="text-black text-3xl font-bold text-center">
                        Event Management App
                    </h1>
                </div>
            </div>

            {/* Right Part */}
            <div className="flex-1 bg-white py-10 flex flex-col items-center justify-center gap-6">
                {/* Theme BTN */}

                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Role Selector */}
                <FormControl required className="w-[350px]">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        label="Role"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Coordinator">Coordinator</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                </FormControl>

                {/* Email Input */}
                <TextField
                    className="w-[350px]"
                    label="Email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <TextField
                    className="w-[350px]"
                    label="Password"
                    variant="outlined"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-[350px] bg-black text-white font-bold py-2 rounded-md hover:bg-[#d84341] transition-colors mb-4"
                >
                    Login
                </button>

                {/* Small Text with Link */}
                <p className="text-sm text-center text-gray-600">
                    Not have an account?{" "}
                    <span
                        onClick={() => navigate("/Signup")}
                        className="text-black font-medium cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
