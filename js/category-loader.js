document.addEventListener("DOMContentLoaded", () => {
    renderCategoryPage();
});

function renderCategoryPage() {
    const container = document.getElementById("categoryProductsGrid");
    const countEl = document.getElementById("resultCount");
    const sortSelect = document.getElementById("sortSelect");

    // Get categories from a global variable or data attribute
    // We expect window.PAGE_CATEGORIES to be defined in the HTML file before this script
    // Example: window.PAGE_CATEGORIES = ["Home & Decor", "Furniture"];
    if (typeof window.PAGE_CATEGORIES === 'undefined' || !window.PAGE_CATEGORIES) {
        console.error("PAGE_CATEGORIES not defined");
        return;
    }

    const filterFn = p => window.PAGE_CATEGORIES.some(cat => 
        p.category === cat || p.category.includes(cat)
    );
    
    if (typeof productsDB === 'undefined') {
        container.innerHTML = "Error loading products.";
        return;
    }
    
    let filtered = productsDB.filter(filterFn);
    
    // Sorting
    if (sortSelect) {
        const value = sortSelect.value;
        if (value === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (value === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (value === 'newest') {
             // Assuming higher ID is newer for now, or if there's a date field
             filtered.sort((a, b) => b.id - a.id);
        } else if (value === 'popular') {
             filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        }
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;">No products found in this category.</div>`;
        if (countEl) countEl.innerText = `Showing 0 products`;
        return;
    }

    if (countEl) countEl.innerText = `Showing ${filtered.length} products`;
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card" style="cursor:pointer">
            <a href="product.html?id=${product.id}" style="display:contents;text-decoration:none;color:inherit;"></a>
            <div class="product-img" onclick="if(!event.target.closest('button')) window.location='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
                ${product.oldPrice ? "<div class=\"product-badge\" style=\"background:var(--error);\">Sale</div>" : "<div class=\"product-badge\">New</div>"}
                 <button class="wishlist-btn" onclick="let e=event; e.stopPropagation(); addToWishlistWithModal({id:${product.id}, name:'${product.name.replace(/'/g, "\\'")}', price:${product.price}, image:'${product.image}'}, this); return false;">♡</button>
            </div>
            <div class="product-info" onclick="if(!event.target.closest('button')) window.location='product.html?id=${product.id}'" style="cursor:pointer">
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
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                </button>
              </div>
            </div>
        </div>
    `).join("");
    
    if (typeof checkWishlistStatus === 'function') {
        checkWishlistStatus();
    }
}
