// ==================== MOCK DATA ====================
// This file provides mock data so the frontend can run without the backend

const MOCK_CANTEENS = [
    {
        id: 1,
        name: 'Kantin Cita Rasa',
        slug: 'kantin-Cita Rasa',
        image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop',
        open_time: '09:00 - 16:00',
        status: 'Buka',
        address: 'Esa Corner Tangerang, Lantai 1 No. A1 ',
        phone: '0812-4567-8910',
    },
    {
        id: 2,
        name: 'Foodcourt Teknik',
        slug: 'foodcourt-teknik',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        open_time: '08:00 - 20:00',
        status: 'Tutup',
        address: 'Gedung Teknik, Lantai Dasar',
        phone: '(021) 5678 9012',
    },
    {
        id: 3,
        name: 'Kafe Sastra',
        slug: 'kafe-sastra',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
        open_time: '09:00 - 22:00',
        status: 'Tutup',
        address: 'Gedung Sastra, Lantai 2',
        phone: '(021) 3456 7890',
    },
    {
        id: 4,
        name: 'Kantin Ekonomi',
        slug: 'kantin-ekonomi',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        open_time: '07:30 - 17:00',
        status: 'Tutup',
        address: 'Gedung Ekonomi, Lantai 1',
        phone: '(021) 2345 6789',
    },
];

const MOCK_MENUS = {
    'kantin-central': {
        menus: [
            {
                id: 1, name: 'Nasi Goreng Spesial', slug: 'nasi-goreng-spesial',
                price: 18000, formatted_price: 'Rp18.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop',
                description: 'Nasi goreng dengan telur, ayam, sayuran segar, dan bumbu rahasia khas kantin. Disajikan dengan kerupuk dan acar.',
            },
            {
                id: 2, name: 'Ayam Geprek', slug: 'ayam-geprek',
                price: 15000, formatted_price: 'Rp15.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=400&fit=crop',
                description: 'Ayam goreng crispy yang digeprek dengan sambal pedas pilihan. Tersedia level pedas 1-5.',
            },
            {
                id: 3, name: 'Mie Ayam Bakso', slug: 'mie-ayam-bakso',
                price: 14000, formatted_price: 'Rp14.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
                description: 'Mie ayam dengan bakso sapi homemade, sayur sawi, dan kuah kaldu yang gurih.',
            },
            {
                id: 4, name: 'Es Teh Manis', slug: 'es-teh-manis',
                price: 5000, formatted_price: 'Rp5.000', type: 'drink',
                image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
                description: 'Teh manis segar dengan es batu. Minuman klasik pelepas dahaga.',
            },
            {
                id: 5, name: 'Es Jeruk', slug: 'es-jeruk',
                price: 7000, formatted_price: 'Rp7.000', type: 'drink',
                image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
                description: 'Jus jeruk segar diperas langsung, manis alami dengan es batu.',
            },
            {
                id: 6, name: 'Pisang Goreng', slug: 'pisang-goreng',
                price: 8000, formatted_price: 'Rp8.000', type: 'snack',
                image: 'https://images.unsplash.com/photo-1600326145308-d3b50cef62db?w=400&h=400&fit=crop',
                description: 'Pisang goreng crispy dengan topping keju, coklat, atau gula halus.',
            },
            {
                id: 7, name: 'Soto Ayam', slug: 'soto-ayam',
                price: 16000, formatted_price: 'Rp16.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
                description: 'Soto ayam kuah kuning dengan suwiran ayam, telur, kentang, dan nasi.',
            },
            {
                id: 8, name: 'Kopi Susu', slug: 'kopi-susu',
                price: 12000, formatted_price: 'Rp12.000', type: 'drink',
                image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
                description: 'Kopi susu gula aren dengan biji kopi pilihan. Creamy dan bold.',
            },
            {
                id: 9, name: 'Tahu Crispy', slug: 'tahu-crispy',
                price: 6000, formatted_price: 'Rp6.000', type: 'snack',
                image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop',
                description: 'Tahu goreng crispy dengan bumbu pedas manis. Cocok untuk camilan.',
            },
        ],
    },
    'foodcourt-teknik': {
        menus: [
            {
                id: 10, name: 'Nasi Padang', slug: 'nasi-padang',
                price: 22000, formatted_price: 'Rp22.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
                description: 'Nasi Padang lengkap dengan rendang, ayam pop, sayur daun singkong, dan sambal hijau.',
            },
            {
                id: 11, name: 'Bakso Beranak', slug: 'bakso-beranak',
                price: 17000, formatted_price: 'Rp17.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1583224964978-2d27c0e10765?w=400&h=400&fit=crop',
                description: 'Bakso jumbo berisi bakso kecil di dalamnya, dengan mie, tahu, dan kuah kaldu sapi.',
            },
            {
                id: 12, name: 'Jus Alpukat', slug: 'jus-alpukat',
                price: 10000, formatted_price: 'Rp10.000', type: 'drink',
                image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=400&fit=crop',
                description: 'Jus alpukat creamy dengan susu coklat dan gula aren.',
            },
        ],
    },
    'kafe-sastra': {
        menus: [
            {
                id: 13, name: 'Sandwich Club', slug: 'sandwich-club',
                price: 25000, formatted_price: 'Rp25.000', type: 'food',
                image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
                description: 'Club sandwich dengan ayam panggang, selada, tomat, dan mayo.',
            },
            {
                id: 14, name: 'Cappuccino', slug: 'cappuccino',
                price: 18000, formatted_price: 'Rp18.000', type: 'drink',
                image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
                description: 'Cappuccino klasik dengan foam lembut dan latte art.',
            },
            {
                id: 15, name: 'Croissant', slug: 'croissant',
                price: 15000, formatted_price: 'Rp15.000', type: 'snack',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop',
                description: 'Croissant renyah berlapis-lapis, bisa pilih isian coklat atau keju.',
            },
        ],
    },
};

// Default menus for canteens without specific data
const DEFAULT_MENUS = MOCK_MENUS['kantin-central'];

// ==================== OVERRIDE API ====================

// Save original API methods
const _originalAPI = { ...API };

// Override API methods with mock data
API.getCanteens = async function() {
    await new Promise(r => setTimeout(r, 500)); // Simulate network delay
    return { data: MOCK_CANTEENS };
};

API.getCanteen = async function(slug) {
    await new Promise(r => setTimeout(r, 300));
    const canteen = MOCK_CANTEENS.find(c => c.slug === slug);
    return { data: canteen };
};

API.getMenus = async function(canteenSlug, params = {}) {
    await new Promise(r => setTimeout(r, 500));
    let menuData = MOCK_MENUS[canteenSlug] || DEFAULT_MENUS;
    let menus = [...menuData.menus];

    // Filter by type
    if (params.type && params.type !== 'all') {
        menus = menus.filter(m => m.type === params.type);
    }

    // Filter by search
    if (params.search) {
        const search = params.search.toLowerCase();
        menus = menus.filter(m => m.name.toLowerCase().includes(search));
    }

    return { data: { menus } };
};

API.getMenu = async function(canteenSlug, menuSlug) {
    await new Promise(r => setTimeout(r, 300));
    const menuData = MOCK_MENUS[canteenSlug] || DEFAULT_MENUS;
    const menu = menuData.menus.find(m => m.slug === menuSlug);
    return { data: menu };
};

API.createOrder = async function(orderData) {
    await new Promise(r => setTimeout(r, 800));
    const orderCode = Utils.generateOrderCode();
    return {
        data: {
            order_code: orderCode,
            status: 'pending',
            ...orderData,
        }
    };
};

API.createPayment = async function(paymentData) {
    await new Promise(r => setTimeout(r, 600));
    return {
        data: {
            id: Math.random().toString(36).substr(2, 9),
            order_code: paymentData.order_code,
            method: paymentData.method,
            status: 'pending',
            qris_image: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MOCK-QRIS-' + paymentData.order_code,
        }
    };
};

API.simulatePayment = async function(orderCode) {
    await new Promise(r => setTimeout(r, 1000));
    return {
        data: {
            order_code: orderCode,
            status: 'paid',
            message: 'Pembayaran berhasil',
        }
    };
};

API.verifyPayment = async function(orderCode) {
    await new Promise(r => setTimeout(r, 500));
    return {
        data: {
            order_code: orderCode,
            status: 'paid',
        }
    };
};

console.log('✅ Mock data loaded - Frontend running in demo mode');
