// ═══════════════════════════════════════════════════════════════
// CART DATA — API-Ready Structure
// 
// This object maintains the exact structure your API will return.
// For Laravel transition:
//  - Replace this initialization with: const res = await fetch('/api/cart/{userId}')
//  - This data will come from server instead
// ═══════════════════════════════════════════════════════════════

var CART_DATA = {
    items: [],
    promoCode: null,
    discount: 0
};
