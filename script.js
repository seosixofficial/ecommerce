// --- Products Data ---
const products = [
    { id: 1, title: 'Sony WH-1000XM5 Noise Cancelling', price: 348.00, oldPrice: 399.00, category: 'electronics', rating: 4.8, reviews: 120, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Apple Watch Series 9', price: 399.00, oldPrice: null, category: 'electronics', rating: 4.9, reviews: 342, img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Classic Urban Jacket', price: 89.99, oldPrice: 120.00, category: 'fashion', rating: 4.5, reviews: 89, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Minimalist Leather Backpack', price: 65.00, oldPrice: null, category: 'accessories', rating: 4.7, reviews: 45, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600' },
    { id: 5, title: 'Razer DeathAdder V3 Pro', price: 149.99, oldPrice: 169.99, category: 'electronics', rating: 4.6, reviews: 210, img: 'https://images.unsplash.com/photo-1615663245857-ac1eeb536691?auto=format&fit=crop&q=80&w=600' },
    { id: 6, title: 'Nike Air Max 270', price: 129.99, oldPrice: 150.00, category: 'fashion', rating: 4.8, reviews: 543, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' },
    { id: 7, title: 'Ray-Ban Wayfarer Classic', price: 154.00, oldPrice: null, category: 'accessories', rating: 4.5, reviews: 130, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600' },
    { id: 8, title: 'Samsung 49" Odyssey G9', price: 1299.00, oldPrice: 1499.00, category: 'electronics', rating: 4.9, reviews: 76, img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=600' },
    { id: 9, title: 'Summer Floral Dress', price: 45.99, oldPrice: 60.00, category: 'fashion', rating: 4.4, reviews: 112, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600' },
    { id: 10, title: 'Logitech MX Master 3S', price: 99.99, oldPrice: null, category: 'electronics', rating: 4.9, reviews: 840, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
    { id: 11, title: 'Ceramic Coffee Mug Set', price: 29.99, oldPrice: 40.00, category: 'home', rating: 4.7, reviews: 56, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
    { id: 12, title: 'Smart LED Bulb Pack', price: 35.00, oldPrice: null, category: 'home', rating: 4.3, reviews: 201, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600' },
    { id: 13, title: 'Bose QuietComfort 45', price: 329.00, oldPrice: 350.00, category: 'electronics', rating: 4.8, reviews: 310, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600' },
    { id: 14, title: 'Air Jordan 1 Retro', price: 160.00, oldPrice: null, category: 'fashion', rating: 4.9, reviews: 1420, img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600' },
    { id: 15, title: 'Mechanical Keyboard K6', price: 79.99, oldPrice: 99.00, category: 'electronics', rating: 4.5, reviews: 88, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
    { id: 16, title: 'Canvas Weekend Bag', price: 55.00, oldPrice: 75.00, category: 'accessories', rating: 4.6, reviews: 42, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const couponCodeStr = 'WELCOME50';
let isCouponApplied = false;

// --- Elements ---
const siteLoader = document.getElementById('siteLoader');
const productGrid = document.getElementById('productGrid');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartView = document.getElementById('emptyCartView');
const cartBadge = document.getElementById('cartBadge');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const toastContainer = document.getElementById('toastContainer');
const categoryCards = document.querySelectorAll('.category-card');
const searchInput = document.getElementById('searchInput');
const priceFilter = document.getElementById('priceFilter');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after animation
    setTimeout(() => {
        siteLoader.classList.add('hidden');
    }, 1200);

    // Show Skeletons initially to simulate realistic loading
    renderSkeletons();
    
    setTimeout(() => {
        renderProducts(products);
    }, 2000);

    updateCartUI();
    initCarousel();
    startCountdown();
    checkPopupAd();
});

// --- Product Rendering & 3D Tilt Logic ---
function renderSkeletons() {
    productGrid.innerHTML = '';
    for(let i=0; i<8; i++){
        productGrid.innerHTML += `
            <div class="product-card skeleton">
                <div class="skeleton-img"></div>
                <div class="skeleton-text skeleton-title"></div>
                <div class="skeleton-text skeleton-price"></div>
            </div>
        `;
    }
}

function initTilt(card) {
    if (window.innerWidth <= 768) return; // Disable on mobile to prevent scrolling issues

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation degrees (max 15 deg)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
}

function renderProducts(items) {
    productGrid.innerHTML = '';
    if(items.length === 0){
        productGrid.innerHTML = '<p class="text-center w-100" style="grid-column: 1 / -1; font-size: 1.2rem; color: var(--text-muted); padding: 40px 0;">No products found.</p>';
        return;
    }
    items.forEach(product => {
        let discountHtml = '';
        if (product.oldPrice) {
            let discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            discountHtml = `<div class="discount-badge">-${discount}%</div>`;
        }
        
        let oldPriceHtml = product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${discountHtml}
            <div class="product-image-wrapper">
                <img src="${product.img}" alt="${product.title}" class="product-img">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title" title="${product.title}">${product.title}</h3>
                <div class="product-rating">
                    <i class="fas fa-star"></i> ${product.rating} <span>(${product.reviews})</span>
                </div>
                <div class="product-price-row">
                    <div>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${oldPriceHtml}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Attach 3D tilt interaction
        initTilt(card);
        
        productGrid.appendChild(card);
    });
}

// --- Cart Logic ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.title} added to cart!`);
    
    // Open cart automatically on first item added
    if(cart.length === 1 && !cartPanel.classList.contains('active')) {
        toggleCart();
    }
}

// Make function available to global scope
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) removeFromCart(id);
        else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Badge
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadge.textContent = totalQty;
    
    // Items
    const itemsBoxes = document.querySelectorAll('.cart-item');
    itemsBoxes.forEach(box => box.remove());
    
    if(cart.length === 0) {
        emptyCartView.style.display = 'block';
        checkoutBtn.disabled = true;
    } else {
        emptyCartView.style.display = 'none';
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertBefore(div, cartItemsContainer.firstChild);
        });
    }
    
    // Totals
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    let discountAmount = 0;
    if(isCouponApplied && cart.length > 0) {
        discountAmount = subtotal * 0.5; // 50% discount
    }
    cartDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    
    const finalTotal = subtotal - discountAmount;
    cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

// --- Checkout & Payment Logic ---
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const checkoutItemsContainer = document.getElementById('checkoutItemsContainer');
const paymentForm = document.getElementById('paymentForm');

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) return;
    toggleCart(); // hide cart
    
    // Populate payment summary
    checkoutItemsContainer.innerHTML = '';
    cart.forEach(item => {
        checkoutItemsContainer.innerHTML += `
            <div class="checkout-item">
                <span class="checkout-item-title">${item.qty} x ${item.title}</span>
                <span>$${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmount = isCouponApplied ? subtotal * 0.5 : 0;
    
    // Random shipping fee between $5 and $20
    const shippingFee = Math.floor(Math.random() * 16) + 5;
    
    const finalTotal = (subtotal - discountAmount) + shippingFee;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutDiscount').textContent = `-$${discountAmount.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `$${shippingFee.toFixed(2)}`;
    document.getElementById('checkoutFinalTotal').textContent = `$${finalTotal.toFixed(2)}`;

    paymentModal.classList.add('active');
});

closePaymentModal.addEventListener('click', () => {
    paymentModal.classList.remove('active');
});

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    paymentModal.classList.remove('active');
    
    // Show success
    setTimeout(() => {
        successModal.classList.add('active');
    }, 300);
});

closeSuccessModal.addEventListener('click', () => {
    successModal.classList.remove('active');
    // Clear cart
    cart = [];
    isCouponApplied = false;
    document.getElementById('couponInput').value = '';
    saveCart();
    updateCartUI();
});


// --- Cart Toggle ---
function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartPanel.classList.toggle('active');
}
cartToggleBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// --- Search & Filter ---
function applyFilters() {
    let filtered = [...products];
    
    // Search
    const term = searchInput.value.toLowerCase();
    if(term) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(term));
    }
    
    // Category CategoryCards contain active class
    const activeCategoryBtn = document.querySelector('.category-card.active');
    if(activeCategoryBtn) {
        const cat = activeCategoryBtn.dataset.category;
        if(cat !== 'all') {
            filtered = filtered.filter(p => p.category === cat);
        }
    }
    
    // Sorting
    const sortVal = priceFilter.value;
    if(sortVal === 'low') filtered.sort((a,b) => a.price - b.price);
    if(sortVal === 'high') filtered.sort((a,b) => b.price - a.price);
    
    renderProducts(filtered);
}

searchInput.addEventListener('input', applyFilters);
priceFilter.addEventListener('change', applyFilters);

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        categoryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        applyFilters();
    });
});

// --- Toast Notifications ---
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// --- Dynamic Features ---
// Carousel
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slideCount = indicators.length;
    let currentSlide = 0;
    
    function goToSlide(idx) {
        currentSlide = idx;
        track.style.transform = `translateX(-${idx * 100}%)`;
        indicators.forEach(i => i.classList.remove('active'));
        if(indicators[idx]) indicators[idx].classList.add('active');
    }
    
    setInterval(() => {
        const next = (currentSlide + 1) % slideCount;
        goToSlide(next);
    }, 5000);

    indicators.forEach((ind, idx) => {
        ind.addEventListener('click', () => goToSlide(idx));
    });
}

// Countdown
function startCountdown() {
    const el = document.getElementById('topCountdown');
    let time = 2 * 60 * 60; // 2 hours
    setInterval(() => {
        if(time <= 0) return;
        time--;
        const h = Math.floor(time / 3600).toString().padStart(2, '0');
        const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const s = (time % 60).toString().padStart(2, '0');
        if(el) el.textContent = `${h}:${m}:${s}`;
    }, 1000);
}

// Coupon
document.getElementById('applyCouponBtn').addEventListener('click', () => {
    const val = document.getElementById('couponInput').value.trim().toUpperCase();
    if(val === couponCodeStr) {
        if(!isCouponApplied){
            isCouponApplied = true;
            updateCartUI();
            showToast('Coupon applied successfully! (50% OFF)');
        } else {
            showToast('Coupon already applied.');
        }
    } else {
        alert('Invalid coupon code!');
    }
});

// --- Modals Base ---
const loginModal = document.getElementById('loginModal');
document.getElementById('loginBtn').addEventListener('click', () => {
    loginModal.classList.add('active');
});
document.getElementById('closeLoginModal').addEventListener('click', () => {
    loginModal.classList.remove('active');
});
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    showToast('Logged in successfully!');
});

// Popup Ad
const popup = document.getElementById('welcomePopup');
function checkPopupAd() {
    if(!localStorage.getItem('popupShown')) {
        // show popup slightly later after loader
        setTimeout(() => {
            popup.classList.add('active');
        }, 4000);
    }
}
document.getElementById('closePopup').addEventListener('click', () => {
    popup.classList.remove('active');
    localStorage.setItem('popupShown', 'true');
});
document.getElementById('startShoppingBtn').addEventListener('click', () => {
    popup.classList.remove('active');
    localStorage.setItem('popupShown', 'true');
});
document.getElementById('copyCouponBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('popupCoupon').textContent);
    showToast('Coupon copied to clipboard!');
});

// Mid Ad Btn
const midAdBtn = document.getElementById('midAdBtn');
if(midAdBtn) {
    midAdBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('featured').offsetTop - 80,
            behavior: 'smooth'
        });
        showToast('Check out our featured electronics!');
    });
}

// --- Scroll & Theme ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
let isDark = false;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if(isDark) {
        htmlEl.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlEl.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Scroll animations & Back to top
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
    
    // Header shadow
    if(window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-soft)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Back to top btn
    if(window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initial check for elements in view
handleScrollAnimation();
