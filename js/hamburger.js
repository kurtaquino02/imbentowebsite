/* ── Mobile Hamburger Navigation ── */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.addEventListener('click', toggleMobileNav);
    document.body.appendChild(overlay);

    // Create drawer
    var drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';

    // Header
    var header = '<div class="mobile-nav-header">' +
      '<span class="mobile-nav-title">Menu</span>' +
      '<button class="mobile-nav-close" onclick="toggleMobileNav()">✕</button>' +
      '</div>';

    // Gather subnav links (includes non-link spans like verify-btn)
    var linksHtml = '<a href="allcategories.html">📂 All Categories</a>';
    var subnavLinks = document.querySelectorAll('.subnav-inner > a, .subnav-inner > span.verify-btn');
    for (var i = 0; i < subnavLinks.length; i++) {
      var el = subnavLinks[i];
      var cls = el.className ? ' class="' + el.className + '"' : '';
      var href = el.getAttribute('href');
      if (href) {
        linksHtml += '<a href="' + href + '"' + cls + '>' + el.innerHTML + '</a>';
      } else {
        linksHtml += '<span' + cls + '>' + el.innerHTML + '</span>';
      }
    }
    // If no subnav links, add default navigation
    if (subnavLinks.length === 0) {
      linksHtml += '<a href="index.html">🏠 Home</a>' +
        '<a href="wishlist.html">❤️ Wishlist</a>' +
        '<a href="orderhistory.html">🕐 Order History</a>' +
        '<a href="featuredproducts.html">⭐ Featured</a>' +
        '<a href="bestsellers.html">🔥 Best Sellers</a>' +
        '<a href="imbento-category.html">✨ New Products</a>';
    }

    // Gather nav action buttons (login/signup)
    var actionsHtml = '';
    var navActions = document.querySelectorAll('.nav-actions .btn-ghost, .nav-actions .btn-solid');
    for (var j = 0; j < navActions.length; j++) {
      var btn = navActions[j];
      actionsHtml += '<a href="' + btn.getAttribute('href') + '" class="' + btn.className + '">' + btn.textContent + '</a>';
    }

    drawer.innerHTML = header +
      '<div class="mobile-nav-links">' + linksHtml + '</div>' +
      '<div class="mobile-nav-actions">' + actionsHtml + '</div>';

    document.body.appendChild(drawer);
  });
})();

function toggleMobileNav() {
  var drawer = document.querySelector('.mobile-nav-drawer');
  var overlay = document.querySelector('.mobile-nav-overlay');
  var btn = document.querySelector('.hamburger-btn');
  if (!drawer) return;

  var isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

/* ── Mobile Search Overlay ── */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Create search overlay
    var searchOverlay = document.createElement('div');
    searchOverlay.className = 'mobile-search-overlay';
    searchOverlay.innerHTML =
      '<div class="mobile-search-bar">' +
        '<svg class="mobile-search-icon" width="18" height="18" fill="none" stroke="#6B6280" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
        '<input type="text" placeholder="Search Filipino-made products..." autofocus>' +
        '<button class="mobile-search-close" onclick="toggleMobileSearch()" aria-label="Close search">\u2715</button>' +
      '</div>';
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) toggleMobileSearch();
    });
    document.body.appendChild(searchOverlay);
  });
})();

function toggleMobileSearch() {
  var overlay = document.querySelector('.mobile-search-overlay');
  if (!overlay) return;
  var isOpen = overlay.classList.contains('open');
  overlay.classList.toggle('open');
  if (!isOpen) {
    var input = overlay.querySelector('input');
    if (input) setTimeout(function() { input.focus(); }, 300);
  }
}

/* ── Category Strip Arrow Navigation ── */
function scrollCatStrip(btn, direction) {
  var strip = btn.closest('.category-strip');
  var inner = strip.querySelector('.category-inner');
  if (!inner) return;
  var scrollAmount = inner.clientWidth * 0.6;
  inner.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  setTimeout(function() { updateCatArrows(strip); }, 350);
}

function updateCatArrows(strip) {
  var inner = strip.querySelector('.category-inner');
  var leftBtn = strip.querySelector('.cat-arrow-left');
  var rightBtn = strip.querySelector('.cat-arrow-right');
  if (!inner) return;
  if (leftBtn) {
    leftBtn.classList.toggle('hidden', inner.scrollLeft <= 2);
  }
  if (rightBtn) {
    rightBtn.classList.toggle('hidden', inner.scrollLeft + inner.clientWidth >= inner.scrollWidth - 2);
  }
}

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var strips = document.querySelectorAll('.category-strip');
    for (var i = 0; i < strips.length; i++) {
      (function(strip) {
        updateCatArrows(strip);
        var inner = strip.querySelector('.category-inner');
        if (inner) {
          inner.addEventListener('scroll', function() { updateCatArrows(strip); });
        }
        window.addEventListener('resize', function() { updateCatArrows(strip); });
      })(strips[i]);
    }
  });
})();
