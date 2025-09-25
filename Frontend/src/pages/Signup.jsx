import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../API/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            await authService.registerStudent(email, password);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        // Container
        <div className="flex-1 h-[100%] flex w-[100%]">
            {/* Left Part */}
            <div className="flex-1 bg-white py-10 flex flex-col items-center justify-center gap-6">
                {/* Theme BTN */}

                <h2 className="text-2xl font-bold text-center mb-6">
                    Studnet Sign Up
                </h2>

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

                {/* Cofirm Password */}
                <TextField
                    className="w-[350px]"
                    label="Cofirm Password"
                    variant="outlined"
                    required
                    type={showPassword ? "text" : "password"}
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* Login Button */}
                <button
                    onClick={handleSignUp}
                    className="w-[350px] bg-black text-white font-bold py-2 rounded-md hover:bg-[#d84341] transition-colors mb-4"
                >
                    SignUp
                </button>

                {/* Small Text with Link */}
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-black font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>

            {/* Right Part */}
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
        </div>
    );
};

export default Login;
