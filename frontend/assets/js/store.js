const Store = {
    state: {
        user: Utils.getFromStorage('user'),
        token: Utils.getFromStorage('token'),
        cart: Utils.getFromStorage('cart', []),
        currentCanteen: Utils.getFromStorage('currentCanteen'),
        currentOrder: Utils.getFromStorage('currentOrder'),
    },

    setUser(user) {
        this.state.user = user;
        Utils.saveToStorage('user', user);
    },

    setToken(token) {
        this.state.token = token;
        Utils.saveToStorage('token', token);
    },

    logout() {
        this.state.user = null;
        this.state.token = null;
        Utils.removeFromStorage('user');
        Utils.removeFromStorage('token');
        this.clearCart();
    },

    addToCart(item) {
        const existing = this.state.cart.find(i => i.menu_id === item.menu_id);
        if (existing) {
            existing.quantity += item.quantity;
            existing.notes = item.notes || existing.notes;
        } else {
            this.state.cart.push(item);
        }
        this.saveCart();
    },

    updateCartItem(menuId, quantity, notes) {
        const item = this.state.cart.find(i => i.menu_id === menuId);
        if (item) {
            item.quantity = quantity;
            if (notes !== undefined) item.notes = notes;
            this.saveCart();
        }
    },

    removeFromCart(menuId) {
        this.state.cart = this.state.cart.filter(i => i.menu_id !== menuId);
        this.saveCart();
    },

    clearCart() {
        this.state.cart = [];
        Utils.removeFromStorage('cart');
    },

    saveCart() {
        Utils.saveToStorage('cart', this.state.cart);
    },

    setCurrentCanteen(canteen) {
        this.state.currentCanteen = canteen;
        Utils.saveToStorage('currentCanteen', canteen);
    },

    setCurrentOrder(order) {
        this.state.currentOrder = order;
        Utils.saveToStorage('currentOrder', order);
    },

    getCartTotal() {
        return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getCartTax() {
        return Math.round(this.getCartTotal() * 0.1);
    },

    getCartGrandTotal() {
        return this.getCartTotal() + this.getCartTax();
    },

    getCartCount() {
        return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
};