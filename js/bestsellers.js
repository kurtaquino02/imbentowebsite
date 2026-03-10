const bestSellersGrid = document.getElementById("bsGrid");
let bsItems = [];
let currentPage = 1;
const itemsPerPage = 7;

// Initialize array of items
window.addEventListener("DOMContentLoaded", () => {
    if (bestSellersGrid) {
        const children = Array.from(bestSellersGrid.children);
        bsItems = children.map((el, index) => {
            // Extract info from DOM elements
            // Rank
            const rankText = el.querySelector('.rank-num')?.innerText || "99";
            const rank = parseInt(rankText, 10);
            
            // Price
            const priceText = el.querySelector('.fc-price')?.innerText || "₱0";
            const priceStr = priceText.replace(/[^\d.]/g, '');
            const price = parseFloat(priceStr);
            
            // Reviews
            const reviewsText = el.querySelector('.fc-stars span')?.innerText || "(0 reviews)";
            const reviewsStr = reviewsText.replace(/[^\d]/g, '');
            const reviews = parseInt(reviewsStr, 10);
            
            // ID
            const url = el.getAttribute('onclick') || "";
            const idMatch = url.match(/id=(\d+)/);
            const id = idMatch ? parseInt(idMatch[1], 10) : 0;
            
            // Dummy newest score using ID
            const newest = id;
            
            return {
                el,
                rank,
                price,
                reviews,
                id,
                newest // Fallback for newest sorting
            };
        });
        
        // Initialize pagination
        renderPagination();
        showPage(1);
    }
});

function sortBestSellers() {
    const select = document.getElementById("bsSortSelect");
    if (!select || !bestSellersGrid || bsItems.length === 0) return;
    
    const value = select.value;
    
    // Create a copy of bsItems to sort
    let sortedItems = [...bsItems];
    
    if (value === "popular") {
        sortedItems.sort((a, b) => a.rank - b.rank);
    } else if (value === "rating") {
        // Since all are 5 stars (hardcoded), let's fallback to reviews to distinguish
        sortedItems.sort((a, b) => b.reviews - a.reviews);
    } else if (value === "reviews") {
        sortedItems.sort((a, b) => b.reviews - a.reviews);
    } else if (value === "price-low") {
        sortedItems.sort((a, b) => a.price - b.price);
    } else if (value === "price-high") {
        sortedItems.sort((a, b) => b.price - a.price);
    } else if (value === "newest") {
        sortedItems.sort((a, b) => b.newest - a.newest);
    }
    
    // Update bsItems to sorted order and re-append elements
    bsItems = sortedItems;
    bestSellersGrid.innerHTML = '';
    bsItems.forEach(item => {
        // Only keep the "large" card formatting if viewing by original Most Popular rank
        if (value === "popular" && item.rank === 1) {
            item.el.classList.add("large");
        } else {
            item.el.classList.remove("large");
        }
        bestSellersGrid.appendChild(item.el);
    });
    
    // Re-apply pagination after sort
    currentPage = 1;
    renderPagination();
    showPage(1);
}

// Pagination Functions
function getTotalPages() {
    return Math.ceil(bsItems.length / itemsPerPage);
}

function showPage(page) {
    if (!bestSellersGrid || bsItems.length === 0) return;
    
    currentPage = page;
    const totalPages = getTotalPages();
    
    // Hide all items first
    bsItems.forEach(item => {
        item.el.style.display = 'none';
    });
    
    // Show only items for current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, bsItems.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        bsItems[i].el.style.display = '';
    }
    
    // Update pagination
    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.getElementById('bsPagination');
    if (!paginationContainer) return;
    
    const totalPages = getTotalPages();
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `<button class="bs-page-btn" onclick="changePage(-1)" id="prevPageBtn" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;
    
    // Page numbers with ellipsis
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    if (startPage > 1) {
        html += `<button class="bs-page-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) html += `<span class="bs-page-dots">...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="bs-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<span class="bs-page-dots">...</span>`;
        html += `<button class="bs-page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    html += `<button class="bs-page-btn" onclick="changePage(1)" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>`;
    
    paginationContainer.innerHTML = html;
}

function goToPage(page) {
    const totalPages = getTotalPages();
    if (page < 1 || page > totalPages) return;
    showPage(page);
}

function changePage(delta) {
    const newPage = currentPage + delta;
    const totalPages = getTotalPages();
    if (newPage >= 1 && newPage <= totalPages) {
        showPage(newPage);
    }
}
