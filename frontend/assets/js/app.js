// ==================== PAGES ====================

const PilihGeraiPage = {
    canteens: [],

    render() {
        return `
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 24px 16px 20px; text-align: center; color: #1e40af;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
                    <div style="width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <i class="fas fa-store" style="font-size: 24px; color: #2563eb;"></i>
                    </div>
                    <div style="text-align: left;">
                        <p style="margin: 0; font-size: 14px; color: #1e40af; opacity: 0.8;">Selamat Datang! 👋</p>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af;">Pilih gerai favoritmu</h1>
                    </div>
                </div>
                <p style="margin: 0; font-size: 13px; color: #1e40af; opacity: 0.7;">Pilih gerai untuk mulai memesan makanan dan minuman</p>
                
                <!-- SEARCH -->
                <div style="margin-top: 16px; position: relative;">
                    <i class="fas fa-search" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                    <input 
                        type="text" 
                        id="search-canteen" 
                        placeholder="Cari gerai atau makanan..."
                        oninput="PilihGeraiPage.handleSearch(this.value)"
                        style="width: 100%; padding: 12px 16px 12px 44px; border: none; border-radius: 12px; font-size: 15px; outline: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08);"
                    >
                </div>
            </div>

            <!-- SECTION HEADER -->
            <div style="padding: 16px; display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; background: #eef2ff; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-store" style="color: #2563eb; font-size: 18px;"></i>
                </div>
                <div>
                    <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: #1a1a1a;">Gerai Tersedia</h2>
                    <p style="margin: 0; font-size: 13px; color: #666;">Pilih gerai yang ingin kamu kunjungi</p>
                </div>
            </div>

            <!-- LIST -->
            <div id="canteen-list" style="padding: 0 16px 24px;">
                <div style="display: flex; flex-direction: column; align-items: center; padding: 40px; color: #999;">
                    <div class="spinner" style="width: 40px; height: 40px; border: 3px solid #e0e0e0; border-top-color: #2563eb; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 12px;"></div>
                    <p>Memuat gerai...</p>
                </div>
            </div>
        `;
    },

    async init() {
        try {
            const response = await API.getCanteens();
            this.canteens = response.data;
            this.renderCanteens();
        } catch (error) {
            document.getElementById('canteen-list').innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 16px;">🏪</div>
                    <p style="font-size: 16px; color: #666;">Gagal memuat gerai</p>
                </div>
            `;
        }
    },

    renderCanteens(canteensToRender = this.canteens) {
        const container = document.getElementById('canteen-list');

        if (canteensToRender.length === 0) {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 16px;">🔍</div>
                    <p style="font-size: 16px; color: #666;">Tidak ada gerai yang ditemukan</p>
                </div>
            `;
            return;
        }

        container.innerHTML = canteensToRender.map(canteen => {
            const isOpen = canteen.status === 'Buka';
            const statusBg = isOpen ? '#dcfce7' : '#fee2e2';
            const statusColor = isOpen ? '#166534' : '#991b1b';
            const statusText = isOpen ? '🟢 Buka' : '🔴 Tutup';
            const timeColor = isOpen ? '#22c55e' : '#ef4444';

            return `
                <div onclick="PilihGeraiPage.selectCanteen('${canteen.slug}')" style="background: white; border-radius: 16px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); cursor: pointer; transition: transform 0.2s; position: relative; overflow: hidden;">
                    
                    <!-- IMAGE -->
                    <div style="width: 100%; height: 160px; border-radius: 12px; overflow: hidden; margin-bottom: 12px; position: relative;">
                        <img 
                            src="${canteen.image}" 
                            alt="${canteen.name}" 
                            style="width: 100%; height: 100%; object-fit: cover;"
                            onerror="this.src='assets/images/default-canteen.jpg'"
                        >
                        <!-- STATUS BADGE -->
                        <div style="position: absolute; top: 12px; right: 12px; background: ${statusBg}; color: ${statusColor}; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                            ${statusText}
                        </div>
                    </div>

                    <!-- INFO -->
                    <div style="margin-bottom: 12px;">
                        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #1a1a1a;">${canteen.name}</h3>
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <i class="far fa-clock" style="color: ${timeColor}; font-size: 13px;"></i>
                            <span style="font-size: 13px; color: ${timeColor}; font-weight: 500;">${canteen.open_time}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-map-marker-alt" style="color: #999; font-size: 13px;"></i>
                            <span style="font-size: 13px; color: #666;">${canteen.address || 'Lokasi tidak tersedia'}</span>
                        </div>
                    </div>

                    <!-- BUTTON -->
                    <button onclick="event.stopPropagation(); PilihGeraiPage.selectCanteen('${canteen.slug}')" style="width: 100%; padding: 12px; background: ${isOpen ? '#2563eb' : '#e0e0e0'}; color: ${isOpen ? 'white' : '#999'}; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: ${isOpen ? 'pointer' : 'not-allowed'}; display: flex; align-items: center; justify-content: center; gap: 6px;">
                        ${isOpen ? 'Pilih Gerai <i class="fas fa-chevron-right" style="font-size: 12px;"></i>' : 'Gerai Tutup'}
                    </button>
                </div>
            `;
        }).join('');
    },

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        if (!searchTerm) {
            this.renderCanteens(this.canteens);
            return;
        }

        const filtered = this.canteens.filter(canteen =>
            canteen.name.toLowerCase().includes(searchTerm) ||
            canteen.status.toLowerCase().includes(searchTerm)
        );

        this.renderCanteens(filtered);
    },

    selectCanteen(slug) {
        const canteen = this.canteens.find(c => c.slug === slug);

        if (!canteen) return;

        // ✅ CEK STATUS TUTUP
        if (canteen.status !== 'Buka') {
            Store.setTempCanteen(canteen);
            Router.navigate('gerai-tutup');
            return;
        }

        // Animasi
        const card = event.currentTarget.closest('.canteen-card') || event.currentTarget;
        if (card) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = 'scale(1)', 150);
        }

        Store.setCurrentCanteen(canteen);
        Router.navigate('daftar-menu');
    }
};

const DaftarMenuPage = {
    menuItems: [],
    categories: ['Semua', 'Makanan', 'Minuman', 'Snack'],
    activeCategory: 'Semua',
    cartCount: 0,
    selectedMenu: null,

    // DATA DUMMY - Menu makanan
    dummyData: [
        {
            id: "menu-1",
            name: "Nasi Goreng Spesial",
            description: "Nasi goreng dengan bumbu spesial dan topping lengkap",
            price: 18000,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop",
            category: "Makanan",
            is_chef_choice: true,
            fullDescription: "Nasi goreng spesial dengan bumbu rahasia, dilengkapi dengan telur mata sapi, ayam suwir, udang segar, dan sayuran pilihan. Disajikan dengan kerupuk dan acar.",
        },
        {
            id: "menu-2",
            name: "Ayam Geprek",
            description: "Ayam goreng tepung dengan sambal pedas",
            price: 15000,
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=400&fit=crop",
            category: "Makanan",
            is_chef_choice: false,
            fullDescription: "Ayam goreng crispy dengan lapisan tepung renyah, digeprek dengan sambal bawang pedas yang menggugah selera. Disajikan dengan nasi hangat dan lalapan.",
        },
        {
            id: "menu-3",
            name: "Mie Ayam Bakso",
            description: "Mie ayam dengan bakso dan pangsit",
            price: 14000,
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop",
            category: "Makanan",
            is_chef_choice: false,
            fullDescription: "Mie kenyal dengan topping ayam jamur, bakso sapi, dan pangsit goreng. Kuah kaldu gurih yang kaya rasa.",
        },
        {
            id: "menu-4",
            name: "Es Teh Manis",
            description: "Teh manis segar dengan es batu",
            price: 5000,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
            category: "Minuman",
            is_chef_choice: false,
            fullDescription: "Teh hitam pilihan yang diseduh sempurna dengan gula pasir dan disajikan dingin dengan es batu.",
        },
        {
            id: "menu-5",
            name: "Es Jeruk",
            description: "Jus jeruk segar dengan es batu",
            price: 7000,
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop",
            category: "Minuman",
            is_chef_choice: false,
            fullDescription: "Jus jeruk segar yang diperas langsung, kaya vitamin C dan menyegarkan.",
        },
        {
            id: "menu-6",
            name: "Pisang Goreng",
            description: "Pisang goreng crispy dan manis",
            price: 8000,
            image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop",
            category: "Snack",
            is_chef_choice: false,
            fullDescription: "Pisang kepok matang yang dibalut tepung renyah dan digoreng hingga keemasan. Disajikan dengan taburan keju atau coklat.",
        }
    ],

    render() {
        return `
            <style>
                .daftar-menu-page {
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                /* Hero Section - Gradient Biru */
                .menu-hero {
                    background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #dbeafe 100%);
                    padding: 24px 20px 32px;
                    position: relative;
                    overflow: hidden;
                }
                
                .menu-hero::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 200px;
                    height: 200px;
                    background: #bfdbfe;
                    border-radius: 50%;
                    opacity: 0.4;
                }
                
                .menu-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 1;
                }
                
                .back-btn {
                    width: 44px;
                    height: 44px;
                    background: white;
                    border: none;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #2563eb;
                    font-size: 18px;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                    transition: all 0.2s;
                }
                
                .back-btn:hover {
                    transform: translateX(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                
                .cart-btn {
                    position: relative;
                    width: 50px;
                    height: 50px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #2563eb;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    transition: all 0.2s;
                }
                
                .cart-btn:hover {
                    transform: scale(1.05);
                }
                
                .cart-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    width: 22px;
                    height: 22px;
                    background: #2563eb;
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                }
                
                .menu-title-section {
                    position: relative;
                    z-index: 1;
                }
                
                .menu-title {
                    font-size: 32px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 8px;
                }
                
                .menu-subtitle {
                    color: #64748b;
                    font-size: 15px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                /* Search Bar */
                .menu-search-container {
                    padding: 0 20px;
                    margin-top: -16px;
                    position: relative;
                    z-index: 2;
                }
                
                .menu-search-box {
                    background: white;
                    border-radius: 16px;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    border: 1px solid #f1f5f9;
                }
                
                .menu-search-icon {
                    color: #94a3b8;
                    font-size: 18px;
                    margin-left: 16px;
                    margin-right: 12px;
                }
                
                .menu-search-input {
                    flex: 1;
                    border: none;
                    outline: none;
                    padding: 14px 0;
                    font-size: 15px;
                    color: #334155;
                    background: transparent;
                }
                
                .menu-search-input::placeholder {
                    color: #94a3b8;
                }
                
                .menu-filter-btn {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 20px;
                    padding: 12px 16px;
                    cursor: pointer;
                    border-radius: 12px;
                }
                
                /* Category Filter */
                .category-filter {
                    display: flex;
                    gap: 10px;
                    padding: 20px;
                    overflow-x: auto;
                    scrollbar-width: none;
                }
                
                .category-filter::-webkit-scrollbar {
                    display: none;
                }
                
                .category-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: 24px;
                    border: 1.5px solid #e2e8f0;
                    background: white;
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                    white-space: nowrap;
                }
                
                .category-btn:hover {
                    border-color: #3b82f6;
                    color: #2563eb;
                }
                
                .category-btn.active {
                    background: #2563eb;
                    color: white;
                    border-color: #2563eb;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
                }
                
                .category-btn i {
                    font-size: 14px;
                }
                
                /* Menu List */
                .menu-list {
                    padding: 0 20px 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                /* Menu Card */
                .menu-card {
                    background: white;
                    border-radius: 20px;
                    padding: 16px;
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                    border: 1px solid #f1f5f9;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .menu-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
                }
                
                .menu-image-wrapper {
                    position: relative;
                    width: 110px;
                    height: 110px;
                    border-radius: 16px;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                
                .menu-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                
                .menu-card:hover .menu-image {
                    transform: scale(1.05);
                }
                
                .chef-badge {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: #2563eb;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 700;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    line-height: 1.2;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                }
                
                .chef-badge i {
                    font-size: 12px;
                    margin-bottom: 2px;
                }
                
                .menu-info {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                
                .menu-name {
                    font-size: 17px;
                    font-weight: 700;
                    color: #0f172a;
                }
                
                .menu-description {
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .menu-price {
                    font-size: 18px;
                    font-weight: 800;
                    color: #2563eb;
                }
                
                .add-btn {
                    width: 44px;
                    height: 44px;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
                }
                
                .add-btn:hover {
                    background: #1d4ed8;
                    transform: scale(1.1);
                }
                
                .add-btn:active {
                    transform: scale(0.95);
                }
                
                /* Thank You Notice */
                .thank-you-notice {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 20px;
                    margin: 0 20px 20px;
                    background: #eff6ff;
                    border-radius: 16px;
                    color: #1e40af;
                }
                
                .thank-you-icon {
                    width: 40px;
                    height: 40px;
                    background: #2563eb;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                }
                
                .thank-you-text h4 {
                    font-size: 15px;
                    font-weight: 700;
                    margin-bottom: 2px;
                }
                
                .thank-you-text p {
                    font-size: 13px;
                    color: #3b82f6;
                }
                
                /* ===== DETAIL MODAL ===== */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .modal-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-content {
                    background: white;
                    width: 100%;
                    max-width: 480px;
                    max-height: 90vh;
                    border-radius: 32px 32px 0 0;
                    overflow-y: auto;
                    transform: translateY(100%);
                    transition: transform 0.3s ease;
                }
                
                .modal-overlay.active .modal-content {
                    transform: translateY(0);
                }
                
                .modal-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 280px;
                    overflow: hidden;
                }
                
                .modal-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .modal-close {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0f172a;
                    font-size: 18px;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    z-index: 10;
                }
                
                .modal-body {
                    padding: 24px;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                }
                
                .modal-title {
                    font-size: 24px;
                    font-weight: 800;
                    color: #0f172a;
                    flex: 1;
                }
                
                .modal-price {
                    font-size: 22px;
                    font-weight: 800;
                    color: #2563eb;
                }
                
                .modal-description {
                    font-size: 15px;
                    color: #64748b;
                    line-height: 1.7;
                    margin-bottom: 20px;
                }
                
                .modal-info-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 24px;
                }
                
                .info-item {
                    background: #f8fafc;
                    padding: 16px 12px;
                    border-radius: 16px;
                    text-align: center;
                }
                
                .info-icon {
                    font-size: 20px;
                    color: #2563eb;
                    margin-bottom: 8px;
                }
                
                .info-label {
                    font-size: 11px;
                    color: #94a3b8;
                    margin-bottom: 4px;
                }
                
                .info-value {
                    font-size: 14px;
                    font-weight: 700;
                    color: #0f172a;
                }
                
                .ingredients-section {
                    margin-bottom: 24px;
                }
                
                .section-label {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .ingredients-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .ingredient-tag {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 500;
                }
                
                .modal-footer {
                    padding: 16px 24px 32px;
                    display: flex;
                    gap: 12px;
                    border-top: 1px solid #f1f5f9;
                }
                
                .quantity-control {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 8px 16px;
                }
                
                .qty-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    background: white;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #2563eb;
                    font-size: 18px;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }
                
                .qty-value {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    min-width: 24px;
                    text-align: center;
                }
                
                .add-to-cart-btn {
                    flex: 1;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    padding: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
                    transition: all 0.2s;
                }
                
                .add-to-cart-btn:hover {
                    background: #1d4ed8;
                }
                
                .add-to-cart-btn:active {
                    transform: scale(0.98);
                }
                
                /* Loading & Empty States */
                .menu-loading, .menu-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 20px;
                    color: #94a3b8;
                }
                
                .menu-spinner {
                    width: 48px;
                    height: 48px;
                    border: 4px solid #dbeafe;
                    border-top-color: #2563eb;
                    border-radius: 50%;
                    animation: menu-spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                
                @keyframes menu-spin {
                    to { transform: rotate(360deg); }
                }
                
                .menu-empty-icon {
                    font-size: 56px;
                    margin-bottom: 16px;
                }
                
                /* Responsive */
                @media (max-width: 640px) {
                    .menu-title {
                        font-size: 26px;
                    }
                    
                    .menu-card {
                        padding: 12px;
                        gap: 12px;
                    }
                    
                    .menu-image-wrapper {
                        width: 90px;
                        height: 90px;
                        border-radius: 12px;
                    }
                    
                    .menu-name {
                        font-size: 15px;
                    }
                    
                    .menu-price {
                        font-size: 16px;
                    }
                    
                    .modal-image-wrapper {
                        height: 240px;
                    }
                }
            </style>

            <div class="daftar-menu-page">
                <!-- Hero Section -->
                <div class="menu-hero">
                    <div class="menu-header">
                        <button class="back-btn" onclick="DaftarMenuPage.goBack()">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <button class="cart-btn" onclick="DaftarMenuPage.openCart()">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-badge" id="cart-badge" style="display: none;">0</span>
                        </button>
                    </div>
                    
                    <div class="menu-title-section">
                        <h1 class="menu-title">Daftar Menu 🍳</h1>
                        <p class="menu-subtitle">
                            Temukan berbagai pilihan makanan dan minuman favoritmu di sini!
                        </p>
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="menu-search-container">
                    <div class="menu-search-box">
                        <i class="fas fa-search menu-search-icon"></i>
                        <input 
                            type="text" 
                            id="search-menu" 
                            class="menu-search-input" 
                            placeholder="Cari menu atau makanan..."
                            oninput="DaftarMenuPage.handleSearch(this.value)"
                        >
                        <button class="menu-filter-btn">
                            <i class="fas fa-sliders-h"></i>
                        </button>
                    </div>
                </div>

                <!-- Category Filter -->
                <div class="category-filter" id="category-filter">
                    ${this.categories.map(cat => `
                        <button 
                            class="category-btn ${cat === this.activeCategory ? 'active' : ''}" 
                            onclick="DaftarMenuPage.filterCategory('${cat}')"
                        >
                            ${this.getCategoryIcon(cat)}
                            ${cat}
                        </button>
                    `).join('')}
                </div>

                <!-- Menu List -->
                <div id="menu-list" class="menu-list">
                    <div class="menu-loading">
                        <div class="menu-spinner"></div>
                        <p>Memuat menu...</p>
                    </div>
                </div>

                <!-- Detail Modal -->
                <div id="menu-modal" class="modal-overlay" onclick="DaftarMenuPage.closeModal(event)">
                    <div class="modal-content" onclick="event.stopPropagation()">
                        <div id="modal-body">
                            <!-- Modal content akan di-render di sini -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getCategoryIcon(category) {
        const icons = {
            'Semua': '<i class="fas fa-th-large"></i>',
            'Makanan': '<i class="fas fa-utensils"></i>',
            'Minuman': '<i class="fas fa-glass-water"></i>',
            'Snack': '<i class="fas fa-cookie-bite"></i>'
        };
        return icons[category] || '';
    },

    async init() {
        this.menuItems = this.dummyData;
        this.renderMenus();
    },

    renderMenus(itemsToRender = this.menuItems) {
        const container = document.getElementById('menu-list');

        if (itemsToRender.length === 0) {
            container.innerHTML = `
                <div class="menu-empty">
                    <div class="menu-empty-icon">🔍</div>
                    <p>Tidak ada menu yang ditemukan</p>
                </div>
            `;
            return;
        }

        container.innerHTML = itemsToRender.map(item => `
            <div class="menu-card" onclick="DaftarMenuPage.openDetail('${item.id}')">
                <div class="menu-image-wrapper">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        class="menu-image" 
                        onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'"
                    >
                    ${item.is_chef_choice ? `
                        <div class="chef-badge">
                            <i class="fas fa-hat-chef"></i>
                            <span>Chef's</span>
                            <span>Choice</span>
                        </div>
                    ` : ''}
                </div>
                <div class="menu-info">
                    <h3 class="menu-name">${item.name}</h3>
                    <p class="menu-description">${item.description}</p>
                    <div class="menu-price">Rp${this.formatPrice(item.price)}</div>
                </div>
                <button class="add-btn" onclick="event.stopPropagation(); DaftarMenuPage.addToCart('${item.id}')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `).join('');
    },

    // ===== DETAIL MODAL FUNCTIONS =====

    openDetail(menuId) {
        const item = this.menuItems.find(m => m.id === menuId);
        if (!item) return;

        this.selectedMenu = item;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="modal-image-wrapper">
                <img src="${item.image}" alt="${item.name}" class="modal-image" 
                    onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'">
                <button class="modal-close" onclick="DaftarMenuPage.closeModal()">
                    <i class="fas fa-arrow-left"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="modal-header">
                    <h2 class="modal-title">${item.name}</h2>
                    <div class="modal-price">Rp${this.formatPrice(item.price)}</div>
                </div>
                
                <p class="modal-description">${item.fullDescription || item.description}</p>

                    <div class="ingredients-list">
                        ${(item.ingredients || []).map(ing => `
                            <span class="ingredient-tag">${ing}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="DaftarMenuPage.changeQty(-1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-value" id="modal-qty">1</span>
                    <button class="qty-btn" onclick="DaftarMenuPage.changeQty(1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="add-to-cart-btn" onclick="DaftarMenuPage.addToCartFromModal()">
                    <i class="fas fa-shopping-cart"></i>
                    Tambah ke Keranjang
                </button>
            </div>
        `;

        document.getElementById('menu-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeModal(event) {
        if (event && event.target !== event.currentTarget) return;

        document.getElementById('menu-modal').classList.remove('active');
        document.body.style.overflow = '';
        this.selectedMenu = null;
    },

    changeQty(delta) {
        const qtyEl = document.getElementById('modal-qty');
        let qty = parseInt(qtyEl.textContent) + delta;
        if (qty < 1) qty = 1;
        if (qty > 99) qty = 99;
        qtyEl.textContent = qty;
    },

    addToCartFromModal() {
        const qty = parseInt(document.getElementById('modal-qty').textContent);

        for (let i = 0; i < qty; i++) {
            this.addToCart(this.selectedMenu.id, false);
        }

        this.closeModal();
    },

    filterCategory(category) {
        this.activeCategory = category;

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === category);
        });

        if (category === 'Semua') {
            this.renderMenus(this.menuItems);
            return;
        }

        const filtered = this.menuItems.filter(item => item.category === category);
        this.renderMenus(filtered);
    },

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        let items = this.activeCategory === 'Semua'
            ? this.menuItems
            : this.menuItems.filter(item => item.category === this.activeCategory);

        if (!searchTerm) {
            this.renderMenus(items);
            return;
        }

        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );

        this.renderMenus(filtered);
    },

    addToCart(menuId, showAnimation = true) {
        const item = this.menuItems.find(m => m.id === menuId);
        if (!item) return;

        this.cartCount++;
        const badge = document.getElementById('cart-badge');
        badge.textContent = this.cartCount;
        badge.style.display = 'flex';

        if (showAnimation) {
            const btn = event.currentTarget;
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = '', 150);
        }

        if (typeof Store !== 'undefined' && Store.addToCart) {
            // ✅ Kirim dengan format yang sesuai KeranjangPage
            Store.addToCart({
                menu_id: item.id,           // mapping id → menu_id
                name: item.name,
                price: Number(item.price),  // jaga-jaga biar number
                image: item.image,
                quantity: 1,                // tambahin quantity!
                notes: ''
            });
        }
    },

    openCart() {
        if (typeof Router !== 'undefined') {
            Router.navigate('keranjang');
        }
    },

    goBack() {
        if (typeof Router !== 'undefined') {
            Router.navigate('pilih-gerai');
        }
    },

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};

const KeranjangPage = {
    render() {
        const cart = Store.state.cart;

        if (cart.length === 0) {
            return `
                <!-- HEADER KOSONG -->
                <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px 16px; text-align: center; position: relative; color: #1e40af;">
                    <button onclick="Router.back()" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #1e40af; font-size: 20px; cursor: pointer;">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">KERANJANG</h1>
                </div>
                
                <!-- EMPTY STATE -->
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 16px;">🛒</div>
                    <p style="font-size: 16px; color: #666; margin-bottom: 24px;">Keranjang masih kosong</p>
                    <button onclick="Router.navigate('daftar-menu')" style="width: 100%; max-width: 280px; padding: 16px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        Belanja Sekarang
                    </button>
                </div>
            `;
        }

        // ✅ HAPUS PAJAK - Total = Subtotal
        const subtotal = Store.getCartTotal();
        const total = subtotal;

        return `
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px 16px; text-align: center; position: relative; color: #1e40af;">
                <button onclick="Router.back()" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #1e40af; font-size: 20px; cursor: pointer;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">KERANJANG</h1>
            </div>

            <!-- LIST MENU -->
            <div style="padding: 0 16px;">
                ${cart.map((item, index) => `
                    <div style="background: white; border-radius: 12px; padding: 12px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                        <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; border-radius: 10px; object-fit: cover;" onerror="this.src='assets/images/default-food.jpg'">
                        <div style="flex: 1;">
                            <div style="font-size: 15px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">${item.name}</div>
                            <div style="font-size: 13px; color: #666;">${Utils.formatRupiah(item.price)}</div>
                            ${item.notes ? `<div style="font-size: 12px; color: #999; margin-top: 2px;">${item.notes}</div>` : ''}
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button style="width: 32px; height: 32px; border: 1.5px solid #e0e0e0; background: white; border-radius: 8px; font-size: 16px; cursor: pointer;" onclick="KeranjangPage.updateQty(${index}, -1)">-</button>
                            <span style="font-size: 15px; font-weight: 600; min-width: 24px; text-align: center;">${item.quantity}</span>
                            <button style="width: 32px; height: 32px; border: 1.5px solid #e0e0e0; background: white; border-radius: 8px; font-size: 16px; cursor: pointer;" onclick="KeranjangPage.updateQty(${index}, 1)">+</button>
                            <button style="width: 32px; height: 32px; border: none; background: transparent; color: #ff4444; cursor: pointer; font-size: 16px;" onclick="KeranjangPage.removeItem(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- ✅ SUMMARY BOX (TANPA PAJAK) -->
            <div style="background: white; margin: 0 16px 12px; padding: 16px; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; font-size: 14px; color: #666;">
                    <span>Subtotal</span>
                    <span>${Utils.formatRupiah(subtotal)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 0; margin-top: 8px; border-top: 1.5px dashed #e0e0e0; font-weight: 700; font-size: 16px; color: #ff5722;">
                    <span>Total</span>
                    <span>${Utils.formatRupiah(total)}</span>
                </div>
            </div>

            <!-- NAMA PEMESAN -->
            <div style="background: #eef2ff; margin: 0 16px 16px; padding: 16px; border-radius: 12px;">
                <label style="font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 10px; display: block;">Nama Pemesan</label>
                <input type="text" id="customer-name" placeholder="Masukkan nama kamu" style="width: 100%; padding: 12px 16px; border: 1px solid #d0d8f0; background: white; border-radius: 10px; font-size: 15px; color: #333; outline: none; box-sizing: border-box;">
            </div>

            <!-- CHECKOUT BUTTON BIRU -->
            <div style="padding: 0 16px 24px;">
                <button onclick="KeranjangPage.checkout()" style="width: 100%; padding: 16px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: block;">
                    Checkout
                </button>
            </div>
        `;
    },

    init() {
        const user = Store.state.user;
        if (user) {
            const nameInput = document.getElementById('customer-name');
            if (nameInput) nameInput.value = user.name;
        }
    },

    updateQty(index, delta) {
        const item = Store.state.cart[index];
        const newQty = item.quantity + delta;

        if (newQty < 1) {
            this.removeItem(index);
            return;
        }

        Store.updateCartItem(item.menu_id, newQty, item.notes);
        Router.render('keranjang');
    },

    removeItem(index) {
        const item = Store.state.cart[index];
        Store.removeFromCart(item.menu_id);
        Utils.showToast('Item dihapus dari keranjang');
        Router.render('keranjang');
    },

    async checkout() {
        const customerName = document.getElementById('customer-name').value.trim();

        if (!customerName) {
            Utils.showToast('Silakan masukkan nama pemesan');
            document.getElementById('customer-name').focus();
            return;
        }

        if (Store.state.cart.length === 0) {
            Utils.showToast('Keranjang masih kosong');
            return;
        }

        const tableNumber = Store.state.tableNumber || '-';

        // ✅ SET ORDER TANPA PAJAK
        Store.setCurrentOrder({
            customer_name: customerName,
            table_number: tableNumber,
            items: [...Store.state.cart],
            subtotal: Store.getCartTotal(),
            tax: 0,
            total: Store.getCartTotal(),
            canteen: Store.state.currentCanteen,
        });

        Router.navigate('pembayaran');
    }
};

const PembayaranPage = {
    selectedMethod: 'qris',

    render() {
        const order = Store.state.currentOrder;
        if (!order) {
            Router.navigate('keranjang');
            return '';
        }

        return `
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px 16px; text-align: center; position: relative; color: #1e40af; margin-bottom: 16px;">
                <button onclick="Router.back()" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #1e40af; font-size: 20px; cursor: pointer;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">PEMBAYARAN</h1>
            </div>

            <div style="padding: 0 16px;">
                <div style="font-size: 14px; font-weight: 600; margin-bottom: 16px; color: #666;">Pilih Metode Pembayaran</div>

                <!-- QRIS -->
                <div onclick="PembayaranPage.selectMethod('qris')" style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); cursor: pointer; border: 2px solid ${this.selectedMethod === 'qris' ? '#2563eb' : 'transparent'};">
                    <div style="width: 48px; height: 48px; background: #FFF3E0; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-qrcode" style="color: #ff5722; font-size: 24px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 15px; font-weight: 600; color: #1a1a1a;">QRIS</div>
                        <div style="font-size: 13px; color: #666;">Bayar dengan QR Code</div>
                    </div>
                    <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid ${this.selectedMethod === 'qris' ? '#2563eb' : '#ddd'}; display: flex; align-items: center; justify-content: center;">
                        ${this.selectedMethod === 'qris' ? '<div style="width: 12px; height: 12px; background: #2563eb; border-radius: 50%;"></div>' : ''}
                    </div>
                </div>
            </div>

            <!-- SUMMARY BOX -->
            <div style="background: white; margin: 16px 16px 16px; padding: 16px; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 14px; color: #666;">
                    <span>Subtotal</span>
                    <span>${Utils.formatRupiah(order.subtotal)}</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 0; margin-top: 8px; border-top: 1.5px dashed #e0e0e0; font-weight: 700; font-size: 16px; color: #ff5722;">
                    <span>Total Pembayaran</span>
                    <span>${Utils.formatRupiah(order.total)}</span>
                </div>
            </div>

            <!-- ✅ BAYAR BUTTON BIRU (full width, nggak fixed) -->
            <div style="padding: 0 16px 24px;">
                <button onclick="PembayaranPage.pay()" style="width: 100%; padding: 16px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: block;">
                    Bayar Sekarang
                </button>
            </div>
        `;
    },

    init() {
        this.selectedMethod = 'qris';
    },

    selectMethod(method) {
        this.selectedMethod = method;
        Router.render('pembayaran');
    },

    async pay() {
        const order = Store.state.currentOrder;

        try {
            const orderData = {
                canteen_id: order.canteen.id,
                customer_name: order.customer_name,
                table_number: order.table_number,
                notes: '',
            };

            const orderResponse = await API.createOrder(orderData);
            const orderCode = orderResponse.data.order_code;

            const paymentData = {
                order_code: orderCode,
                method: this.selectedMethod,
            };

            const paymentResponse = await API.createPayment(paymentData);

            Store.setCurrentOrder({
                ...order,
                order_code: orderCode,
                payment: paymentResponse.data,
            });

            if (this.selectedMethod === 'qris') {
                Router.navigate('qris');
            } else {
                Router.navigate('sukses');
            }

        } catch (error) {
            Utils.showToast(error.message || 'Gagal membuat pesanan');
        }
    }
};

const QrisPage = {
    timer: null,
    timeLeft: 300, // 5 minutes

    render() {
        const order = Store.state.currentOrder;
        if (!order || !order.payment) {
            Router.navigate('pembayaran');
            return '';
        }

        return `
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px 16px; text-align: center; position: relative; color: #1e40af; margin-bottom: 16px;">
                <button onclick="Router.back()" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #1e40af; font-size: 20px; cursor: pointer;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">BAYAR (QRIS)</h1>
            </div>

            <div style="padding: 0 16px; text-align: center;">
                <div style="font-size: 14px; color: #666; margin-bottom: 20px;">Scan QR Code berikut untuk melakukan pembayaran</div>

                <!-- QR CODE -->
                <div style="background: white; border-radius: 16px; padding: 20px; margin: 0 auto 20px; max-width: 280px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <img src="${order.payment.qris_image || 'assets/images/qris-sample.png'}" alt="QRIS Code" style="width: 100%; max-width: 240px; height: auto; border-radius: 8px;">
                </div>

                <!-- TIMER -->
                <div id="qris-timer" style="font-size: 32px; font-weight: 700; color: #1e40af; margin-bottom: 8px;">05:00</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 24px;">Selesaikan dalam</div>

                <!-- ORDER INFO -->
                <div style="background: #f8f9fa; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 14px; color: #666;">Total Pembayaran</span>
                        <span style="font-size: 16px; font-weight: 700; color: #1a1a1a;">${Utils.formatRupiah(order.total)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px; color: #666;">Order ID</span>
                        <span style="font-size: 14px; font-family: monospace; color: #1a1a1a;">#${order.order_code}</span>
                    </div>
                </div>

                <!-- TOMBOL BIRU -->
                <div style="padding: 0 0 24px;">
                    <button onclick="QrisPage.simulatePay()" style="width: 100%; padding: 16px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: block;">
                        Saya Sudah Bayar
                    </button>
                </div>
            </div>
        `;
    },

    init() {
        this.timeLeft = 300;
        this.startTimer();
    },

    startTimer() {
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                Utils.showToast('Waktu pembayaran habis');
                Router.navigate('pembayaran');
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = document.getElementById('qris-timer');
        if (display) {
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    async simulatePay() {
        const order = Store.state.currentOrder;

        try {
            await API.simulatePayment(order.order_code);
            clearInterval(this.timer);
            Utils.showToast('Pembayaran berhasil!');

            // ✅ LOADING SCREEN
            const app = document.getElementById('app'); // ganti 'app' dengan ID container kamu

            app.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; padding: 20px; text-align: center; background: white;">
                    <div style="width: 60px; height: 60px; border: 4px solid #e0e0e0; border-top-color: #2563eb; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 24px;"></div>
                    <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #1a1a1a;">Memverifikasi Pembayaran...</h2>
                    <p style="margin: 0; font-size: 14px; color: #666;">Mohon tunggu sebentar</p>
                </div>
            `;

            // Delay 3 detik baru ke sukses
            setTimeout(() => {
                Router.navigate('sukses');
            }, 3000);

        } catch (error) {
            Utils.showToast(error.message || 'Gagal memverifikasi pembayaran');
        }
    },

    destroy() {
        if (this.timer) clearInterval(this.timer);
    }
};

const SuksesPage = {
    render() {
        const order = Store.state.currentOrder;

        return `
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px 16px; text-align: center; position: relative; color: #1e40af; margin-bottom: 16px;">
                <button onclick="Router.back()" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #1e40af; font-size: 20px; cursor: pointer;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">SUKSES</h1>
            </div>

            <!-- SUCCESS CONTENT -->
            <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 16px; text-align: center;">
                
                <!-- ICON CHECK -->
                <div style="width: 80px; height: 80px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <i class="fas fa-check" style="font-size: 40px; color: #22c55e;"></i>
                </div>

                <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #1a1a1a;">Pembayaran Berhasil!</h2>
                <p style="margin: 0 0 24px; font-size: 14px; color: #666; line-height: 1.5;">
                    Terima kasih, pesanan kamu sedang kami proses.
                </p>

                <!-- ORDER INFO -->
                <div style="background: #f8f9fa; border-radius: 12px; padding: 16px; width: 100%; margin-bottom: 24px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 14px; color: #666;">Order ID</span>
                        <span style="font-size: 14px; font-weight: 700; font-family: monospace; color: #1a1a1a;">#${order.order_code}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px; color: #666;">Total Pembayaran</span>
                        <span style="font-size: 16px; font-weight: 700; color: #1a1a1a;">${Utils.formatRupiah(order.total)}</span>
                    </div>
                </div>

                <!-- BUTTONS -->
                <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
                    <button onclick="Router.navigate('pilih-gerai')" style="width: 100%; padding: 16px; background: white; color: #2563eb; border: 2px solid #2563eb; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        `;
    },

    init() {
        Store.clearCart();
    }
};

const StrukPage = {
    render() {
        const order = Store.state.currentOrder;
        const canteen = order.canteen || { name: 'Kantin Central', address: 'Jl. Kampus No. 123', phone: '(021) 1234 5678' };

        return `
            <div class="app-header">
                <button class="back-btn" onclick="Router.back()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1 class="page-title">Struk Belanja</h1>
            </div>

            <div class="receipt">
                <div class="receipt-header">
                    <div class="receipt-logo">
                        <i class="fas fa-store"></i>
                    </div>
                    <div class="receipt-shop">${canteen.name}</div>
                    <div class="receipt-address">${canteen.address || ''}</div>
                    <div class="receipt-address">Telp: ${canteen.phone || ''}</div>
                </div>

                <div class="receipt-details">
                    <div class="receipt-row">
                        <span>Order ID</span>
                        <span style="font-family: monospace;">#${order.order_code}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Meja</span>
                        <span>${order.table_number || '-'}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Tanggal</span>
                        <span>${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                <div class="receipt-items">
                    ${order.items.map(item => `
                        <div class="receipt-item">
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${item.name}</div>
                                ${item.notes ? `<div style="font-size: 12px; color: var(--gray);">${item.notes}</div>` : ''}
                            </div>
                            <span class="receipt-item-qty">${item.quantity}x</span>
                            <span class="receipt-item-price">${Utils.formatRupiah(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${Utils.formatRupiah(order.subtotal)}</span>
                    </div>
                </div>

                <div class="receipt-footer">
                    <div class="receipt-thanks">
                        <i class="fas fa-heart" style="color: var(--danger);"></i> Terima kasih telah berbelanja!<br>
                        Semoga harimu menyenangkan!
                    </div>
                </div>
            </div>

            <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                <button class="btn-primary" onclick="StrukPage.shareStruk()">
                    <i class="fas fa-share-alt"></i> Bagikan Struk
                </button>
                <button class="btn-secondary" onclick="Router.navigate('pilih-gerai')">
                    Kembali ke Beranda
                </button>
            </div>
        `;
    },

    init() { },

    shareStruk() {
        if (navigator.share) {
            navigator.share({
                title: 'Struk Belanja - Kantin Digital',
                text: `Terima kasih telah berbelanja di ${Store.state.currentOrder?.canteen?.name || 'Kantin Digital'}!`,
            });
        } else {
            Utils.showToast('Fitur share tidak tersedia di browser ini');
        }
    }
};

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});