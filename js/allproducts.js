/* ═══════════════════════════════════════════════════════════
   PICKS OF THE WEEK PAGE - js/allproducts.js
   Handles curated product listing, filtering, sorting, and pagination
   ═══════════════════════════════════════════════════════════ */

// Configuration
const PRODUCTS_PER_PAGE = 20;
let currentPage = 1;
let currentCategory = 'all';
let currentSort = 'rating'; // Default to highest rated for curated picks
let currentView = 'grid';
let searchQuery = '';

// Category mapping
const categoryMap = {
  'all': null,
  'healthcare': ['Health & Wellness', 'Healthcare & Fitness'],
  'pets': ['Pet Products', 'Pets'],
  'eco': ['Eco Friendly', 'Eco Friendly & Natural', 'Natural'],
  'fashion': ['Fashion', 'Fashion & Apparel', 'Apparel'],
  'food': ['Food', 'Food & Beverage'],
  'home': ['Home', 'Home & Decor', 'Home & Living'],
  'beauty': ['Beauty', 'Beauty & Personal Care', 'Personal Care'],
  'tools': ['Tools', 'Hardware'],
  'tech': ['Tech', 'Technologies', 'Electronics'],
  'services': ['Services', 'Services & e-Gifts', 'e-Gifts']
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  updateTotalCount();
});

// Update total products count in masthead
function updateTotalCount() {
  const totalEl = document.getElementById('totalProductsCount');
  if (totalEl && typeof productsDB !== 'undefined') {
    totalEl.textContent = productsDB.length + '+';
  }
}

// Get filtered products
function getFilteredProducts() {
  let products = [...productsDB];
  
  // Filter by category
  if (currentCategory !== 'all') {
    const categoryTerms = categoryMap[currentCategory] || [];
    products = products.filter(p => {
      const cat = p.category?.toLowerCase() || '';
      return categoryTerms.some(term => cat.includes(term.toLowerCase()));
    });
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    products = products.filter(p => 
      p.name?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query) ||
      p.seller?.name?.toLowerCase().includes(query)
    );
  }
  
  // Sort products
  switch (currentSort) {
    case 'newest':
      products.sort((a, b) => (b.id || 0) - (a.id || 0));
      break;
    case 'popular':
      products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    case 'price-low':
      products.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-high':
      products.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'rating':
      products.sort((a, b) => (b.stars || 0) - (a.stars || 0));
      break;
  }
  
  return products;
}

// Render products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultCount = document.getElementById('resultCount');
  
  if (!grid) return;
  
  const filteredProducts = getFilteredProducts();
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  
  // Ensure current page is valid
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
  
  // Get products for current page
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const pageProducts = filteredProducts.slice(startIdx, endIdx);
  
  // Update result count
  if (resultCount) {
    const start = startIdx + 1;
    const end = Math.min(endIdx, totalProducts);
    resultCount.innerHTML = `Showing <strong>${start}-${end}</strong> of <strong>${totalProducts}</strong> products`;
  }
  
  // Show empty state if no products
  if (totalProducts === 0) {
    grid.innerHTML = '';
    grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    document.getElementById('pagination').innerHTML = '';
    return;
  }
  
  // Hide empty state and show grid
  grid.style.display = '';
  if (emptyState) emptyState.style.display = 'none';
  
  // Apply view class
  grid.className = `ap-products-grid ${currentView === 'list' ? 'list-view' : ''}`;
  
  // Render product cards
  grid.innerHTML = pageProducts.map(product => renderProductCard(product)).join('');
  
  // Render pagination
  renderPagination(totalPages);
}

// Render single product card
function renderProductCard(product) {
  const stars = '★'.repeat(Math.floor(product.stars || 0)) + '☆'.repeat(5 - Math.floor(product.stars || 0));
  const hasOldPrice = product.oldPrice && product.oldPrice > product.price;
  const discount = hasOldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  
  // Determine badges
  let badgesHtml = '';
  if (product.reviewCount > 1000) {
    badgesHtml += `<span class="ap-badge ap-badge-bestseller">Best Seller</span>`;
  } else if (discount > 0) {
    badgesHtml += `<span class="ap-badge ap-badge-sale">-${discount}%</span>`;
  } else if (product.id > 105) {
    badgesHtml += `<span class="ap-badge ap-badge-new">New</span>`;
  }
  
  return `
    <div class="ap-product-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="ap-card-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:60px;display:flex;align-items:center;justify-content:center;height:100%;\\'>📦</span>';">
        <div class="ap-card-badges">${badgesHtml}</div>
        <button class="ap-card-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id})" title="Add to Wishlist">♡</button>
      </div>
      <div class="ap-card-info">
        <div class="ap-card-category">${product.category || 'Product'}</div>
        <div class="ap-card-name">${product.name}</div>
        <div class="ap-card-seller">by ${product.seller?.name || 'Imbento Seller'}</div>
        <div class="ap-card-rating">
          <span class="ap-card-stars">${stars}</span>
          <span class="ap-card-rating-count">(${product.reviewCount || 0})</span>
        </div>
        <div class="ap-card-footer">
          <div class="ap-card-prices">
            <span class="ap-card-price">₱${product.price?.toLocaleString() || '0'}</span>
            ${hasOldPrice ? `<span class="ap-card-price-old">₱${product.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="ap-card-cart" onclick="event.stopPropagation(); addToCart(${product.id})" title="Add to Cart">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render pagination
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  if (!pagination || totalPages <= 1) {
    if (pagination) pagination.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // Previous button
  html += `<button class="ap-page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;
  
  // Page numbers
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  if (startPage > 1) {
    html += `<button class="ap-page-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) html += `<span class="ap-page-dots">...</span>`;
  }
  
  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="ap-page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="ap-page-dots">...</span>`;
    html += `<button class="ap-page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }
  
  // Next button
  html += `<button class="ap-page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>`;
  
  pagination.innerHTML = html;
}

// Go to specific page
function goToPage(page) {
  const totalPages = Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  renderProducts();
  
  // Scroll to top of products
  document.querySelector('.ap-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Filter by category
function filterByCategory(category, element) {
  currentCategory = category;
  currentPage = 1;
  
  // Update active pill
  document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
  if (element) element.classList.add('active');
  
  renderProducts();
  updateActiveFilters();
}

// Handle search
function handleSearch() {
  const input = document.getElementById('searchInput');
  searchQuery = input?.value || '';
  currentPage = 1;
  renderProducts();
}

// Set grid view
function setGridView(view, element) {
  currentView = view;
  
  // Update active button
  document.querySelectorAll('.ap-view-btn').forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');
  
  renderProducts();
}

// Reset all filters
function resetFilters() {
  currentCategory = 'all';
  currentSort = 'newest';
  currentPage = 1;
  searchQuery = '';
  
  // Reset UI
  document.querySelectorAll('.category-pill').forEach((pill, i) => {
    pill.classList.toggle('active', i === 0);
  });
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'newest';
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  renderProducts();
  updateActiveFilters();
}

// Update active filters display
function updateActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  
  let html = '';
  
  if (currentCategory !== 'all') {
    const categoryName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    html += `<span class="ap-filter-tag">${categoryName}<button onclick="filterByCategory('all', document.querySelector('.category-pill'))">×</button></span>`;
  }
  
  container.innerHTML = html;
}

// Add to cart
// Stub - Add to Cart (Connect to API later)
function addToCart(productId) {
  const product = productsDB.find(p => p.id === productId);
  if (!product) return;
  
  if(typeof showToast === 'function') {
    showToast('🛒 Added to cart!', 'success');
  }
}

// Stub - Add to Wishlist (Connect to API later)
function addToWishlist(productId) {
  if(typeof showToast === 'function') {
    showToast('❤️ Added to wishlist!', 'success');
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');
  
  if (!toast) return;
  
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

// Close modals
function closeCartModal() {
  const modal = document.getElementById('addToCartModal');
  if (modal) modal.classList.remove('show');
}

function closeWishlistModal() {
  const modal = document.getElementById('addToWishlistModal');
  if (modal) modal.classList.remove('show');
}

// Category strip scroll (from landingpage.js compatibility)
function scrollCatStrip(btn, direction) {
  const strip = btn.parentElement.querySelector('.category-inner');
  if (strip) {
    strip.scrollBy({ left: direction * 200, behavior: 'smooth' });
  }
}
