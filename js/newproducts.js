/* imbento-category.js - Category Page Logic with Pagination */

let currentPage = 1;
let currentCategory = "all";
let filteredProducts = [];

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get("cat") || "all";
    currentPage = parseInt(urlParams.get("page")) || 1;
    
    // Set active category in sidebar and pills
    setActiveCategory(currentCategory);
    
    // Render products
    applyCategoryFilter(currentCategory);
});

function setActiveCategory(category) {
    // Reset all active states
    document.querySelectorAll(".category-pill, .sidebar-item").forEach(el => {
        el.classList.remove("active");
    });
    
    // Set active pill
    document.querySelectorAll(".category-pill").forEach(p => {
        const clickAttr = p.getAttribute("onclick") || "";
        if (category === "all" && clickAttr.includes("'all'")) {
            p.classList.add("active");
        } else if (category !== "all" && clickAttr.includes("'cat-" + category + "'")) {
            p.classList.add("active");
        }
    });
    
    // Set active sidebar item
    document.querySelectorAll(".sidebar-item").forEach(item => {
        const clickAttr = item.getAttribute("onclick") || "";
        if (category === "all" && clickAttr.includes("'all'")) {
            item.classList.add("active");
        } else if (category !== "all" && clickAttr.includes("'cat-" + category + "'")) {
            item.classList.add("active");
        }
    });
}

function filterCategory(catId, element) {
    const cat = catId === "all" ? "all" : catId.replace("cat-", "");
    currentCategory = cat;
    currentPage = 1; // Reset to page 1 when changing category
    
    // Update URL without reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("cat", cat);
    newUrl.searchParams.delete("page");
    window.history.pushState({}, "", newUrl);
    
    // Set active states
    setActiveCategory(cat);
    
    // Render products
    applyCategoryFilter(cat);
}

function getProductsPerPage(category) {
    return category === "all" ? 12 : 8;
}

function applyCategoryFilter(category) {
    const container = document.getElementById("categoryProductsGrid");
    const countEl = document.getElementById("resultCount");
    const titleEl = document.querySelector(".page-title");
    const breadcrumbSpan = document.querySelector(".breadcrumb span");
    
    if (!container) {
        console.error("Product container not found");
        return;
    }
    
    // Check if products data exists
    if (typeof productsDB === "undefined") {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#6b7280;">Loading products...</div>';
        return;
    }
    
    // Determine filter and title
    let filterFn = () => true;
    let title = "New Arrivals";
    
    if (category === "all") {
        filterFn = () => true;
        title = "New Arrivals";
    } else if (category === "home") {
        filterFn = p => ["Home & Decor", "Home Decor", "Lighting", "Organization", "Cleaning", "Home"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Home & Decor";
    } else if (category === "beauty") {
        filterFn = p => ["Beauty", "Personal Care", "Skin Care", "Skincare"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Beauty & Personal Care";
    } else if (category === "fashion") {
        filterFn = p => ["Fashion", "Accessories", "Clothing", "Apparel"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Fashion & Accessories";
    } else if (category === "tech") {
        filterFn = p => ["Technology", "Tech", "Electronics", "Gadgets"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Technology";
    } else if (category === "health") {
        filterFn = p => ["Health", "Wellness", "Fitness", "Herbal"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Health & Wellness";
    } else if (category === "food") {
        filterFn = p => ["Food", "Beverage", "Snacks", "Drinks", "Delicacy"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Food & Beverage";
    } else if (category === "arts" || category === "art") {
        filterFn = p => ["Art", "Arts", "Crafts", "Handmade", "Pottery", "Woodcraft"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Arts & Crafts";
    } else if (category === "education" || category === "edu") {
        filterFn = p => ["Education", "Books", "Learning", "School", "STEM"].some(c => 
            p.category && p.category.toLowerCase().includes(c.toLowerCase())
        );
        title = "Education";
    }
    
    // Update page title and breadcrumb
    if (titleEl) titleEl.textContent = title;
    if (breadcrumbSpan) breadcrumbSpan.textContent = title;
    
    // Filter and sort products
    filteredProducts = productsDB.filter(filterFn);
    
    // Apply sorting
    const sortSelect = document.getElementById("sortSelect");
    const sortValue = sortSelect ? sortSelect.value : "newest";
    
    if (sortValue === "newest") {
        filteredProducts.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortValue === "popular") {
        filteredProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortValue === "price-low") {
        filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortValue === "price-high") {
        filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    // Pagination
    const perPage = getProductsPerPage(category);
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    
    // Ensure current page is valid
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages || 1;
    
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update result count
    if (countEl) {
        const showingStart = startIndex + 1;
        const showingEnd = Math.min(endIndex, filteredProducts.length);
        countEl.innerHTML = 'Showing <strong>' + showingStart + '-' + showingEnd + '</strong> of <strong>' + filteredProducts.length + '</strong> products';
    }
    
    // Render products
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;"><div style="font-size:48px;margin-bottom:16px;">No products found</div><p style="color:#6b7280;font-size:14px;">Try selecting a different category.</p></div>';
        removePagination();
        return;
    }
    
    container.innerHTML = paginatedProducts.map(function(product) {
        var productName = product.name ? product.name.replace(/'/g, "\\'") : "Product";
        var sellerName = product.seller && product.seller.name ? product.seller.name : "Local Seller";
        var sellerLoc = product.seller && product.seller.location ? product.seller.location : "Philippines";
        var badgeHtml = product.oldPrice ? '<div class="product-badge" style="background:var(--error);">Sale</div>' : '<div class="product-badge">New</div>';
        var oldPriceHtml = product.oldPrice ? '<div class="price-old">P' + product.oldPrice.toLocaleString() + '</div>' : '';
        
        return '<div class="product-card" style="cursor:pointer">' +
            '<div class="product-img" onclick="if(!event.target.closest(\'button\')) window.location=\'product.html?id=' + product.id + '\'">' +
                '<img src="' + (product.image || 'placeholder.jpg') + '" alt="' + product.name + '" style="width:100%; height:100%; object-fit:cover;">' +
                badgeHtml +
                '<button class="wishlist-btn" onclick="event.stopPropagation(); addToWishlistWithModal({id:' + product.id + ', name:\'' + productName + '\', price:' + product.price + ', image:\'' + product.image + '\'}, this); return false;">&#9825;</button>' +
            '</div>' +
            '<div class="product-info" onclick="if(!event.target.closest(\'button\')) window.location=\'product.html?id=' + product.id + '\'" style="cursor:pointer">' +
                '<div class="product-cat">' + (product.category || "General") + '</div>' +
                '<div class="product-name">' + product.name + '</div>' +
                '<div class="product-seller"><span class="seller-name">Store: ' + sellerName + '</span><span class="seller-loc"> - ' + sellerLoc + '</span></div>' +
                '<div class="stars">★★★★★ <span class="star-count">(' + (product.reviewCount || 0) + ')</span></div>' +
                '<div class="product-footer">' +
                    '<div>' +
                        '<div class="price-new">P' + (product.price || 0).toLocaleString() + '</div>' +
                        oldPriceHtml +
                    '</div>' +
                    '<button class="add-cart" onclick="event.stopPropagation(); addToCartWithModal({id:' + product.id + ', name:\'' + productName + '\', price:' + product.price + ', image:\'' + product.image + '\'}); return false;">' +
                        '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join("");
    
    // Render pagination
    renderPagination(totalPages);
    
    // Re-check wishlist status
    if (typeof checkWishlistStatus === "function") {
        checkWishlistStatus();
    }
}

function renderPagination(totalPages) {
    // Remove existing pagination
    removePagination();
    
    if (totalPages <= 1) return;
    
    const mainGrid = document.querySelector(".main-grid");
    if (!mainGrid) return;
    
    const paginationHtml = '<div class="pagination" id="pagination">' +
        '<button class="page-btn page-prev" onclick="goToPage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>&laquo; Prev</button>' +
        '<div class="page-numbers">' + generatePageNumbers(totalPages) + '</div>' +
        '<button class="page-btn page-next" onclick="goToPage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>Next &raquo;</button>' +
    '</div>';
    
    mainGrid.insertAdjacentHTML("beforeend", paginationHtml);
}

function generatePageNumbers(totalPages) {
    let html = '';
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // First page
    if (startPage > 1) {
        html += '<button class="page-num" onclick="goToPage(1)">1</button>';
        if (startPage > 2) {
            html += '<span class="page-dots">...</span>';
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        html += '<button class="page-num' + (i === currentPage ? ' active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += '<span class="page-dots">...</span>';
        }
        html += '<button class="page-num" onclick="goToPage(' + totalPages + ')">' + totalPages + '</button>';
    }
    
    return html;
}

function removePagination() {
    const existing = document.getElementById("pagination");
    if (existing) existing.remove();
}

function goToPage(page) {
    const perPage = getProductsPerPage(currentCategory);
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    
    // Update URL
    const newUrl = new URL(window.location);
    if (page === 1) {
        newUrl.searchParams.delete("page");
    } else {
        newUrl.searchParams.set("page", page);
    }
    window.history.pushState({}, "", newUrl);
    
    // Re-render
    applyCategoryFilter(currentCategory);
    
    // Scroll to top of products
    const filterBar = document.querySelector(".filter-bar");
    if (filterBar) {
        filterBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Called when sort dropdown changes
function renderCategoryPage() {
    currentPage = 1; // Reset to page 1 when sorting changes
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get("cat") || "all";
    applyCategoryFilter(currentCategory);
}