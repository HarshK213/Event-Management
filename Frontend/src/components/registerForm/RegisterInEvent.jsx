import React, { use, useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    Alert,
    InputAdornment,
} from "@mui/material";
import { Close, Email, Receipt } from "@mui/icons-material";
import { studentService } from "../../API/student.js";

function RegisterInEvent({ onClose, event }) {
    const [formData, setFormData] = useState({
        email: "",
        utrNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validateEmail = (email) => {
        const vitEmailRegex =
            /^[a-z]+\.([0-9]{2}[a-z]{3}[0-9]{5})@vitbhopal\.ac\.in$/;
        return vitEmailRegex.test(email);
    };

    const validateUtrNumber = (utr) => {
        const utrRegex = /^\d{16}$/;
        return utrRegex.test(utr);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email =
                "Please enter a valid VIT Bhopal email (format: name.registrationnumber@vitbhopal.ac.in)";
        }

        if (!formData.utrNumber) {
            newErrors.utrNumber = "UTR number is required";
        } else if (!validateUtrNumber(formData.utrNumber)) {
            newErrors.utrNumber = "UTR number must be 16 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage("");

        try {
            // Call the studentService API
            const response = await studentService.registerForEvent(
                event._id, // eventId
                formData.email, // email
                formData.utrNumber // transactionId (UTR number)
            );

            // Handle successful registration
            setSuccessMessage("Registration successful!");

            // Optional: Close modal after delay or keep it open for user to see success message
            setTimeout(() => {
                onClose();
                // You might want to refresh the event data here to update registered count
            }, 2000);
        } catch (error) {
            console.error("Registration failed:", error);

            // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                setErrors({
                    submit:
                        error.response.data.message ||
                        "Registration failed. Please try again.",
                });
            } else if (error.request) {
                // Network error
                setErrors({
                    submit: "Network error. Please check your connection and try again.",
                });
            } else {
                // Other errors
                setErrors({
                    submit:
                        error.message ||
                        "Registration failed. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "500px",
                    padding: 4,
                    borderRadius: 2,
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>

                {/* Header */}
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    align="center"
                >
                    Register for {event.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 3 }}
                >
                    Registration Fee: ₹{event.fee}
                </Typography>

                {/* Error Alert */}
                {errors.submit && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.submit}
                    </Alert>
                )}

                {/* Registration Form */}
                <Box component="form" onSubmit={handleSubmit}>
                    {/* VIT Bhopal Email Field */}
                    <TextField
                        fullWidth
                        label="VIT Bhopal Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={
                            errors.email ||
                            "Format: name.registrationnumber@vitbhopal.ac.in"
                        }
                        margin="normal"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* UTR Number Field */}
                    <TextField
                        fullWidth
                        label="UTR Number"
                        name="utrNumber"
                        value={formData.utrNumber}
                        onChange={handleChange}
                        error={!!errors.utrNumber}
                        helperText={
                            errors.utrNumber ||
                            "16-digit UTR number from your payment"
                        }
                        margin="normal"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Receipt color="action" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="e.g., 1234567890123456"
                    />

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </Box>

                    {/* Additional Info */}
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 2, display: "block" }}
                    >
                        Please ensure you have completed the payment before
                        registration. UTR number will be verified.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default RegisterInEvent;
