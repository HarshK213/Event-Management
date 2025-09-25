import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export class StudentService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/student`,
            withCredentials: true,
        });

        // Add token to requests
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Get all upcoming events
    async getUpcomingEvents() {
        try {
            const response = await this.api.get('/events');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get event details by ID
    async getEventDetails(eventId) {
        try {
            const response = await this.api.get(`/events/${eventId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Register for an event
    async registerForEvent(eventId, email, transactionId = '') {
        try {
            const response = await this.api.post(`/register/${eventId}`, {
                email,
                transactionId
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user's registered events
    async getMyEvents() {
        try {
            const response = await this.api.get('/events/get-my-events');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get event registration status
    // async getRegistrationStatus(eventId) {
    //     try {
    //         const response = await this.api.get(`/registration-status/${eventId}`);
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // Error handler
    handleError(error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Student service error');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}

export const studentService = new StudentService();