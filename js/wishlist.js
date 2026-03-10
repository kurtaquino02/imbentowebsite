let cartCount = 0;
let selectedCards = new Set();

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;
  
  // Normalize type for compatibility
  if (type === 'green') type = 'success';
  if (type === 'red') type = 'error';
  
  icon.className = 'toast-icon ' + type;
  const typeConfig = {
      success: { icon: '✓', bg: 'var(--green, #10B981)' },
      error: { icon: '✕', bg: 'var(--red, #ef4444)' },
      warning: { icon: '⚠', bg: '#f59e0b' },
      info: { icon: 'ℹ', bg: '#3b82f6' },
      brand: { icon: '🛒', bg: 'var(--brand, #F43F5E)' }
  };
  const config = typeConfig[type] || typeConfig.success;
  icon.textContent = config.icon;
  icon.style.background = config.bg;
  msgEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

function removeCard(btn, id, silent = false) {
  const card = btn.closest('.wish-card');
  if(!card) return;
  
  card.classList.add('removing');
  
  // Remove from storage if ID provided
  if(id) {
      removeFromStorage(id);
  } else {
      // Try to handle hardcoded removal by name if no ID
      const nameEl = card.querySelector('.wish-name');
      if(nameEl) {
          removeFromStorageByName(nameEl.textContent.trim());
      }
  }
  
  setTimeout(() => {
    card.remove();
    renderPagination(); 
    updateCount();
    if(!silent) showToast('❤️ Removed from wishlist', 'error');
  }, 350);
}

function addOneToCart(btn, explicitId = null) {
  const card = btn.closest('.wish-card');
  
  // Get product details
  const name = card.dataset.name || 'Wishlist Item';
  const price = parseInt(card.dataset.price) || 0;
  
  // Get image path from data attribute or fallback
  let image = card.dataset.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'; 

  // Use explicit ID if provided (from localStorage), else generate or try to scrape
  const id = explicitId || Date.now() + Math.random();

  // Add to cart (using global function from cart.js)
  addToCart({
    id: id, 
    name: name, 
    price: price, 
    image: image, 
    qty: 1
  }, false); // false = don't open sidebar

  // Remove from wishlist
  removeCard(btn, explicitId, true); // true = silent removal
  
  // Show explicit success toast
  setTimeout(() => {
      showToast('🛒 Moved to cart!', 'success');
  }, 400);
}

function addAllToCart() {
  const cards = document.querySelectorAll('.wish-card');
  if(cards.length === 0) {
    showToast('⚠️ Wishlist is empty', 'warning');
    return;
  }

  let addedCount = 0;
  
  // Temporarily suppress cart toggle if possible or just handle it
  // Better: Manually iterate and add to cart via one final save if possible, 
  // but we'll stick to reusing logic for consistency.
  
  // Reverse loop to remove from end or handle index properly
  Array.from(cards).forEach((card, i) => {
      setTimeout(() => {
          // Extract data
          const name = card.dataset.name || 'Item';
          
          // Remove locally
          card.classList.add('removing');
          setTimeout(() => card.remove(), 350);

      }, i * 150); 
  });

  // Remove all items UI and show message
  setTimeout(() => {
      updateCount();
      if(typeof showToast === 'function') {
        showToast(`🛒 Items moved to cart!`, 'success');
      }
  }, cards.length * 100 + 400);
}

// Stub - Clear All (Connect to API later)
function clearAll() {
  if (!confirm('Remove all items from your wishlist?')) return;
  document.querySelectorAll('.wish-card').forEach(c => {
    c.classList.add('removing');
    setTimeout(() => c.remove(), 350);
  });
  setTimeout(updateCount, 400);
  if(typeof showToast === 'function') {
    showToast('🗑️ Wishlist cleared', 'info');
  }
}

function updateCount() {
  const n = document.querySelectorAll('.wish-card').length;
  document.getElementById('wishCountPill').textContent = n + ' items';
  document.getElementById('totalItems').textContent = n;
  
  // Calculate total value and savings
  const items = getWishlist();
  let totalValue = 0;
  let totalSavings = 0;
  let onSaleCount = 0;
  
  items.forEach(item => {
    totalValue += item.price;
    if(item.oldPrice) {
      totalSavings += (item.oldPrice - item.price);
      onSaleCount++;
    }
  });
  
  const totalValueEl = document.getElementById('totalValue');
  if(totalValueEl) totalValueEl.textContent = '₱' + totalValue.toLocaleString();
  
  // Update savings display - find the summary card's savings element
  const savingsElements = document.querySelectorAll('.summary-stat.savings strong');
  if(savingsElements.length > 0) {
    savingsElements[0].textContent = '₱' + totalSavings.toLocaleString();
  }
  
  // Update on sale count
  const onSaleElements = document.querySelectorAll('.summary-stat');
  onSaleElements.forEach(el => {
    if(el.textContent.includes('Items on sale')) {
      el.querySelector('strong').textContent = onSaleCount + ' items';
    }
  });
  
  if (n === 0) {
    const grid = document.getElementById('wishlistGrid');
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">💔</span>
        <h3>Your wishlist is empty</h3>
        <p>Browse our Filipino-made products and save the ones you love!</p>
        <button class="btn-browse" onclick="window.location='imbento-redesign.html'">Browse Products</button>
      </div>`;
  }
}

function handleSelect(checkbox) {
  const card = checkbox.closest('.wish-card');
  if (checkbox.checked) {
    selectedCards.add(card);
    card.classList.add('selected');
  } else {
    selectedCards.delete(card);
    card.classList.remove('selected');
  }
  updateBulkBar();
}

function toggleSelectAll(checkbox) {
  document.querySelectorAll('.card-select').forEach(cb => {
    cb.checked = checkbox.checked;
    cb.dispatchEvent(new Event('change'));
  });
}

function clearSelection() {
  document.querySelectorAll('.card-select').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.wish-card').forEach(c => c.classList.remove('selected'));
  selectedCards.clear();
  const selectAll = document.getElementById('selectAll');
  if(selectAll) selectAll.checked = false;
  updateBulkBar();
}

function updateBulkBar() {
  const btn = document.getElementById('bulkRemoveBtn');
  if(!btn) return;
  
  if(selectedCards.size > 0) {
    btn.style.display = 'block';
    btn.textContent = `🗑 Remove (${selectedCards.size})`;
  } else {
    btn.style.display = 'none';
  }
}

function bulkAddToCart() {
  cartCount += selectedCards.size;
  document.getElementById('cartCount').textContent = cartCount;
  showToast(`🛒 ${selectedCards.size} items added to cart!`, 'success');
  clearSelection();
}

function bulkRemove() {
  selectedCards.forEach(card => {
    card.classList.add('removing');
    setTimeout(() => card.remove(), 350);
  });
  setTimeout(() => {
    selectedCards.clear();
    updateBulkBar();
    updateCount();
  }, 400);
  showToast('🗑️ Selected items removed', 'info');
}

function shareToast() {
  showToast('🔗 Share link copied!', 'success');
  clearSelection();
}

function copyLink() {
  showToast('📋 Wishlist link copied!', 'success');
}

function setView(v) {
  currentView = v;
  const grid = document.getElementById('wishlistGrid');
  const gBtn = document.getElementById('gridBtn');
  const lBtn = document.getElementById('listBtn');
  if (v === 'list') {
    grid.classList.add('list-view');
    lBtn.classList.add('active');
    gBtn.classList.remove('active');
  } else {
    grid.classList.remove('list-view');
    gBtn.classList.add('active');
    lBtn.classList.remove('active');
  }
  currentPage = 1; // Reset to page 1 on view change
  renderPagination();
}

/* Pagination Logic */
let currentPage = 1;
let currentView = 'grid';

function getItemsPerPage() {
    return currentView === 'list' ? 5 : 6;
}

let activeFilter = 'all';

function filterWish(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentPage = 1;
  renderPagination();
}

function sortWish(val) {
  const grid = document.getElementById('wishlistGrid');
  const cards = Array.from(grid.querySelectorAll('.wish-card'));
  cards.sort((a, b) => {
    if (val === 'price-asc') return +a.dataset.price - +b.dataset.price;
    if (val === 'price-desc') return +b.dataset.price - +a.dataset.price;
    if (val === 'rating') return +b.dataset.rating - +a.dataset.rating;
    if (val === 'name') return a.dataset.name.localeCompare(b.dataset.name);
    return 0;
  });
  // Re-append sorted cards
  cards.forEach(c => grid.appendChild(c));
  currentPage = 1;
  renderPagination();
}

function renderPagination() {
  const grid = document.getElementById('wishlistGrid');
  if(!grid) return;
  
  const allCards = Array.from(grid.querySelectorAll('.wish-card'));
  const itemsPerPage = getItemsPerPage();
  
  // 1. Identify valid cards based on current filter
  const validCards = allCards.filter(card => {
      const stock = card.dataset.stock;
      const hasBadge = card.querySelector('.wish-badge.sale');

      // Reset display first
      card.style.display = 'none';

      if (activeFilter === 'all') return true;
      if (activeFilter === 'sale') return hasBadge; // Using truthiness of element existence
      if (activeFilter === 'available') return stock === 'available';
      if (activeFilter === 'low') return stock === 'low';
      return true;
  });

  // 2. Calculate pagination
  const totalPages = Math.ceil(validCards.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;
  
  // 3. Update visibility for current page
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const cardsToShow = validCards.slice(start, end);
  
  cardsToShow.forEach(c => c.style.display = '');

  // 4. Render controls
  const numContainer = document.getElementById('pageNumbers');
  if (numContainer) {
      numContainer.innerHTML = '';
      
      for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.className = `page-num ${i === currentPage ? 'active' : ''}`;
          btn.textContent = i;
          btn.onclick = () => { currentPage = i; renderPagination(); window.scrollTo({top: 0, behavior: 'smooth'}); };
          numContainer.appendChild(btn);
      }

      const prev = document.getElementById('prevPage');
      const next = document.getElementById('nextPage');
      const container = document.getElementById('paginationContainer');

      if (prev) prev.disabled = currentPage === 1;
      if (next) next.disabled = currentPage === totalPages || totalPages === 0;
      if (container) container.style.display = totalPages <= 1 ? 'none' : 'flex';
  }
  
  updateCount(); 
}

function changePage(delta) {
    currentPage += delta;
    renderPagination();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Load wishlist from localStorage (via wishlist-data.js)
// Stub - Load Stored Wishlist (Connect to API later)
function loadStoredWishlist() {
  // Load wishlist items
  const items = getWishlist();
  const grid = document.getElementById('wishlistGrid');
  if(!grid) return;
  
  // Show empty state if no items
  if(!items || items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px;">
        <div style="font-size:40px;margin-bottom:10px;">❤️</div>
        <h3 style="font-family:'Syne';margin-bottom:10px;">Your wishlist is empty</h3>
        <p style="color:#666;margin-bottom:20px;">Start adding your favorite products!</p>
        <button onclick="window.location='allcategories.html'" style="background:var(--brand,#2D1B69);color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-weight:600">Browse Products</button>
      </div>
    `;
    return;
  }

  // Render wishlist items
  let html = '';
  items.forEach(item => {
    const oldPriceHtml = item.oldPrice ? `<div class="wish-price-old">₱${item.oldPrice.toLocaleString()}</div>` : '';
    const savings = item.oldPrice ? item.oldPrice - item.price : 0;
    const savingHtml = savings > 0 ? `<div class="wish-save">Save ₱${savings.toLocaleString()}</div>` : '';
    
    let badgeHtml = '';
    if(item.badge === 'sale' && item.badgeText) {
      badgeHtml = `<div class="wish-badge sale">${item.badgeText}</div>`;
    } else if(item.badge === 'bestseller') {
      badgeHtml = `<div class="wish-badge new">Best Seller</div>`;
    } else if(item.badge === 'new') {
      badgeHtml = `<div class="wish-badge new">New</div>`;
    } else if(item.stock === 'low') {
      badgeHtml = `<div class="wish-badge low">⚠ Only 3 left</div>`;
    }

    html += `
      <div class="wish-card" data-category="${item.category}" data-stock="${item.stock}" data-price="${item.price}" data-rating="${item.rating}" data-name="${item.name}">
        <input type="checkbox" class="card-select" onchange="handleSelect(this)">
        <div class="wish-img" style="background:linear-gradient(135deg,#F9F7FF,#EDE9FE)">
          <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
          <div class="wish-badges">${badgeHtml}</div>
          <button class="remove-btn" onclick="removeCard(this)" title="Remove">✕</button>
        </div>
        <div class="wish-info">
          <div class="wish-cat">${item.catDisplay}</div>
          <div class="wish-name">${item.name}</div>
          <div class="wish-stars">★★★★★ <span>(${item.reviews} reviews)</span></div>
          <div class="wish-price-row">
            <div>
              <div class="wish-price">₱${item.price.toLocaleString()}</div>
              ${oldPriceHtml}
            </div>
            ${savingHtml}
          </div>
          <div class="wish-card-actions">
            <button class="btn-add-wish" onclick="addOneToCart(this)">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
              Add to Cart
            </button>
            <button class="btn-share-wish" title="Share">↗</button>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
  updateCount();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStoredWishlist();
    renderPagination();
});


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
  const panel = document.getElementById('panel-' + id);
  if(panel) panel.classList.add('active');
}

document.addEventListener('click', function(e) {
  const wrap = document.querySelector('.cat-dropdown-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const trigger = document.getElementById('catTrigger');
    const menu = document.getElementById('catMenu');
    if (trigger) trigger.classList.remove('open');
    if (menu) menu.classList.remove('open');
  }
});

/* Prevent card click propagation on interactive elements to stop navigation */
document.querySelectorAll('.wish-card input, .wish-card button').forEach(el => {
  el.addEventListener('click', (e) => e.stopPropagation());
});
