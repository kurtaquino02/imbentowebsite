document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const catSlug = urlParams.get('cat');

    if (!catSlug) {
        // Redirect to all categories or show error if no category selected
        window.location.href = 'allcategories.html';
        return;
    }

    // 2. Define Category Configurations
    // Maps slug -> { title, description, dbCategories (internal names), subcats (display only) }
    const CATEGORY_CONFIG = {
        'home': {
            title: '🏠 Home & Decor',
            desc: 'Furniture, lighting, and decor crafted by Filipino artisans.',
            filters: ["Home & Decor", "Home Decor", "Lighting", "Organization", "Cleaning", "Furniture", "Wall Art"],
            subcats: ["Furniture", "Wall Art", "Lighting", "Storage", "Cleaning Tools", "Safety", "Bedding", "Kitchen"]
        },
        'beauty': {
            title: '💄 Beauty & Personal Care',
            desc: 'Organic skincare and cosmetics made with local ingredients.',
            filters: ["Beauty", "Beauty & Personal Care", "Skincare", "Makeup", "Hair Care", "Fragrance"],
            subcats: ["Skincare", "Hair Care", "Perfume", "Makeup", "Soaps", "Dental Care"]
        },
        'fashion': {
            title: '👗 Fashion & Accessories',
            desc: 'Wear your pride with locally designed apparel and accessories.',
            filters: ["Fashion", "Fashion & Accessories", "Clothing", "Bags", "Jewelry", "Footwear"],
            subcats: ["Clothing", "Bags", "Jewelry", "Footwear", "Hats", "Accessories"]
        },
        'tech': {
            title: '💻 Technology',
            desc: 'Filipino ingenuity in gadgets and tools.',
            filters: ["Technology", "Tech", "Gadgets", "Electronics", "Accessories"],
            subcats: ["Gadgets", "Cable Organizers", "Phone Cases", "Smart Devices", "Power Tools", "Audio"]
        },
        'health': {
            title: '🌿 Health & Wellness',
            desc: 'Natural remedies and wellness products.',
            filters: ["Health", "Health & Wellness", "Supplements", "Fitness", "Herbal"],
            subcats: ["Herbal Remedies", "Vitamins", "Muscle Relief", "Essential Oils", "Fitness Gear", "Wellness"]
        },
        'food': {
            title: '🍜 Food & Beverage',
            desc: 'Delicious local delicacies and pantry staples.',
            filters: ["Food", "Food & Beverage", "Snacks", "Condiments", "Beverages"],
            subcats: ["Condiments", "Snacks", "Jams", "Beverages", "Sweets", "Dried Goods"]
        },
        'arts': {
            title: '🎨 Arts & Crafts',
            desc: 'Handmade masterpieces from local artists.',
            filters: ["Arts", "Arts & Crafts", "Handmade", "Pottery", "Painting"],
            subcats: ["Pottery", "Paintings", "Jewelry", "Woodcraft", "Textile", "Sculpture"]
        },
        'education': {
            title: '📚 Education',
            desc: 'Learning materials and educational toys.',
            filters: ["Education", "Books", "Toys", "Learning", "Stationery"],
            subcats: ["Books", "Learning Kits", "Educational Toys", "Stationery", "STEM Kits", "Art Supplies"]
        }
    };

    const config = CATEGORY_CONFIG[catSlug];

    // 3. Update UI
    if (config) {
        document.title = `${config.title} – Imbento Masagana`;
        document.getElementById('breadcrumb-current').innerText = config.title;
        document.getElementById('category-title').innerText = config.title;
        document.getElementById('category-desc').innerText = config.desc;

        // Render Subcategory Chips (Visual filters)
        const subFilterContainer = document.getElementById('subcat-filters');
        if (subFilterContainer && config.subcats) {
            // Add 'All' option first, mimicking imbento-category.html style
            let html = `<div class="category-pill active" onclick="filterBySub('All')">All</div>`;
            
            // Render subcategories as pills
            html += config.subcats.map(sub => 
                `<div class="category-pill" onclick="filterBySub('${sub}')">${sub}</div>`
            ).join('');
            
            subFilterContainer.innerHTML = html;

            // Re-evaluate arrow visibility after pills are injected
            var strip = subFilterContainer.closest('.category-strip');
            if (strip && typeof updateCatArrows === 'function') {
                setTimeout(function() { updateCatArrows(strip); }, 50);
            }
        }
        
        // Pass the filter list to the render function
        // We store it globally or pass it
        window.currentCategoryFilters = config.filters;
        renderProducts(config.filters);
    } else {
        document.getElementById('category-title').innerText = 'Category Not Found';
        document.getElementById('categoryProductsGrid').innerHTML = '<p style="text-align:center; grid-column:1/-1;">Invalid category selected.</p>';
    }
});

// Helper function to render products
function renderProducts(categoryFilters, subSearch = null) {
    const container = document.getElementById("categoryProductsGrid");
    const countEl = document.getElementById("resultCount");
    const sortVal = document.getElementById("sortSelect").value;

    if (typeof productsDB === 'undefined') {
        container.innerHTML = "Error: Product database not loaded.";
        return;
    }

    // 1. Filter by Main Category
    let filtered = productsDB.filter(p => {
        // Check if product category matches any of the config filters
        // Using partial match or exact match depending on data quality
        return categoryFilters.some(f => p.category.includes(f) || f.includes(p.category));
    });

    // 2. Filter by Sub Search (if clicked a chip)
    if (subSearch) {
        // filtering by name or subtitle or specific subcat tag if data existed
        // For now, naive text search
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(subSearch.toLowerCase()) || 
            p.subtitle.toLowerCase().includes(subSearch.toLowerCase())
        );
    }

    // 3. Sort
    if (sortVal === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'newest') {
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
    } else {
        // Popularity: default or random shuffle / specific field
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    // 4. Render
    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;">No products found in this selection.</div>`;
        countEl.innerText = `Showing 0 products`;
        return;
    }

    countEl.innerText = `Showing ${filtered.length} products`;
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="if(!event.target.closest('button')) window.location='product.html?id=${product.id}'">
            <div class="product-img-wrap">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
                ${product.oldPrice ? '<div class="product-badge sale-badge">Sale</div>' : '<div class="product-badge">New</div>'}
                <button class="wishlist-btn" onclick="let e=event; e.stopPropagation(); addToWishlistWithModal({id:${product.id}, name:'${product.name.replace(/'/g, "\\'")}', price:${product.price}, image:'${product.image}'}, this); return false;">♡</button>
            </div>
            <div class="product-info">
              <div class="product-cat">${product.category}</div>
              <div class="product-name">${product.name}</div>
              <div class="product-seller"><span class="seller-name">🏪 ${product.seller ? product.seller.name : 'Local Seller'}</span><span class="seller-loc">📍 ${product.seller && product.seller.location ? product.seller.location : 'Philippines'}</span></div>
              <div class="stars">★★★★★ <span class="star-count">(${product.reviewCount || 0})</span></div>
              <div class="product-footer">
                <div>
                    <div class="price-new">₱${product.price.toLocaleString()}</div>
                    ${product.oldPrice ? `<div class="price-old">₱${product.oldPrice.toLocaleString()}</div>` : ""}
                </div>
                <button class="add-cart" onclick="let e=event; e.stopPropagation(); addToCartWithModal({id:${product.id}, name:'${product.name.replace(/'/g, "\\'")}', price:${product.price}, image:'${product.image}'}); return false;">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                </button>
              </div>
            </div>
        </div>
    `).join('');
}

// Global function to be called by sort select
window.applyCategoryFilter = function() {
    renderProducts(window.currentCategoryFilters);
}

// Global function for subcategory chips
window.filterBySub = function(sub) {
    // Visual feedback on chips
    // Remove active from all chips in the container
    const container = document.getElementById('subcat-filters');
    if(container) {
         container.querySelectorAll('.category-pill').forEach(c => c.classList.remove('active'));
    }
    // Add active to current target
    if(event && event.target) {
        event.target.classList.add('active');
    }
    
    // If sub is null or 'All', we pass null to renderProducts to clear filter
    if (sub === 'All' || sub === null) {
        sub = null;
    }

    renderProducts(window.currentCategoryFilters, sub);
}
