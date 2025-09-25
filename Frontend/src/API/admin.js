import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class AdminService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/admin`,
            withCredentials: true,
        });

        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Create event with banner image
    async createEvent(eventData) {
        try {
            const response = await this.api.post("/create-event", eventData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get all events
    async getAllEvents() {
        try {
            const response = await this.api.get("/events");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Export event registrations to Excel
    async exportEventRegistrations(eventId) {
        try {
            const response = await this.api.get(`/export-excel/${eventId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update event banner
    async updateEventBanner(eventId, bannerImage) {
        try {
            const formData = new FormData();
            formData.append("bannerImage", bannerImage);

            const response = await this.api.patch(
                `/events/${eventId}/banner`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get system statistics
    async getSystemStatistics() {
        try {
            const response = await this.api.get("/statistics");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Manage users
    async getAllUsers() {
        try {
            const response = await this.api.get("/users");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handler
    handleError(error) {
        if (error.response) {
            throw new Error(
                error.response.data.message || "Admin service error"
            );
        } else if (error.request) {
            throw new Error("Network error. Please check your connection.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export const adminService = new AdminService();
