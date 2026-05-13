const Utils = {
    formatRupiah(number) {
        return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    generateOrderCode() {
        return 'KKC' + new Date().toISOString().slice(0,10).replace(/-/g,'') + Math.random().toString(36).substr(2, 6).toUpperCase();
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showToast(message, duration = 3000) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    },

    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getFromStorage(key, defaultValue = null) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    },

    removeFromStorage(key) {
        localStorage.removeItem(key);
    }
};