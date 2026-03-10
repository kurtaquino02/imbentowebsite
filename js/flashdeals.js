/* flashdeals.js - Flash Deals Page Functionality */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize countdown timer
    initCountdown();
    
    // Render flash deal products
    renderFlashDeals();
    
    // Initialize category filter
    initCategoryFilter();
    
    // Update deal stats
    updateDealStats();
});

/* ═══ COUNTDOWN TIMER ═══ */
function initCountdown() {
    // Set deal end time to midnight tonight (end of current day)
    function getMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(23, 59, 59, 999);
        return midnight;
    }
    
    let endTime = getMidnight();
    
    function updateTimer() {
        const now = new Date();
        let diff = endTime - now;
        
        // If timer expired, reset to next midnight
        if (diff <= 0) {
            endTime = getMidnight();
            endTime.setDate(endTime.getDate() + 1);
            diff = endTime - now;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById("countdown-hours");
        const minutesEl = document.getElementById("countdown-minutes");
        const secondsEl = document.getElementById("countdown-seconds");
        
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, "0");
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, "0");
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ═══ CATEGORY FILTER ═══ */
function initCategoryFilter() {
    const pills = document.querySelectorAll(".category-strip .category-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", function() {
            const catId = this.getAttribute("data-category");
            filterCategory(catId, this);
        });
    });
}

function filterCategory(catId, clickedPill) {
    // Update active pill
    document.querySelectorAll(".category-strip .category-pill").forEach(p => p.classList.remove("active"));
    if (clickedPill) clickedPill.classList.add("active");
    
    // Show/hide sections
    const sections = document.querySelectorAll(".category-section");
    sections.forEach(section => {
        const sectionCat = section.getAttribute("data-category");
        if (catId === "all" || sectionCat === catId) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}

// Normalize category name to match pill data-category values
function normalizeCategory(cat) {
    if (!cat) return "other";
    const lower = cat.toLowerCase();
    
    if (lower.includes("home") || lower.includes("decor") || lower.includes("lighting") || lower.includes("organization") || lower.includes("cleaning")) {
        return "home";
    }
    if (lower.includes("beauty")) return "beauty";
    if (lower.includes("fashion")) return "fashion";
    if (lower.includes("tech")) return "tech";
    if (lower.includes("health") || lower.includes("wellness")) return "health";
    if (lower.includes("food") || lower.includes("beverage")) return "food";
    if (lower.includes("art") || lower.includes("craft")) return "arts";
    if (lower.includes("edu") || lower.includes("book")) return "education";
    
    return "other";
}

/* ═══ RENDER FLASH DEALS ═══ */
function renderFlashDeals() {
    // Get products that have oldPrice (means they are on sale)
    if (typeof productsDB === "undefined") {
        console.warn("productsDB not available");
        return;
    }
    
    const saleProducts = productsDB.filter(p => p.oldPrice && p.oldPrice > p.price);
    
    // Group by normalized category
    const categories = {};
    saleProducts.forEach(p => {
        const normalizedCat = normalizeCategory(p.category);
        if (!categories[normalizedCat]) categories[normalizedCat] = [];
        categories[normalizedCat].push(p);
    });
    
    const container = document.getElementById("flash-products-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Category display names and icons
    const catInfo = {
        "home": { emoji: "🏠", name: "Home & Living Deals" },
        "fashion": { emoji: "👗", name: "Fashion Deals" },
        "tech": { emoji: "📱", name: "Tech Deals" },
        "beauty": { emoji: "💄", name: "Beauty Deals" },
        "health": { emoji: "💪", name: "Health & Fitness Deals" },
        "food": { emoji: "🍜", name: "Food & Grocery Deals" },
        "arts": { emoji: "🎨", name: "Arts & Crafts Deals" },
        "education": { emoji: "📚", name: "Education & Books Deals" },
        "other": { emoji: "🎁", name: "Featured Deals" }
    };
    
    // Render each category section
    Object.keys(categories).forEach(cat => {
        const products = categories[cat];
        const info = catInfo[cat] || { emoji: "🎁", name: "Featured Deals" };
        
        const section = document.createElement("section");
        section.className = "category-section";
        section.setAttribute("data-category", cat);
        
        section.innerHTML = `
            <h2 class="category-title">
                <span class="cat-emoji">${info.emoji}</span>
                ${info.name}
                <span class="deal-count">${products.length} deals</span>
            </h2>
            <div class="flash-product-grid">
                ${products.map(p => renderProductCard(p)).join("")}
            </div>
        `;
        
        container.appendChild(section);
    });
    
    // If no sale products, show message
    if (saleProducts.length === 0) {
        container.innerHTML = `
            <div class="no-deals">
                <div class="no-deals-icon">⚡</div>
                <h3>Flash Deals Coming Soon!</h3>
                <p>Check back later for amazing deals.</p>
            </div>
        `;
    }
    
    // Bind cart and wishlist buttons
    bindProductActions();
}

function renderProductCard(product) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    const stock = Math.floor(Math.random() * 60) + 20; // Random stock 20-80%
    
    return `
        <div class="flash-product-card" data-id="${product.id}">
            <div class="flash-product-img">
                <img src="${product.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
                <span class="flash-discount-badge">-${discount}%</span>
                <button class="flash-wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                    🤍
                </button>
            </div>
            <div class="flash-product-info">
                <div class="flash-product-cat">${product.category || "Sale"}</div>
                <h3 class="flash-product-name">${product.name}</h3>
                <div class="flash-product-seller">by ${product.seller || "Imbento Seller"}</div>
                <div class="stock-progress">
                    <div class="stock-bar">
                        <div class="stock-fill" style="width: ${stock}%;"></div>
                    </div>
                    <span class="stock-text">${stock < 30 ? "Almost gone!" : "Selling fast!"}</span>
                </div>
                <div class="flash-product-footer">
                    <div class="flash-price-wrap">
                        <span class="flash-price-old">₱${product.oldPrice.toLocaleString()}</span>
                        <span class="flash-price-new">₱${product.price.toLocaleString()}</span>
                    </div>
                    <button class="flash-add-cart" data-product-id="${product.id}" title="Add to Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function bindProductActions() {
    // Add to cart
    document.querySelectorAll(".flash-add-cart").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute("data-product-id"));
            if (typeof addToCart === "function") {
                addToCart(productId);
            } else {
                console.log("Added to cart:", productId);
            }
        });
    });
    
    // Add to wishlist
    document.querySelectorAll(".flash-wishlist-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute("data-product-id"));
            
            // Toggle heart
            if (this.textContent.trim() === "🤍") {
                this.textContent = "❤️";
                if (typeof addToWishlist === "function") {
                    addToWishlist(productId);
                }
            } else {
                this.textContent = "🤍";
                if (typeof removeFromWishlist === "function") {
                    removeFromWishlist(productId);
                }
            }
        });
    });
    
    // Product card click
    document.querySelectorAll(".flash-product-card").forEach(card => {
        card.addEventListener("click", function() {
            const productId = this.getAttribute("data-id");
            window.location.href = `product.html?id=${productId}`;
        });
    });
}

/* ═══ DEAL STATS ═══ */
function updateDealStats() {
    if (typeof productsDB === "undefined") return;
    
    const saleProducts = productsDB.filter(p => p.oldPrice && p.oldPrice > p.price);
    const totalSavings = saleProducts.reduce((sum, p) => sum + (p.oldPrice - p.price), 0);
    const maxDiscount = Math.max(...saleProducts.map(p => Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)));
    
    const dealsCountEl = document.getElementById("stat-deals-count");
    const savingsEl = document.getElementById("stat-max-savings");
    const discountEl = document.getElementById("stat-max-discount");
    
    if (dealsCountEl) dealsCountEl.textContent = saleProducts.length;
    if (savingsEl) savingsEl.textContent = "₱" + totalSavings.toLocaleString();
    if (discountEl) discountEl.textContent = maxDiscount + "% OFF";
}