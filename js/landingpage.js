// Stub for Add to Cart - Connect to API later
// Accepts: product object OR product ID (for Laravel migration)
function addToCartWithModal(product) {
    // Handle both object and ID for backward compatibility during migration
    if (typeof product === 'number' || typeof product === 'string') {
        const productId = product;
        if (typeof showToast === 'function') {
            showToast('✔️ Item added to cart', 'success');
        } else {
            alert('Item added to cart');
        }
        // When using Laravel API:
        // fetch('/api/cart/add', { method: 'POST', body: JSON.stringify({product_id: productId}) })
        return;
    }

    if (typeof showToast === 'function') {
        showToast('✔️ Item added to cart', 'success');
    } else {
        alert('Item added to cart');
    }
}

// Stub for Add to Wishlist - Connect to API later
// Accepts: product object OR product ID (for Laravel migration)
function addToWishlistWithModal(product, btnElement) {
    let productName = 'Item';
    
    // Handle both object and ID for backward compatibility during migration
    if (typeof product === 'number' || typeof product === 'string') {
        const productId = product;
        const prod = productsDB.find(p => p.id == productId);
        productName = prod ? prod.name : 'Item';
        // When using Laravel API:
        // fetch('/api/wishlist/add', { method: 'POST', body: JSON.stringify({product_id: productId}) })
    } else if (product && product.name) {
        productName = product.name;
    }
    
    if (typeof showToast === 'function') {
        showToast('❤️ Added to Wishlist: ' + productName, 'success');
    } else {
        alert('Added to Wishlist!');
    }
    
    // Visual feedback only
    if(btnElement) {
        btnElement.style.color = '#F43F5E';
        btnElement.style.borderColor = '#F43F5E';
        btnElement.style.backgroundColor = '#FFF1F2';
        btnElement.innerHTML = '❤️';
    }
}

function closeCartModal() {
    document.getElementById('addToCartModal').classList.remove('active');
}

function closeWishlistModal() {
    document.getElementById('addToWishlistModal').classList.remove('active');
}

// Close modal when clicking outside
const cartModal = document.getElementById('addToCartModal');
if(cartModal){
    cartModal.addEventListener('click', function(e) {
        if (e.target === this) closeCartModal();
    });
}

const wishlistModal = document.getElementById('addToWishlistModal');
if(wishlistModal){
    wishlistModal.addEventListener('click', function(e) {
        if (e.target === this) closeWishlistModal();
    });
}

function toggleCat() {
    const trigger = document.getElementById('catTrigger');
    const menu = document.getElementById('catMenu');
    trigger.classList.toggle('open');
    menu.classList.toggle('open');
}

function showPanel(id) {
    document.querySelectorAll('.cat-sidebar-item').forEach(el => el.classList.remove('active'));
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
    document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + id).classList.add('active');
}

document.addEventListener('click', function(e) {
    const wrap = document.querySelector('.cat-dropdown-wrap');
    if (wrap && !wrap.contains(e.target)) {
        const trigger = document.getElementById('catTrigger');
        const menu = document.getElementById('catMenu');
        if(trigger) trigger.classList.remove('open');
        if(menu) menu.classList.remove('open');
    }
});
