const Router = {
    routes: {
        'pilih-gerai': {
            title: 'Pilih Gerai',
            render: () => PilihGeraiPage.render(),
            init: () => PilihGeraiPage.init(),
        },
        'daftar-menu': {
            title: 'Daftar Menu',
            render: () => DaftarMenuPage.render(),
            init: () => DaftarMenuPage.init(),
        },
        'detail-menu': {
            title: 'Detail Menu',
            render: () => DetailMenuPage.render(),
            init: () => DetailMenuPage.init(),
        },
        'keranjang': {
            title: 'Keranjang',
            render: () => KeranjangPage.render(),
            init: () => KeranjangPage.init(),
        },
        'pembayaran': {
            title: 'Pilih Pembayaran',
            render: () => PembayaranPage.render(),
            init: () => PembayaranPage.init(),
        },
        'qris': {
            title: 'Bayar (QRIS)',
            render: () => QrisPage.render(),
            init: () => QrisPage.init(),
            destroy: () => QrisPage.destroy(),
        },
        'sukses': {
            title: 'Pembayaran Berhasil',
            render: () => SuksesPage.render(),
            init: () => SuksesPage.init(),
        },
        'pesanan-diterima': {
            title: 'Pesanan Diterima',
            render: () => PesananDiterimaPage.render(),
            init: () => PesananDiterimaPage.init(),
        },
        'struk': {
            title: 'Struk Belanja',
            render: () => StrukPage.render(),
            init: () => StrukPage.init(),
        },
    },

    currentPage: null,

    navigate(page, params = {}) {
        // Destroy previous page if it has a destroy method
        if (this.currentPage && this.routes[this.currentPage] && this.routes[this.currentPage].destroy) {
            this.routes[this.currentPage].destroy();
        }
        this.currentPage = page;
        window.history.pushState({ page, params }, '', `#${page}`);
        this.render(page, params);
    },

    render(page, params = {}) {
        const app = document.getElementById('app');
        const route = this.routes[page] || this.routes['pilih-gerai'];

        app.innerHTML = route.render();
        app.className = 'fade-in';

        if (route.init) {
            setTimeout(() => route.init(params), 50);
        }
    },

    back() {
        window.history.back();
    },

    init() {
        window.addEventListener('popstate', (e) => {
            const page = (e.state && e.state.page) ? e.state.page : 'pilih-gerai';
            // Destroy current page if needed
            if (this.currentPage && this.routes[this.currentPage] && this.routes[this.currentPage].destroy) {
                this.routes[this.currentPage].destroy();
            }
            this.currentPage = page;
            this.render(page, (e.state && e.state.params) || {});
        });

        const hash = window.location.hash.slice(1) || 'pilih-gerai';
        this.currentPage = hash;
        window.history.replaceState({ page: hash }, '', `#${hash}`);
        this.render(hash);
    }
};