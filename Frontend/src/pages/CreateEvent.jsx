import React, { useState } from "react";
import {
    ArrowBack,
    CurrencyRupeeOutlined,
    CurrencyRupeeRounded,
} from "@mui/icons-material";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    InputAdornment,
} from "@mui/material";
import {adminService} from '../API/admin.js'
import { useNavigate } from "react-router";

function CreateEvent() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        fee: 0,
        seats: 0,
        coordinatorEmail: "",
        bankName: "",
        IFSCcode: "",
        bankAccNum: "",
        status: "open",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateCoordinatorEmail = (email) => {
        // must be name.registrationNo@vitbhopal.ac.in
        const vitEmailRegex =
            /^[a-z]+\.([0-9]{2}[a-z]{3}[0-9])@vitbhopal\.ac\.in$/;
        return vitEmailRegex.test(email);
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Send formData directly, not nested in eventData
        await adminService.createEvent(formData);
        alert("Event created successfully!");
        // Reset form
        setFormData({
            name: "",
            description: "",
            date: "",
            time: "",
            venue: "",
            fee: 0,
            seats: 0,
            coordinatorEmail: "",
            bankName: "",
            IFSCcode: "",
            bankAccNum: "",
            status: "open",
        });
        navigate('/');
    } catch (error) {
        alert(error.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-1/2 pt-10">
                {/* On Top button + Create Event Text */}
                <div className="flex items-end gap-5 w-full">
                    <button className="bg-black p-1 rounded-lg">
                        <ArrowBack className="text-white" />
                    </button>
                    <div className="relative text-5xl inline-block w-full">
                        Create Event
                        <span className="absolute left-3 bottom-0 w-full h-[3px] bg-black rounded-full"></span>
                    </div>
                </div>

                {/* Form */}
                <div className="flex justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 md:w-[600px] w-[400px] p-6"
                    >
                        <TextField
                            label="Event Name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            required
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <TextField
                            type="date"
                            name="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={formData.date}
                            onChange={handleChange}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    color: (theme) =>
                                        theme.palette.mode === "dark"
                                            ? "white"
                                            : "black",
                                },
                            }}
                        />

                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={
                                formData.date
                                    ? dayjs(formData.date, "DD/MM/YYYY")
                                    : null
                            }
                            onChange={(newValue) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    date: newValue
                                        ? newValue.format("DD/MM/YYYY")
                                        : "",
                                }));
                            }}
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { required: true } }}
                        />
                    </LocalizationProvider> */}

                        <TextField
                            type="time"
                            name="time"
                            label="Time"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={formData.time}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Venue"
                            name="venue"
                            required
                            value={formData.venue}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Fee"
                            name="fee"
                            type="number"
                            value={formData.fee}
                            sx={{
                                m: 1,
                                width: "25ch",
                                // 🔽 hide spin buttons in Chrome/Edge/Safari
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                    {
                                        WebkitAppearance: "none",
                                        margin: 0,
                                    },
                                // 🔽 hide spin buttons in Firefox
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            ₹
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Seats"
                            name="seats"
                            type="number"
                            value={formData.seats}
                            sx={{
                                m: 1,
                                width: "25ch",
                                // 🔽 hide spin buttons in Chrome/Edge/Safari
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                    {
                                        WebkitAppearance: "none",
                                        margin: 0,
                                    },
                                // 🔽 hide spin buttons in Firefox
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            inputProps={{ min: 0, max: 10000 }}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Coordinator Email (VIT Bhopal only)"
                            name="coordinatorEmail"
                            required
                            value={formData.coordinatorEmail}
                            onChange={handleChange}
                        />

                        {/* Show Bank Details only if Fee > 0 */}
                        {Number(formData.fee) > 0 && (
                            <>
                                <TextField
                                    label="Bank Name"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="IFSC Code"
                                    name="IFSCcode"
                                    value={formData.IFSCcode}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Bank Account Number"
                                    name="bankAccNum"
                                    type="number"
                                    value={formData.bankAccNum}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="paused">Paused</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Event"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
