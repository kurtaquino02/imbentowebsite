document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    setupFormSubmission();
});

// Load Order Summary from CART_DATA (js/cart-data.js)
// When adding a backend, replace CART_DATA with the API response before calling this
function loadOrderSummary() {
    const container = document.getElementById('order-summary-items');
    if (!container) return;

    if (typeof CART_DATA === 'undefined' || !CART_DATA.items.length) {
        container.innerHTML = '<div class="s-item"><p style="color:#999;margin:0">Your cart is empty.</p></div>';
        updateTotals(0);
        return;
    }

    container.innerHTML = CART_DATA.items.map(item => `
        <div class="s-item">
            <div class="s-img">
                <img src="${item.image}" width="60" height="60"
                    style="object-fit:cover;border-radius:8px;width:100%;height:100%"
                    alt="${item.name}"
                    onerror="this.onerror=null;this.parentElement.textContent='📦'">
            </div>
            <div class="s-info">
                <div class="s-name">${item.name}</div>
                <div style="font-size:12px;color:#999">${item.category} · by ${item.sellerName}</div>
                <div style="font-size:13px;color:#333;margin-top:4px">
                    ₱${item.price.toLocaleString()} × ${item.qty}
                </div>
            </div>
            <div style="font-weight:600;font-size:14px;white-space:nowrap">
                ₱${(item.price * item.qty).toLocaleString()}
            </div>
        </div>
    `).join('');

    const subtotal = CART_DATA.items.reduce((s, i) => s + i.price * i.qty, 0);
    updateTotals(subtotal - (CART_DATA.discount || 0));
}

function updateTotals(subtotal) {
    const shipping = subtotal > 0 ? 50 : 0; // Flat rate shipping
    const total = subtotal + shipping;

    document.getElementById('summary-subtotal').textContent = '₱' + subtotal.toLocaleString();
    document.getElementById('summary-shipping').textContent = '₱' + shipping.toLocaleString();
    document.getElementById('summary-total').textContent = '₱' + total.toLocaleString();
}

function setupFormSubmission() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            fullName: form.querySelector('input[placeholder*="Full Name"]')?.value,
            email: form.querySelector('input[placeholder*="Email"]')?.value,
            phone: form.querySelector('input[placeholder*="Phone"]')?.value,
            address: form.querySelector('input[placeholder*="Address"]')?.value,
            city: form.querySelector('input[placeholder*="City"]')?.value,
            zipcode: form.querySelector('input[placeholder*="Postal"]')?.value,
            paymentMethod: form.querySelector('input[name="payment"]:checked')?.value
        };

        // Show loading state
        const btn = form.querySelector('.checkout-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        // Simulate API call - when using Laravel, replace this with actual POST request
        setTimeout(() => {
            // This will be replaced with: 
            // fetch('/api/orders', { method: 'POST', body: JSON.stringify(formData) })
            
            if(typeof showToast === 'function') {
                showToast('✅ Order placed successfully!', 'success');
            } else {
                alert('Order placed successfully!');
            }
            
            // Redirect to order history
            setTimeout(() => {
                window.location.href = 'orderhistory.html'; 
            }, 800);
        }, 1500);
    });
}
