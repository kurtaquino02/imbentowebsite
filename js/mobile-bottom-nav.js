/* ══════════════════════════════════════════════════════════════
   MOBILE BOTTOM NAVIGATION
   A consistent bottom nav bar for mobile devices
══════════════════════════════════════════════════════════════ */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Only show on mobile (handled by CSS, but we still create it)
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Create bottom nav container
    var bottomNav = document.createElement('nav');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.setAttribute('aria-label', 'Mobile navigation');
    
    // Navigation items
    var navItems = [
      { href: 'index.html', icon: 'home', label: 'Home', match: ['index.html', ''] },
      { href: 'allcategories.html', icon: 'grid', label: 'Categories', match: ['allcategories.html', 'category.html', 'imbento-category.html'] },
      { href: '#', icon: 'cart', label: 'Cart', action: 'toggleCart', match: [] },
      { href: 'wishlist.html', icon: 'heart', label: 'Wishlist', match: ['wishlist.html'] },
      { href: 'loginandsignup.html', icon: 'user', label: 'Account', match: ['loginandsignup.html', 'orderhistory.html'] }
    ];
    
    // SVG icons
    var icons = {
      home: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
      grid: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      cart: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
      heart: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
      user: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    };
    
    // Build nav items
    var navHtml = '';
    for (var i = 0; i < navItems.length; i++) {
      var item = navItems[i];
      var isActive = item.match.indexOf(currentPage) !== -1;
      var activeClass = isActive ? ' active' : '';
      
      if (item.action) {
        navHtml += '<button class="mobile-nav-item' + activeClass + '" onclick="' + item.action + '()" aria-label="' + item.label + '">' +
          '<span class="mobile-nav-icon">' + icons[item.icon] + '</span>' +
          '<span class="mobile-nav-label">' + item.label + '</span>' +
          (item.icon === 'cart' ? '<span class="mobile-nav-badge" id="mobileCartBadge">0</span>' : '') +
          '</button>';
      } else {
        navHtml += '<a href="' + item.href + '" class="mobile-nav-item' + activeClass + '" aria-label="' + item.label + '">' +
          '<span class="mobile-nav-icon">' + icons[item.icon] + '</span>' +
          '<span class="mobile-nav-label">' + item.label + '</span>' +
          (item.icon === 'heart' ? '<span class="mobile-nav-badge mobile-nav-badge-wishlist" id="mobileWishlistBadge">0</span>' : '') +
          '</a>';
      }
    }
    
    bottomNav.innerHTML = navHtml;
    document.body.appendChild(bottomNav);
  });
})();
