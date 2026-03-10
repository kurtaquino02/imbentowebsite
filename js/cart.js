// ═══════════════════════════════════════════════════════════════
// STATIC WEBSITE CART (No Data Persistence)
// Connect to API backend when transitioning to dynamic website
// Data source: js/cart-data.js  →  CART_DATA
// ═══════════════════════════════════════════════════════════════

// --- Helpers ---

function _cartTotals() {
    if (typeof CART_DATA === 'undefined') return { count: 0, subtotal: 0 };
    var count    = CART_DATA.items.reduce(function(s, i) { return s + i.qty; }, 0);
    var subtotal = CART_DATA.items.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    return { count: count, subtotal: subtotal - (CART_DATA.discount || 0) };
}

function _placeholderImg() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Crect width='70' height='70' fill='%23f3f4f6'/%3E%3Ctext x='35' y='44' text-anchor='middle' font-size='26'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E";
}

// Render sidebar cart from CART_DATA
function renderCartSidebar() {
    var container  = document.getElementById('cartItemsContainer');
    var countEl    = document.getElementById('cartCountHeader');
    var subtotalEl = document.getElementById('cartSubtotal');
    var badges     = document.querySelectorAll('.cart-badge');
    var totals     = _cartTotals();

    if (countEl)    countEl.textContent    = totals.count;
    if (subtotalEl) subtotalEl.textContent = '\u20B1' + totals.subtotal.toLocaleString();
    badges.forEach(function(b) { b.textContent = totals.count; });

    if (!container) return;

    if (!CART_DATA.items.length) {
        container.innerHTML = '<div style="padding:32px;text-align:center;color:#999">Your cart is empty.</div>';
        return;
    }

    container.innerHTML = CART_DATA.items.map(function(item) {
        return '<div class="cart-item" data-id="' + item.id + '">' +
            '<img src="' + item.image + '" alt="' + item.name + '" ' +
                'onerror="this.onerror=null;this.src=\'' + _placeholderImg() + '\'">' +
            '<div class="cart-item-details">' +
                '<span class="cart-item-title">' + item.name + '</span>' +
                '<span class="cart-item-price">\u20B1' + item.price.toLocaleString() + '</span>' +
                '<div class="cart-item-qty">' +
                    '<button class="qty-btn" onclick="updateItemQty(' + item.id + ',-1)">\u2212</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button class="qty-btn" onclick="updateItemQty(' + item.id + ',1)">+</button>' +
                    '<button onclick="removeFromCart(' + item.id + ')" ' +
                        'style="margin-left:auto;background:none;border:none;cursor:pointer;color:#aaa;font-size:16px" ' +
                        'title="Remove">\u2715</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof CART_DATA !== 'undefined') renderCartSidebar();
});

// --- Toggle Sidebar UI ---
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (overlay && sidebar) {
        overlay.classList.toggle('open');
        sidebar.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    }
}

// Stub - Update Qty (Connect to API later)
function updateItemQty(id, change) {
    if(typeof showToast === 'function') {
        showToast('Item quantity updated', 'info');
    }
}

// Stub - Remove Item (Connect to API later)
function removeFromCart(id) {
    if(typeof showToast === 'function') {
        showToast('Item removed from cart', 'info');
    }
}

// Stub - Add Item (Connect to API later)
function addToCart(product, openSidebar = false) {
    if(typeof showToast === 'function') {
        const name = product?.name || 'Item';
        showToast('🛒 Added to Cart: ' + name, 'success');
    }
    
    if(openSidebar) {
        toggleCart();
    }
}

// Stub - Apply Promo Code (Connect to API later)
function applyPromo() {
    const input = document.getElementById('promoInput') || document.querySelector('.promo-box input');
    if(input && input.value) {
        if(typeof showToast === 'function') {
            showToast('Promo code "' + input.value + '" received!', 'info');
        }
    } else {
        if(typeof showToast === 'function') {
            showToast('Please enter a promo code', 'warning');
        }
    }
}

// Global Toast Helper
if (typeof showToast !== 'function') {
    window.showToast = function(msg, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toastIcon');
        const msgEl = document.getElementById('toastMsg');
        if (!toast) return;
        
        // Normalize type for compatibility
        if (type === 'green') type = 'success';
        if (type === 'red') type = 'error';
        
        if(icon) {
            icon.className = 'toast-icon ' + type;
            // Set icon and background based on type
            const typeConfig = {
                success: { icon: '✓', bg: '#10B981' },
                error: { icon: '✕', bg: '#ef4444' },
                warning: { icon: '⚠', bg: '#f59e0b' },
                info: { icon: 'ℹ', bg: '#3b82f6' },
                brand: { icon: '🛒', bg: 'var(--brand, #F43F5E)' }
            };
            const config = typeConfig[type] || typeConfig.success;
            icon.textContent = config.icon;
            icon.style.background = config.bg;
        }
        if(msgEl) msgEl.textContent = msg;
        
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
    };
}
