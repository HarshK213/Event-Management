import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/auth`,
            withCredentials: true,
        });
    }

    // Student Registration
    async registerStudent(email, password) {
        try {
            const response = await this.api.post('/register', {
                email,
                pass: password
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Student Login
    async studentLogin(email, password) {
        try {
            const response = await this.api.post('/student/login', {
                email,
                pass: password
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Coordinator Login
    async coordinatorLogin(email, password) {
        try {
            const response = await this.api.post('/coordinator/login', {
                email,
                pass: password
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Admin Login
    async adminLogin(email, password) {
        try {
            const response = await this.api.post('/admin/login', {
                email,
                pass: password
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Logout
    async logout() {
        try {
            const response = await this.api.post('/logout');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get Current User
    async getCurrentUser() {
        try {
            const response = await this.api.get('/get-curr-user');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Verify Token
    async verifyToken() {
        try {
            const response = await this.api.get('/verify');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handler
    handleError(error) {
        if (error.response) {
            // Server responded with error status
            throw new Error(error.response.data.message || 'Authentication failed');
        } else if (error.request) {
            // Request made but no response received
            throw new Error('Network error. Please check your connection.');
        } else {
            // Something else happened
            throw new Error('An unexpected error occurred.');
        }
    }
}

// Create and export singleton instance
export const authService = new AuthService();



