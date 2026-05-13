const API_BASE_URL = 'http://localhost:8000/api';

const API = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (Store.state.token) {
            config.headers['Authorization'] = `Bearer ${Store.state.token}`;
        }

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Terjadi kesalahan');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth
    login(email, password) {
        return this.request('/login', {
            method: 'POST',
            body: { email, password },
        });
    },

    register(name, email, phone, password, passwordConfirmation) {
        return this.request('/register', {
            method: 'POST',
            body: { name, email, phone, password, password_confirmation: passwordConfirmation },
        });
    },

    logout() {
        return this.request('/logout', { method: 'POST' });
    },

    me() {
        return this.request('/me');
    },

    // Canteens
    getCanteens() {
        return this.request('/canteens');
    },

    getCanteen(slug) {
        return this.request(`/canteens/${slug}`);
    },

    // Categories
    getCategories() {
        return this.request('/categories');
    },

    // Menus
    getMenus(canteenSlug, params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/canteens/${canteenSlug}/menus?${query}`);
    },

    getMenu(canteenSlug, menuSlug) {
        return this.request(`/canteens/${canteenSlug}/menus/${menuSlug}`);
    },

    // Cart (Server-side - optional, using local storage for demo)
    syncCart() {
        // Implement if using server-side cart
    },

    // Orders
    createOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: orderData,
        });
    },

    getOrder(orderCode) {
        return this.request(`/orders/${orderCode}`);
    },

    getOrders() {
        return this.request('/orders');
    },

    // Payments
    createPayment(paymentData) {
        return this.request('/payments', {
            method: 'POST',
            body: paymentData,
        });
    },

    verifyPayment(orderCode) {
        return this.request('/payments/verify', {
            method: 'POST',
            body: { order_code: orderCode },
        });
    },

    simulatePayment(orderCode) {
        return this.request('/payments/simulate', {
            method: 'POST',
            body: { order_code: orderCode },
        });
    }
};