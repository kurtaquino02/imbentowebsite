// Cart Page Specific Logic
document.addEventListener('DOMContentLoaded', () => {

    // --- Render cart table from CART_DATA ---
    renderCartTable();

    // --- Category Toggle ---
    const trigger = document.getElementById('catTrigger');
    const menu = document.getElementById('catMenu');
    
    if (trigger && menu) {
        // Remove existing onclick if any? No, we handle it here.
        // It's safer to attach via ID if the user removes inline onclick.
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // If this breaks anything, verify HTML structure
            trigger.classList.toggle('open');
            menu.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            // Check if click is outside menu and trigger
            if (!menu.contains(e.target) && !trigger.contains(e.target)) {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            }
        });
    }

    // --- Panel Navigation (Hover) ---
    const sidebarItems = document.querySelectorAll('.cat-sidebar-item');
    const panels = document.querySelectorAll('.cat-panel');

    sidebarItems.forEach(item => {
        // Handle Mouse Enter for Hover effect
        item.addEventListener('mouseenter', (e) => {
            // Get target panel ID from data attribute
            // We expect HTML to have data-panel="home" (refactored from onmouseenter="showPanel('home')")
            // Or extract from onclick if not refactored yet.
            // But we ARE refactoring HTML too.
            const targetId = item.getAttribute('data-panel');
            if (!targetId) return;

            // Remove active class from all items
            sidebarItems.forEach(el => el.classList.remove('active'));
            // Add active class to current item
            item.classList.add('active');

            // Hide all panels
            panels.forEach(p => p.classList.remove('active'));

            // Show corresponding panel
            const targetPanel = document.getElementById('panel-' + targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- Cart Toggle Integration ---
    // Make sure toggleCart is callable
    const cartBtns = document.querySelectorAll('.cart-btn, .close-cart, #cartOverlay');
    cartBtns.forEach(btn => {
        // If inline onclick exists, this listener adds another call.
        // We will remove inline onclicks in HTML refactor.
        btn.addEventListener('click', () => {
             // Use the global function from js/cart.js if available
            if (typeof window.toggleCart === 'function') {
                window.toggleCart();
            } else {
                const overlay = document.getElementById('cartOverlay');
                const sidebar = document.getElementById('cartSidebar');
                if (overlay && sidebar) {
                    overlay.classList.toggle('open');
                    sidebar.classList.toggle('open');
                    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
                }
            }
        });
    });

});

// --- Render cart table from CART_DATA ---
function renderCartTable() {
    if (typeof CART_DATA === 'undefined') return;

    // Table body
    var tbody = document.querySelector('.cart-table tbody');
    if (tbody) {
        if (!CART_DATA.items.length) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#999">Your cart is empty. <a href="featuredproducts.html" style="color:var(--brand)">Continue shopping</a></td></tr>';
        } else {
            tbody.innerHTML = CART_DATA.items.map(function(item) {
                var lineTotal = item.price * item.qty;
                return '<tr data-id="' + item.id + '">' +
                    '<td><div class="cp-info">' +
                        '<div class="cp-img"><img src="' + item.image + '" width="80" height="80" ' +
                            'style="object-fit:cover;border-radius:8px" alt="' + item.name + '" ' +
                            'onerror="this.onerror=null;this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect width=%2280%22 height=%2280%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E\'"></div>' +
                        '<div>' +
                            '<span class="cp-name">' + item.name + '</span>' +
                            '<small style="color:#999;display:block">' + item.category + '</small>' +
                            '<small style="color:#888">by ' + item.sellerName + '</small>' +
                        '</div>' +
                    '</div></td>' +
                    '<td><span class="cp-price">\u20B1' + item.price.toLocaleString() + '</span></td>' +
                    '<td><div class="cp-qty">' +
                        '<button class="qty-btn" onclick="updateItemQty(' + item.id + ',-1)">\u2212</button>' +
                        '<span id="qty-' + item.id + '">' + item.qty + '</span>' +
                        '<button class="qty-btn" onclick="updateItemQty(' + item.id + ',1)">+</button>' +
                    '</div></td>' +
                    '<td><span style="font-weight:600">\u20B1' + lineTotal.toLocaleString() + '</span></td>' +
                    '<td><button onclick="removeFromCart(' + item.id + ')" ' +
                        'style="background:none;border:none;cursor:pointer;color:#aaa;font-size:18px" ' +
                        'title="Remove">\u2715</button></td>' +
                '</tr>';
            }).join('');
        }
    }

    // Item count
    var countEl = document.getElementById('cartPageCount');
    if (countEl) {
        var count = CART_DATA.items.reduce(function(s, i) { return s + i.qty; }, 0);
        countEl.textContent = 'You have ' + count + ' item' + (count !== 1 ? 's' : '') + ' in your cart';
    }

    // Order summary
    var subtotal = CART_DATA.items.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    var discount = CART_DATA.discount || 0;
    var net      = subtotal - discount;

    var els = {
        subtotal : document.querySelector('.cart-summary .cs-row:first-child span:last-child'),
        total    : document.querySelector('.cs-total span:last-child')
    };
    if (els.subtotal) els.subtotal.textContent = '\u20B1' + net.toLocaleString();
    if (els.total)    els.total.textContent    = '\u20B1' + net.toLocaleString();
}
