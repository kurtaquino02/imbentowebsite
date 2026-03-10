const defaultWishlistItems = [
    {
        id: 101, 
        name: "Safety Wet Floor Sign",
        price: 700,
        oldPrice: 1200,
        rating: 4.9,
        reviews: 28,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        category: "home",
        catDisplay: "🏠 Home & Decor Maintenance",
        stock: "available",
        badge: "sale",
        badgeText: "−42%",
        sellerName: "SafetyPro PH",
        sellerLocation: "Quezon City"
    },
    {
        id: 105,
        name: "Men's Prestige Perfume",
        price: 700,
        oldPrice: null,
        rating: 5.0,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        category: "beauty",
        catDisplay: "💄 Beauty & Personal Care",
        stock: "available",
        badge: "new",
        badgeText: "New",
        sellerName: "ScentManila",
        sellerLocation: "Manila"
    },
    {
        id: 112,
        name: "Handwoven Fabric Tote Bag",
        price: 580,
        oldPrice: null,
        rating: 4.8,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
        category: "fashion",
        catDisplay: "👗 Fashion & Accessories",
        stock: "low",
        badge: null,
        badgeText: null,
        sellerName: "WovenPh",
        sellerLocation: "Pampanga"
    },
    {
        id: 102,
        name: "Herbal Muscle Relief Balm",
        price: 450,
        oldPrice: null,
        rating: 4.9,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
        category: "health",
        catDisplay: "🌿 Health & Wellness",
        stock: "available",
        badge: "bestseller",
        badgeText: "Best Seller",
        sellerName: "HerbalPH",
        sellerLocation: "Davao City"
    },
    {
        id: 113,
        name: "Organic Calamansi Jam",
        price: 320,
        oldPrice: null,
        rating: 4.7,
        reviews: 32,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
        category: "food",
        catDisplay: "🍜 Food & Beverage",
        stock: "available",
        badge: null,
        badgeText: null,
        sellerName: "FarmFresh",
        sellerLocation: "Quezon Province"
    },
    {
        id: 114,
        name: "Burnay Clay Decorative Pot",
        price: 1200,
        oldPrice: 1500,
        rating: 5.0,
        reviews: 8,
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
        category: "arts",
        catDisplay: "🎨 Arts & Crafts",
        stock: "available",
        badge: "sale",
        badgeText: "−20%",
        sellerName: "ClayWorks",
        sellerLocation: "Vigan, Ilocos Sur"
    }
];

// Stub - Get Wishlist (Connect to API later)
function getWishlist() {
    // Return mock wishlist items for simulation
    return defaultWishlistItems;
}
