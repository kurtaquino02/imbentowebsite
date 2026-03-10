/* ═══════════════════════════════════════════════════════════
   PRODUCT PAGE - FULL OVERHAUL JS
   Modern, feature-rich product detail page functionality
═══════════════════════════════════════════════════════════ */

let currentProduct = null;
let currentImageIndex = 0;
let qty = 1;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let productId = params.get('id');

    // Default to 101 if no ID or invalid
    if (!productId || !getProductById(productId)) {
        productId = 101; 
        console.warn('Product ID not found, defaulting to 101');
    }

    currentProduct = getProductById(productId);
    renderProduct(currentProduct);
    renderRelatedProducts(currentProduct);
    renderRecentlyViewed(currentProduct);
    saveToRecentlyViewed(currentProduct);
});

function renderProduct(product) {
    if (!product) return;

    // Set Title, Meta Title
    document.title = `${product.name} – Imbento Masagana`;
    
    // Breadcrumb
    const bcCategory = document.getElementById('breadcrumb-category');
    const bcProduct = document.getElementById('breadcrumb-product');
    if (bcCategory) {
        bcCategory.textContent = product.category;
        bcCategory.href = `imbento-category.html?cat=${getCategorySlug(product.category)}`;
    }
    if (bcProduct) bcProduct.textContent = product.name;

    // Gallery - Main Image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }

    // Gallery Badges
    const galleryBadges = document.getElementById('galleryBadges');
    if (galleryBadges) {
        let badgesHTML = '';
        if (product.badge) badgesHTML += `<div class="gallery-badge">${product.badge}</div>`;
        if (product.oldPrice) badgesHTML += `<div class="gallery-badge sale">-${Math.round((1 - product.price/product.oldPrice)*100)}%</div>`;
        if (product.isNew) badgesHTML += `<div class="gallery-badge new">New</div>`;
        galleryBadges.innerHTML = badgesHTML;
    }

    // Thumbnails
    const thumbRow = document.getElementById('thumbRow');
    if (thumbRow) {
        thumbRow.innerHTML = '';
        const images = product.gallery || [product.image];
        images.forEach((img, index) => {
            const isActive = index === 0 ? 'active' : '';
            const imgSrc = typeof img === 'string' && img.includes('/') ? img : product.image;
            thumbRow.innerHTML += `<div class="thumb ${isActive}" onclick="setImage(${index}, '${imgSrc}')">
                <img src="${imgSrc}" alt="Thumbnail ${index + 1}">
            </div>`;
        });
    }

    // Category Tag
    const catTag = document.getElementById('productCategoryTag');
    if (catTag) {
        catTag.innerHTML = `${getCategoryEmoji(product.category)} ${product.category}`;
        catTag.href = `imbento-category.html?cat=${getCategorySlug(product.category)}`;
    }

    // Stock Status
    const stockStatus = document.getElementById('stockStatus');
    if (stockStatus) {
        const stock = product.stock || 100;
        if (stock > 10) {
            stockStatus.className = 'stock-status in-stock';
            stockStatus.innerHTML = '<span class="stock-dot"></span><span>In Stock</span>';
        } else if (stock > 0) {
            stockStatus.className = 'stock-status low-stock';
            stockStatus.innerHTML = `<span class="stock-dot"></span><span>Only ${stock} left</span>`;
        } else {
            stockStatus.className = 'stock-status out-of-stock';
            stockStatus.innerHTML = '<span class="stock-dot"></span><span>Out of Stock</span>';
        }
    }
    
    // Title & Subtitle
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productSubtitle').textContent = product.subtitle || 'High-quality Filipino-made product crafted with care';

    // Rating Row
    const starsElement = document.getElementById('productStars');
    if (starsElement) starsElement.textContent = '★'.repeat(Math.round(product.stars)) + '☆'.repeat(5 - Math.round(product.stars));
    document.getElementById('ratingScore').textContent = product.stars;
    document.getElementById('ratingCount').textContent = `(${product.reviewCount || 0} reviews)`;
    document.getElementById('soldCount').textContent = `${product.soldCount || Math.floor(Math.random() * 500 + 50)} sold`;

    // Price
    document.getElementById('priceMain').textContent = `₱${product.price.toLocaleString()}`;
    document.getElementById('stickyPrice').textContent = `₱${product.price.toLocaleString()}`;
    
    const priceOld = document.getElementById('priceOld');
    const priceDiscount = document.getElementById('priceDiscount');
    const priceSave = document.getElementById('priceSave');
    
    if (product.oldPrice) {
        priceOld.textContent = `₱${product.oldPrice.toLocaleString()}`;
        priceOld.style.display = 'block';
        const discount = Math.round((1 - product.price/product.oldPrice) * 100);
        priceDiscount.textContent = `-${discount}%`;
        priceDiscount.style.display = 'inline-block';
        const saved = product.oldPrice - product.price;
        priceSave.textContent = `You save ₱${saved.toLocaleString()}`;
        priceSave.style.display = 'inline-block';
    } else {
        priceOld.style.display = 'none';
        priceDiscount.style.display = 'none';
        priceSave.style.display = 'none';
    }

    // Quantity Stock
    document.getElementById('qtyStock').textContent = `${product.stock || 999} pieces available`;

    // Seller Info
    if (product.seller) {
        document.getElementById('sellerAvatar').textContent = product.seller.avatar || product.seller.name.charAt(0);
        document.getElementById('sellerName').textContent = product.seller.name;
        document.getElementById('sellerLocation').textContent = `📍 ${product.seller.location || 'Philippines'}`;
        document.getElementById('sellerProducts').textContent = product.seller.productCount || '50+';
        document.getElementById('sellerFollowers').textContent = product.seller.followers || '1k+';
        document.getElementById('sellerResponseRate').textContent = `${product.seller.responseRate || 95}%`;
        document.getElementById('sellerRating').textContent = `${product.seller.rating || 4.8} rating`;
    }

    // Specifications Tab
    if (product.specs) {
        const specTable = document.getElementById('specTable');
        if (specTable) {
            specTable.innerHTML = product.specs.map(s => 
                `<div class="spec-row"><div class="spec-key">${s.key}</div><div class="spec-val">${s.val}</div></div>`
            ).join('');
        }
    }

    // Description
    if (product.description) {
        const descContent = document.getElementById('descContent');
        if (descContent) {
            descContent.innerHTML = product.description;
        }
    }

    // Highlights
    if (product.highlights) {
        const highlightsList = document.getElementById('highlightsList');
        if (highlightsList) {
            highlightsList.innerHTML = product.highlights.map(h => `<li>${h}</li>`).join('');
        }
    }

    // Reviews Summary
    document.getElementById('bigScore').textContent = product.stars;
    document.getElementById('bigCount').textContent = `Based on ${product.reviewCount || 0} reviews`;

    // Variants
    renderVariants(product);
    
    // Update Add to Cart Button
    const addBtn = document.querySelector('.btn-add-cart');
    if (addBtn) {
        addBtn.setAttribute('onclick', `addToCartWrapper(${product.id})`);
    }

    // Check wishlist status
    updateWishlistButton(product.id);
}

function renderVariants(product) {
    const variantsContainer = document.getElementById('variantsContainer');
    if (!variantsContainer) return;
    
    variantsContainer.innerHTML = '';
    
    if (product.variants && product.variants.length > 0) {
        product.variants.forEach(v => {
            const label = document.createElement('div');
            label.className = 'option-label';
            label.textContent = v.name;
            
            const row = document.createElement('div');
            row.className = 'variant-row';
            v.options.forEach((opt, idx) => {
                row.innerHTML += `<div class="variant-chip ${idx===0?'active':''}">${opt}</div>`;
            });

            variantsContainer.appendChild(label);
            variantsContainer.appendChild(row);
        });
        
        attachVariantListeners();
    }
}

function attachVariantListeners() {
    document.querySelectorAll('.variant-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const row = this.closest('.variant-row');
            row.querySelectorAll('.variant-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ═══════ IMAGE GALLERY ═══════

function setImage(index, src) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) mainImage.src = src;
    
    document.querySelectorAll('.thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    
    // Reinitialize hover zoom for new image
    initHoverZoom();
}

// ═══════ HOVER ZOOM (IN-PLACE LENS) ═══════

function initHoverZoom() {
    const imgWrap = document.getElementById('mainImgWrap');
    const mainImage = document.getElementById('mainImage');
    const lens = document.getElementById('zoomLens');
    
    if (!imgWrap || !mainImage || !lens) return;
    
    // Remove old event listeners by cloning
    const newImgWrap = imgWrap.cloneNode(true);
    imgWrap.parentNode.replaceChild(newImgWrap, imgWrap);
    
    // Get fresh references after cloning
    const wrap = document.getElementById('mainImgWrap');
    const img = document.getElementById('mainImage');
    const zoomLens = document.getElementById('zoomLens');
    
    if (!wrap || !img || !zoomLens) return;
    
    // Zoom ratio (magnification level inside lens)
    const zoomRatio = 2.5;
    
    // Mouse enter - show lens and set up background
    wrap.addEventListener('mouseenter', () => {
        // Wait for image to be loaded
        if (!img.complete || !img.naturalWidth) return;
        
        zoomLens.style.display = 'block';
        zoomLens.style.backgroundImage = `url('${img.src}')`;
    });
    
    // Mouse leave - hide lens
    wrap.addEventListener('mouseleave', () => {
        zoomLens.style.display = 'none';
    });
    
    // Mouse move - position lens and update magnified view inside lens
    wrap.addEventListener('mousemove', (e) => {
        if (!img.complete || !img.naturalWidth) return;
        
        const rect = wrap.getBoundingClientRect();
        
        // Cursor position relative to the container
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Lens dimensions
        const lensW = zoomLens.offsetWidth;
        const lensH = zoomLens.offsetHeight;
        const lensRadius = lensW / 2;
        
        // Position the lens centered on cursor
        let lensX = x - lensRadius;
        let lensY = y - lensRadius;
        
        // Allow lens to follow cursor freely within container
        zoomLens.style.left = lensX + 'px';
        zoomLens.style.top = lensY + 'px';
        
        // Calculate the zoomed background size
        const bgWidth = rect.width * zoomRatio;
        const bgHeight = rect.height * zoomRatio;
        
        // Calculate background position to show zoomed area centered in lens
        // Map cursor position to background position
        const bgX = -(x * zoomRatio - lensRadius);
        const bgY = -(y * zoomRatio - lensRadius);
        
        zoomLens.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        zoomLens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    });
}

// Initialize hover zoom on page load
document.addEventListener('DOMContentLoaded', () => {
    // Delay to ensure images are loaded
    setTimeout(initHoverZoom, 500);
});

// ═══════ QUANTITY ═══════

function changeQty(d) {
    const qtyInput = document.getElementById('qty');
    qty = Math.max(1, parseInt(qtyInput.value) + d);
    qtyInput.value = qty;
}

function validateQty() {
    const qtyInput = document.getElementById('qty');
    qty = Math.max(1, parseInt(qtyInput.value) || 1);
    qtyInput.value = qty;
}

// ═══════ TABS ═══════

function showTab(id, btn) {
    // For product details tabs (description, specs)
    const container = btn.closest('.details-tabs');
    if (container) {
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        container.querySelectorAll('.tab-nav button').forEach(b => b.classList.remove('active'));
        container.querySelector('#tab-' + id).classList.add('active');
        btn.classList.add('active');
    }
}

function showReviewTab(id, btn) {
    // For reviews/Q&A tabs
    const container = btn.closest('.reviews-qna-tabs');
    if (container) {
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        container.querySelectorAll('.tab-nav button').forEach(b => b.classList.remove('active'));
        container.querySelector('#tab-' + id).classList.add('active');
        btn.classList.add('active');
    }
}

// ═══════ CART ═══════

function addToCartWrapper(id) {
    const product = id ? getProductById(id) : currentProduct;
    if (!product) return;
    
    // Get active variants
    let variants = [];
    document.querySelectorAll('.variant-row').forEach(row => {
        const active = row.querySelector('.active');
        if (active) variants.push(active.textContent);
    });

    const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty,
        subtitle: variants.join(', ')
    };

    // Use global addToCart from cart.js
    if (typeof addToCart === 'function') {
        addToCart(item, true);
        showToast(`🛒 ${product.name} added to cart!`, 'success');
    } else if (typeof addToCartWithModal === 'function') {
        addToCartWithModal(item);
    } else {
        console.error('Cart logic not loaded');
    }
}

// ═══════ WISHLIST ═══════

function toggleWishlistProduct() {
    if (!currentProduct) return;
    
    const btn = document.getElementById('wishlistToggle');
    const isInWishlist = btn.classList.contains('active');
    
    if (isInWishlist) {
        btn.classList.remove('active');
        if(typeof showToast === 'function') {
            showToast('❤️ Removed from wishlist', 'info');
        }
    } else {
        btn.classList.add('active');
        if(typeof showToast === 'function') {
            showToast('❤️ Added to wishlist!', 'success');
        }
    }
}

function updateWishlistButton(productId) {
    const btn = document.getElementById('wishlistToggle');
    if (!btn) return;
    // No data loading, just visual toggle
}

// Stub - Add to Wishlist (Connect to API later)
function addToWishlist(product) {
    if(typeof showToast === 'function') {
        showToast('❤️ Added to wishlist!', 'success');
    }
}

// Stub - Remove from Wishlist (Connect to API later)
function removeFromWishlist(productId) {
    if(typeof showToast === 'function') {
        showToast('❤️ Removed from wishlist', 'info');
    }
}

// ═══════ SOCIAL SHARING ═══════

function shareProduct(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentProduct?.name || document.title);
    
    let shareUrl = '';
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyProductLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('📋 Link copied to clipboard!', 'success');
    });
}

// ═══════ SELLER ACTIONS ═══════

function visitSellerPage() {
    if (currentProduct && currentProduct.seller) {
        const sellerName = encodeURIComponent(currentProduct.seller.name);
        window.location.href = `seller.html?name=${sellerName}`;
    }
}

function followSeller() {
    showToast('✅ Following seller! You\'ll get updates on new products.', 'success');
}

function chatSeller() {
    showToast('💬 Chat feature coming soon!', 'info');
}

// ═══════ Q&A ═══════

function submitQuestion() {
    const input = document.getElementById('questionInput');
    if (!input || !input.value.trim()) {
        showToast('Please enter a question', 'warning');
        return;
    }
    
    showToast('✅ Question submitted! Seller will respond soon.', 'success');
    input.value = '';
}

// ═══════ REVIEWS ═══════

function loadMoreReviews() {
    showToast('Loading more reviews...', 'info');
    // In a real app, this would fetch more reviews from API
}

// ═══════ RELATED PRODUCTS ═══════

function renderRelatedProducts(product) {
    const grid = document.getElementById('relatedGrid');
    if (!grid || typeof productsDB === 'undefined') return;
    
    // Get products from same category, excluding current
    const related = productsDB
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 5);
    
    if (related.length === 0) {
        // Fallback to random products
        const random = productsDB.filter(p => p.id !== product.id).slice(0, 5);
        renderProductGrid(grid, random);
    } else {
        renderProductGrid(grid, related);
    }
}

function renderRecentlyViewed(currentProduct) {
    // Stub - Recently viewed section hidden on static site
    // Connect to API to track recently viewed on dynamic site
    const section = document.querySelector('.recently-viewed-section') || document.querySelector('.recently-viewed section');
    if (section) section.style.display = 'none';
}

// Stub - Track Recently Viewed (Connect to API later)
function saveToRecentlyViewed(product) {
    // No data persistence in static version
}

function renderProductGrid(container, products) {
    container.innerHTML = products.map(p => `
        <div class="related-card" onclick="window.location='product.html?id=${p.id}'">
            <div class="related-img">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
            </div>
            <div class="related-info">
                <div class="related-cat">${p.category}</div>
                <div class="related-name">${p.name}</div>
                <div class="related-price-row">
                    <div class="related-price">₱${p.price.toLocaleString()}</div>
                    ${p.oldPrice ? `<div class="related-price-old">₱${p.oldPrice.toLocaleString()}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ═══════ HELPERS ═══════

function getCategoryEmoji(cat) {
    const emojiMap = {
        'Healthcare': '💪', 'Fitness': '💪',
        'Pet': '🐾',
        'Eco': '🌱', 'Natural': '🌱',
        'Fashion': '👗', 'Apparel': '👗',
        'Food': '🍜',
        'Home': '🏠', 'Decor': '🏠',
        'Beauty': '💄', 'Personal Care': '💄',
        'Tools': '🔧',
        'Tech': '💻', 'Technologies': '💻',
        'Services': '🎁', 'Gift': '🎁'
    };
    
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (cat.includes(key)) return emoji;
    }
    return '📦';
}

function getCategorySlug(cat) {
    const slugMap = {
        'Healthcare': 'healthcare', 'Fitness': 'healthcare',
        'Pet': 'pets',
        'Eco': 'eco', 'Natural': 'eco',
        'Fashion': 'fashion', 'Apparel': 'fashion',
        'Food': 'food',
        'Home': 'home', 'Decor': 'home',
        'Beauty': 'beauty', 'Personal Care': 'beauty',
        'Tools': 'tools',
        'Tech': 'tech', 'Technologies': 'tech',
        'Services': 'services', 'Gift': 'services'
    };
    
    for (const [key, slug] of Object.entries(slugMap)) {
        if (cat.includes(key)) return slug;
    }
    return 'all';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMsg = document.getElementById('toastMsg');
    
    if (!toast || !toastMsg) return;
    
    // Normalize type for compatibility
    if (type === 'green') type = 'success';
    if (type === 'red') type = 'error';
    
    const typeConfig = {
        success: { icon: '✓', bg: '#10B981' },
        error: { icon: '✕', bg: '#ef4444' },
        warning: { icon: '⚠', bg: '#f59e0b' },
        info: { icon: 'ℹ', bg: '#3b82f6' },
        brand: { icon: '🛒', bg: 'var(--brand, #F43F5E)' }
    };
    
    const config = typeConfig[type] || typeConfig.success;
    
    if (toastIcon) {
        toastIcon.textContent = config.icon;
        toastIcon.style.background = config.bg;
    }
    toastMsg.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}
