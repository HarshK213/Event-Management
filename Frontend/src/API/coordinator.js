import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class CoordinatorService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/coordinator`,
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

    // Change event status
    async changeEventStatus(eventId, status) {
        try {
            console.log("=== PATCH Request Details ===");
            console.log("Event ID:", eventId);
            console.log("New Status:", status);
            console.log("Base URL:", this.api.defaults.baseURL);
            console.log("Full Endpoint:", `/event/status/${eventId}`);
            console.log(
                "Complete URL:",
                `${this.api.defaults.baseURL}/event/status/${eventId}`
            );

            // Log the headers being sent
            const token = localStorage.getItem("accessToken");
            console.log("Auth Token Present:", !!token);

            const response = await this.api.patch(`/event/status/${eventId}`, {
                status,
            });

            console.log("Response Status:", response.status);
            return response.data;
        } catch (error) {
            console.error("=== Error Details ===");
            console.error("Error Response:", error.response);
            console.error("Error Message:", error.message);
            console.error("Error Config:", error.config?.url);
            throw this.handleError(error);
        }
    }
    // Get event registrations
    async getEventRegistrations(eventId) {
        try {
            const response = await this.api.get(
                `/events/${eventId}/registrations`
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get coordinator's events
    async getMyCoordinatedEvents() {
        try {
            const response = await this.api.get("/my-events");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Export registrations to Excel
    async exportRegistrationsToExcel(eventId) {
        try {
            const response = await this.api.get(`/events/${eventId}/export`, {
                responseType: "blob", // Important for file downloads
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get event statistics
    async getEventStatistics(eventId) {
        try {
            const response = await this.api.get(
                `/events/${eventId}/statistics`
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handler
    handleError(error) {
        if (error.response) {
            throw new Error(
                error.response.data.message || "Coordinator service error"
            );
        } else if (error.request) {
            throw new Error("Network error. Please check your connection.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

export const coordinatorService = new CoordinatorService();
