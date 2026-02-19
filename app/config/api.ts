// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      CHECK_USERNAME: '/api/auth/check-username',
      CHECK_EMAIL: '/api/auth/check-email',
      DELETE: '/api/auth/delete',
      GET_USER: '/api/auth/me',
    },
    // Users
    USERS: {
      GET_ALL: '/api/users',
      UPDATE_PROFILE_PIC: '/api/users/:id/profilePic',
    },
    // Service Categories
    SERVICE_CATEGORIES: {
      GET_ALL: '/api/service-categories',
      CREATE: '/api/service-categories',
      GET_BY_ID: '/api/service-categories/:id',
      UPDATE: '/api/service-categories/:id',
      DELETE: '/api/service-categories/:id',
    },
    // Services
    SERVICES: {
      GET_ALL: '/api/services',
      GET_BY_ID: '/api/services/:id',
      CREATE: '/api/services',
      UPDATE: '/api/services/:id',
      DELETE: '/api/services/:id',
    },
    // Orders
    ORDERS: {
      GET_ALL: '/api/orders',
      CREATE: '/api/orders',
      UPDATE_STATUS: '/api/orders/:id/status',
    },
    // Projects
    PROJECTS: {
      GET_ALL: '/api/projects',
      GET_BY_ID: '/api/projects/:id',
      CREATE: '/api/projects',
      UPDATE: '/api/projects/:id',
      DELETE: '/api/projects/:id',
    },
    // Health
    HEALTH: '/health',
  }
};

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
};
