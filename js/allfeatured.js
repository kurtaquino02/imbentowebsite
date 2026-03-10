/* ═══════════════════════════════════════════════════════════
   FEATURED PRODUCTS PAGE - js/allfeatured.js
   Premium featured products browsing functionality
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Noise-Canceling Headphones",
      category: "Electronics",
      seller: "AudioTech Pro",
      price: 12999,
      oldPrice: 16999,
      rating: 4.9,
      reviews: 847,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 2,
      name: "Artisan Leather Messenger Bag",
      category: "Fashion",
      seller: "CraftHouse Manila",
      price: 4850,
      oldPrice: null,
      rating: 4.8,
      reviews: 562,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
      badges: ["featured"]
    },
    {
      id: 3,
      name: "Smart Fitness Watch Pro",
      category: "Electronics",
      seller: "TechFit Store",
      price: 8499,
      oldPrice: 10999,
      rating: 4.7,
      reviews: 1203,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      badges: ["featured", "sale"]
    },
    {
      id: 4,
      name: "Organic Skincare Gift Set",
      category: "Beauty",
      seller: "NaturGlow PH",
      price: 2999,
      oldPrice: null,
      rating: 4.9,
      reviews: 428,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 5,
      name: "Minimalist Desk Organizer Set",
      category: "Home & Living",
      seller: "ModernSpace Co.",
      price: 1599,
      oldPrice: 1999,
      rating: 4.6,
      reviews: 315,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400",
      badges: ["featured"]
    },
    {
      id: 6,
      name: "Professional Camera Lens 50mm",
      category: "Electronics",
      seller: "LensWorld PH",
      price: 28999,
      oldPrice: null,
      rating: 4.9,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 7,
      name: "Handwoven Rattan Chair",
      category: "Home & Living",
      seller: "PhilCraft Artisans",
      price: 6499,
      oldPrice: 7999,
      rating: 4.8,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      badges: ["featured", "sale"]
    },
    {
      id: 8,
      name: "Gourmet Coffee Gift Collection",
      category: "Food & Beverages",
      seller: "Bean Origin Co.",
      price: 1899,
      oldPrice: null,
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      badges: ["featured"]
    },
    {
      id: 9,
      name: "Luxury Silk Scarf",
      category: "Fashion",
      seller: "Elegance Boutique",
      price: 3499,
      oldPrice: 4299,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 10,
      name: "Wireless Mechanical Keyboard",
      category: "Electronics",
      seller: "KeyTech PH",
      price: 5999,
      oldPrice: null,
      rating: 4.6,
      reviews: 723,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
      badges: ["featured"]
    },
    {
      id: 11,
      name: "Premium Essential Oil Set",
      category: "Beauty",
      seller: "AromaTherapy PH",
      price: 2199,
      oldPrice: 2799,
      rating: 4.9,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
      badges: ["featured", "sale"]
    },
    {
      id: 12,
      name: "Ceramic Plant Pot Collection",
      category: "Home & Living",
      seller: "GreenLife Gardens",
      price: 1299,
      oldPrice: null,
      rating: 4.5,
      reviews: 298,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
      badges: ["featured"]
    },
    {
      id: 13,
      name: "Designer Sunglasses",
      category: "Fashion",
      seller: "Optic Style Co.",
      price: 4999,
      oldPrice: 6499,
      rating: 4.7,
      reviews: 512,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 14,
      name: "Artisan Chocolate Gift Box",
      category: "Food & Beverages",
      seller: "ChocoCraft Manila",
      price: 1599,
      oldPrice: null,
      rating: 4.9,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400",
      badges: ["featured"]
    },
    {
      id: 15,
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      seller: "SoundWave Store",
      price: 3299,
      oldPrice: 3999,
      rating: 4.6,
      reviews: 876,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      badges: ["featured", "sale"]
    },
    {
      id: 16,
      name: "Handmade Jewelry Set",
      category: "Fashion",
      seller: "Gem Artisan PH",
      price: 2799,
      oldPrice: null,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 17,
      name: "Organic Matcha Gift Set",
      category: "Food & Beverages",
      seller: "TeaLeaf Japan",
      price: 1999,
      oldPrice: 2499,
      rating: 4.7,
      reviews: 421,
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
      badges: ["featured"]
    },
    {
      id: 18,
      name: "Premium Yoga Mat Set",
      category: "Sports & Fitness",
      seller: "ZenFit Co.",
      price: 2499,
      oldPrice: null,
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
      badges: ["featured", "editors"]
    },
    {
      id: 19,
      name: "Vintage Style Wall Clock",
      category: "Home & Living",
      seller: "RetroDecor PH",
      price: 1899,
      oldPrice: 2299,
      rating: 4.5,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
      badges: ["featured", "sale"]
    },
    {
      id: 20,
      name: "Professional Makeup Brush Set",
      category: "Beauty",
      seller: "BeautyPro Manila",
      price: 3199,
      oldPrice: null,
      rating: 4.9,
      reviews: 723,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      badges: ["featured"]
    }
  ];

  // State
  let currentCategory = 'all';
  let currentSort = 'featured';
  let currentPage = 1;
  let currentView = 'grid';
  const productsPerPage = 8;

  // DOM Elements
  const productsGrid = document.querySelector('.af-products-grid');
  const resultCount = document.querySelector('.af-result-count');
  const activeFilters = document.querySelector('.af-active-filters');
  const sortSelect = document.querySelector('.af-sort-select');
  const viewBtns = document.querySelectorAll('.af-view-btn');
  const pagination = document.querySelector('.af-pagination');
  const emptyState = document.querySelector('.af-empty-state');
  const categoryBtns = document.querySelectorAll('.cat-btn');

  // Initialize
  init();

  function init() {
    renderProducts();
    bindEvents();
  }

  function bindEvents() {
    // Category buttons
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        if (category === 'all') {
          currentCategory = 'all';
        } else {
          currentCategory = this.textContent.trim();
        }
        currentPage = 1;
        renderProducts();
      });
    });

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        currentPage = 1;
        renderProducts();
      });
    }

    // View toggle
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        viewBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentView = this.dataset.view;
        
        if (productsGrid) {
          productsGrid.classList.toggle('list-view', currentView === 'list');
        }
      });
    });

    // Reset button
    const resetBtn = document.querySelector('.af-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }
  }

  function getFilteredProducts() {
    let products = [...featuredProducts];

    // Category filter
    if (currentCategory !== 'all') {
      products = products.filter(p => p.category === currentCategory);
    }

    // Sorting
    switch (currentSort) {
      case 'featured':
        // Featured products with editors badge first
        products.sort((a, b) => {
          const aEditors = a.badges.includes('editors') ? 1 : 0;
          const bEditors = b.badges.includes('editors') ? 1 : 0;
          return bEditors - aEditors;
        });
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        products.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
    }

    return products;
  }

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = getFilteredProducts();
    const totalProducts = filtered.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Paginate
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filtered.slice(startIndex, startIndex + productsPerPage);

    // Update result count
    if (resultCount) {
      const start = startIndex + 1;
      const end = Math.min(startIndex + productsPerPage, totalProducts);
      resultCount.innerHTML = `Showing <strong>${start}-${end}</strong> of <strong>${totalProducts}</strong> featured products`;
    }

    // Update active filters
    updateActiveFilters();

    // Show empty state or products
    if (totalProducts === 0) {
      productsGrid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      if (pagination) pagination.style.display = 'none';
      return;
    }

    productsGrid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
    if (pagination) pagination.style.display = 'flex';

    // Render products
    productsGrid.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');

    // Render pagination
    renderPagination(totalPages);

    // Add hover effects
    addCardInteractions();
  }

  function createProductCard(product) {
    const badgesHTML = product.badges.map(badge => {
      let badgeClass = 'af-badge';
      let label = '';
      
      switch (badge) {
        case 'featured':
          badgeClass += ' af-badge-featured';
          label = '⭐ Featured';
          break;
        case 'sale':
          badgeClass += ' af-badge-sale';
          label = 'Sale';
          break;
        case 'editors':
          badgeClass += ' af-badge-editors';
          label = "Editor's Pick";
          break;
      }
      
      return `<span class="${badgeClass}">${label}</span>`;
    }).join('');

    const starsHTML = getStarsHTML(product.rating);
    const priceHTML = product.oldPrice 
      ? `<span class="af-card-price">₱${product.price.toLocaleString()}</span>
         <span class="af-card-price-old">₱${product.oldPrice.toLocaleString()}</span>`
      : `<span class="af-card-price">₱${product.price.toLocaleString()}</span>`;

    return `
      <div class="af-product-card" data-id="${product.id}">
        <div class="af-card-img">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'">
          <div class="af-card-badges">${badgesHTML}</div>
          <button class="af-card-wishlist">♡</button>
        </div>
        <div class="af-card-info">
          <div class="af-card-category">${product.category}</div>
          <h3 class="af-card-name">${product.name}</h3>
          <div class="af-card-seller">by ${product.seller}</div>
          <div class="af-card-rating">
            <span class="af-card-stars">${starsHTML}</span>
            <span class="af-card-rating-count">(${product.reviews})</span>
          </div>
          <div class="af-card-footer">
            <div class="af-card-prices">${priceHTML}</div>
            <button class="af-card-cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < fullStars; i++) {
      html += '★';
    }
    if (hasHalf) {
      html += '☆';
    }
    
    return html;
  }

  function updateActiveFilters() {
    if (!activeFilters) return;

    let html = '';
    
    if (currentCategory !== 'all') {
      html += `
        <span class="af-filter-tag">
          ${currentCategory}
          <button onclick="removeFilter('category')">&times;</button>
        </span>
      `;
    }

    activeFilters.innerHTML = html;
  }

  function renderPagination(totalPages) {
    if (!pagination || totalPages <= 1) {
      if (pagination) pagination.innerHTML = '';
      return;
    }

    let html = `
      <button class="af-page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
    `;

    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<button class="af-page-btn" onclick="goToPage(1)">1</button>`;
      if (startPage > 2) {
        html += `<span class="af-page-dots">...</span>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `
        <button class="af-page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
          ${i}
        </button>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        html += `<span class="af-page-dots">...</span>`;
      }
      html += `<button class="af-page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    html += `
      <button class="af-page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
    `;

    pagination.innerHTML = html;
  }

  function addCardInteractions() {
    // Wishlist buttons
    document.querySelectorAll('.af-card-wishlist').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.textContent = this.textContent === '♡' ? '♥' : '♡';
        this.style.color = this.textContent === '♥' ? '#EF4444' : '';
        this.style.background = this.textContent === '♥' ? '#FEE2E2' : '';
      });
    });

    // Cart buttons
    document.querySelectorAll('.af-card-cart').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Animation feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);

        // Show toast
        showToast('🛒 Added to cart!', 'success');
      });
    });

    // Card click
    document.querySelectorAll('.af-product-card').forEach(card => {
      card.addEventListener('click', function() {
        const productId = this.dataset.id;
        // Navigate to product page
        window.location.href = `product.html?id=${productId}`;
      });
    });
  }

  function showToast(message, type = 'success') {
    // Normalize type for compatibility
    if (type === 'green') type = 'success';
    if (type === 'red') type = 'error';
    
    const toast = document.getElementById('toast');
    if (toast) {
      const toastIcon = document.getElementById('toastIcon');
      const toastMsg = document.getElementById('toastMsg');
      
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
    } else {
      // Create simple toast
      const simpleToast = document.createElement('div');
      simpleToast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 14px 28px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        animation: slideUp 0.3s ease;
      `;
      simpleToast.textContent = message;
      document.body.appendChild(simpleToast);
      
      setTimeout(() => {
        simpleToast.style.opacity = '0';
        simpleToast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => simpleToast.remove(), 300);
      }, 2500);
    }
  }

  // Global functions for onclick handlers
  window.goToPage = function(page) {
    currentPage = page;
    renderProducts();
    
    // Scroll to top of products
    const main = document.querySelector('.af-main');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  window.removeFilter = function(type) {
    if (type === 'category') {
      currentCategory = 'all';
      categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
      });
      // Also update category pills
      document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.toggle('active', pill.textContent.toLowerCase().includes('all'));
      });
    }
    currentPage = 1;
    renderProducts();
  };

  // Category mapping from HTML pill values to JS data categories
  const categoryMap = {
    'all': 'all',
    'healthcare': 'Healthcare',
    'pets': 'Pet Products',
    'eco': 'Eco Friendly',
    'fashion': 'Fashion',
    'food': 'Food & Beverages',
    'home': 'Home & Living',
    'beauty': 'Beauty',
    'tools': 'Tools',
    'tech': 'Electronics',
    'services': 'Services'
  };

  window.filterByCategory = function(category, element) {
    // Update active state on pills
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.remove('active');
    });
    if (element) {
      element.classList.add('active');
    }
    
    // Map the category to JS data format
    currentCategory = categoryMap[category] || category;
    if (category === 'all') {
      currentCategory = 'all';
    }
    
    currentPage = 1;
    renderProducts();
  };

  window.scrollCatStrip = function(btn, direction) {
    const strip = document.querySelector('.category-inner');
    if (strip) {
      const scrollAmount = 200;
      strip.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  function resetFilters() {
    currentCategory = 'all';
    currentSort = 'featured';
    currentPage = 1;
    
    // Reset UI
    categoryBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    if (sortSelect) {
      sortSelect.value = 'featured';
    }

    renderProducts();
  }
});
