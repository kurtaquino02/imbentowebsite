/* ═══════════════════════════════════════════════════════════
   SELLER PAGE - FUNCTIONALITY
   Display seller details and their products
═══════════════════════════════════════════════════════════ */

let currentSeller = null;
let sellerProducts = [];
let isFollowing = false;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const sellerName = params.get('name');
    
    if (sellerName && typeof productsDB !== 'undefined') {
        // Find seller by name
        currentSeller = findSellerByName(decodeURIComponent(sellerName));
        
        if (currentSeller) {
            renderSellerProfile(currentSeller);
            renderSellerProducts(currentSeller.name);
        } else {
            showNoSeller();
        }
    } else {
        showNoSeller();
    }
    
    // Check if already following
    checkFollowStatus();
});

// ═══════ FIND SELLER ═══════

function findSellerByName(name) {
    if (typeof productsDB === 'undefined') return null;
    
    // Find a product with this seller
    const product = productsDB.find(p => p.seller && p.seller.name === name);
    return product ? product.seller : null;
}

function getProductsBySeller(sellerName) {
    if (typeof productsDB === 'undefined') return [];
    return productsDB.filter(p => p.seller && p.seller.name === sellerName);
}

// ═══════ RENDER SELLER PROFILE ═══════

function renderSellerProfile(seller) {
    // Page title
    document.title = `${seller.name} – Seller Profile | Imbento Masagana`;
    
    // Breadcrumb
    const breadcrumbSeller = document.getElementById('breadcrumb-seller');
    if (breadcrumbSeller) breadcrumbSeller.textContent = seller.name;
    
    // Avatar
    const avatar = document.getElementById('sellerAvatar');
    if (avatar) avatar.textContent = seller.avatar || seller.name.charAt(0).toUpperCase();
    
    // Name
    const nameEl = document.getElementById('sellerName');
    if (nameEl) nameEl.textContent = seller.name;
    
    // Location
    const locationEl = document.getElementById('sellerLocation');
    if (locationEl) locationEl.textContent = seller.location || 'Philippines';
    
    // Stats
    const ratingEl = document.getElementById('statRating');
    if (ratingEl) ratingEl.textContent = seller.rating ? seller.rating.toFixed(1) : '5.0';
    
    const soldEl = document.getElementById('statProductsSold');
    if (soldEl) soldEl.textContent = formatNumber(seller.productsSold || 0);
    
    const memberEl = document.getElementById('statMemberSince');
    if (memberEl) memberEl.textContent = seller.memberSince || '2020';
    
    // Count products by this seller
    const products = getProductsBySeller(seller.name);
    const totalProductsEl = document.getElementById('statTotalProducts');
    if (totalProductsEl) totalProductsEl.textContent = products.length;
    
    // Generate tagline based on top category
    const taglineEl = document.getElementById('sellerTagline');
    if (taglineEl && products.length > 0) {
        const categories = products.map(p => p.category);
        const topCategory = mode(categories) || 'Products';
        taglineEl.textContent = `Specializing in quality ${topCategory} and more`;
    }
    
    // About text
    const aboutEl = document.getElementById('sellerAbout');
    if (aboutEl) {
        aboutEl.textContent = `${seller.name} is a verified Filipino seller on Imbento Masagana, 
        based in ${seller.location || 'the Philippines'}. With ${formatNumber(seller.productsSold || 0)} products sold 
        and a ${seller.rating || 5.0}-star rating, they are committed to providing quality, 
        locally-made products that support Filipino craftsmanship and entrepreneurship. 
        Member since ${seller.memberSince || '2020'}.`;
    }
}

// ═══════ RENDER SELLER PRODUCTS ═══════

function renderSellerProducts(sellerName, filter = 'all') {
    const grid = document.getElementById('sellerProductsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (!grid) return;
    
    // Get products
    sellerProducts = getProductsBySeller(sellerName);
    
    if (sellerProducts.length === 0) {
        grid.style.display = 'none';
        if (noProducts) noProducts.style.display = 'block';
        return;
    }
    
    // Apply filter/sort
    let sortedProducts = [...sellerProducts];
    
    switch(filter) {
        case 'popular':
            sortedProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
            break;
        case 'newest':
            sortedProducts.reverse(); // Assume later IDs are newer
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // All - no sorting
            break;
    }
    
    grid.style.display = 'grid';
    if (noProducts) noProducts.style.display = 'none';
    
    grid.innerHTML = sortedProducts.map(product => `
        <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
            <div class="product-card-img">
                ${product.oldPrice ? '<div class="product-card-badges"><span class="card-badge sale">-' + Math.round((1 - product.price/product.oldPrice)*100) + '%</span></div>' : ''}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
            </div>
            <div class="product-card-info">
                <div class="product-card-cat">${product.category}</div>
                <div class="product-card-name">${product.name}</div>
                <div class="product-card-rating">
                    <span class="card-stars">${generateStars(product.stars || 5)}</span>
                    <span class="card-rating-text">(${product.reviewCount || 0})</span>
                </div>
                <div class="product-card-price">
                    <span class="card-price-main">₱${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="card-price-old">₱${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-card-actions">
                    <button class="card-btn-cart" onclick="event.stopPropagation(); addToCartFromSeller(${product.id})">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                        Add
                    </button>
                    <button class="card-btn-wishlist" onclick="event.stopPropagation(); toggleWishlistFromSeller(${product.id})">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ═══════ FILTER PRODUCTS ═══════

function filterProducts(filter) {
    // Update active button
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Re-render with filter
    if (currentSeller) {
        renderSellerProducts(currentSeller.name, filter);
    }
}

// ═══════ FOLLOW/UNFOLLOW ═══════

function toggleFollow() {
    const btn = document.getElementById('btnFollow');
    if (!btn || !currentSeller) return;
    
    isFollowing = !isFollowing;
    
    if (isFollowing) {
        btn.innerHTML = `
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            Following
        `;
        btn.classList.add('following');
        saveFollowStatus(currentSeller.name, true);
        showToast(`You are now following ${currentSeller.name}!`, 'success');
    } else {
        btn.innerHTML = `
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Follow
        `;
        btn.classList.remove('following');
        saveFollowStatus(currentSeller.name, false);
        showToast(`Unfollowed ${currentSeller.name}`, 'info');
    }
}

// Stub - Check Follow Status (Connect to API later)
function checkFollowStatus() {
    if (!currentSeller) return;
    // No data persistence in static version
}

// Stub - Save Follow Status (Connect to API later)
function saveFollowStatus(sellerName, isFollowing) {
    // No data persistence in static version
}

// ═══════ CHAT ═══════

function openChat() {
    if (!currentSeller) return;
    if(typeof showToast === 'function') {
        showToast(`Chat with ${currentSeller.name} - Coming soon!`, 'info');
    }
}

// ═══════ CART & WISHLIST ═══════

// Stub - Add to Cart from Seller (Connect to API later)
function addToCartFromSeller(productId) {
    const product = productsDB.find(p => p.id === productId);
    if (product && typeof showToast === 'function') {
        showToast(`🛒 ${product.name} added to cart!`, 'success');
    }
}

// Stub - Toggle Wishlist from Seller (Connect to API later)
function toggleWishlistFromSeller(productId) {
    const product = productsDB.find(p => p.id === productId);
    if (product && typeof showToast === 'function') {
        showToast(`❤️ ${product.name} added to wishlist!`, 'success');
    }
}

// ═══════ HELPERS ═══════

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function mode(arr) {
    const frequency = {};
    let maxFreq = 0;
    let mode = null;
    
    for (const item of arr) {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) {
            maxFreq = frequency[item];
            mode = item;
        }
    }
    
    return mode;
}

function showNoSeller() {
    const heroSection = document.querySelector('.seller-hero');
    if (heroSection) {
        heroSection.innerHTML = `
            <div class="seller-hero-inner" style="justify-content: center; text-align: center;">
                <div style="text-align: center;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                    <h1 style="font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text); margin: 0 0 12px;">Seller Not Found</h1>
                    <p style="color: var(--muted); margin: 0 0 24px;">The seller you're looking for doesn't exist or has been removed.</p>
                    <a href="featuredproducts.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: linear-gradient(135deg, var(--brand) 0%, #7C3AED 100%); color: white; text-decoration: none; border-radius: 12px; font-family: 'Syne', sans-serif; font-weight: 700;">
                        Browse Products
                    </a>
                </div>
            </div>
        `;
    }
    
    // Hide other sections
    const statsSection = document.querySelector('.seller-stats-section');
    const productsSection = document.querySelector('.seller-products-section');
    const aboutSection = document.querySelector('.seller-about-section');
    
    if (statsSection) statsSection.style.display = 'none';
    if (productsSection) productsSection.style.display = 'none';
    if (aboutSection) aboutSection.style.display = 'none';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMsg = document.getElementById('toastMsg');
    
    if (!toast) {
        // Fallback for seller page with different structure
        const msgEl = document.getElementById('toastMsg');
        if (msgEl) {
            msgEl.textContent = message;
            msgEl.className = `toast-msg ${type} show`;
            setTimeout(() => msgEl.classList.remove('show'), 3000);
        }
        return;
    }
    
    // Normalize type for compatibility
    if (type === 'green') type = 'success';
    if (type === 'red') type = 'error';
    
    if (toastIcon) {
        const typeConfig = {
            success: { icon: '✓', bg: '#10B981' },
            error: { icon: '✕', bg: '#ef4444' },
            warning: { icon: '⚠', bg: '#f59e0b' },
            info: { icon: 'ℹ', bg: '#3b82f6' },
            brand: { icon: '🛒', bg: 'var(--brand, #F43F5E)' }
        };
        const config = typeConfig[type] || typeConfig.success;
        toastIcon.textContent = config.icon;
        toastIcon.style.background = config.bg;
    }
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}
