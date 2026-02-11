// --- ДАННЫЕ МЕНЮ (Имитация БД) ---
const sushiData = [
    // Премиум
    { id: 1, category: 'premium', name: 'Дракон Голд', price: 950, weight: '280г', desc: 'Угорь, авокадо, икра тобико, сусальное золото', img: 'https://images.unsplash.com/photo-1617196034421-24e74918a0b8?q=80&w=400' },
    { id: 2, category: 'premium', name: 'Император', price: 1200, weight: '310г', desc: 'Камчатский краб, лосось, манго, трюфельный соус', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400' },
    { id: 3, category: 'premium', name: 'Токио Блэк', price: 890, weight: '260г', desc: 'Чернила каракатицы, гребешок, тунец, спайси соус', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400' },
    { id: 4, category: 'premium', name: 'Сакура Спешл', price: 1100, weight: '300г', desc: 'Опаленный лосось, креветка темпура, сливочный сыр', img: 'https://images.unsplash.com/photo-1635526910429-041477d49818?q=80&w=400' },
    
    // Классика
    { id: 5, category: 'classic', name: 'Филадельфия Люкс', price: 690, weight: '250г', desc: 'Много лосося, сливочный сыр, огурец', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=400' },
    { id: 6, category: 'classic', name: 'Калифорния Краб', price: 650, weight: '240г', desc: 'Снежный краб, авокадо, икра масаго', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd43fb?q=80&w=400' },
    { id: 7, category: 'classic', name: 'Канада', price: 720, weight: '245г', desc: 'Угорь, лосось, огурец, кунжут, соус унаги', img: 'https://images.unsplash.com/photo-1583623025817-d180a4795b29?q=80&w=400' },
    { id: 8, category: 'classic', name: 'Маки с Тунцом', price: 450, weight: '180г', desc: 'Свежий тунец, рис, нори', img: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=400' },

    // Запеченные
    { id: 9, category: 'baked', name: 'Вулкан', price: 550, weight: '260г', desc: 'Мидии, сырная шапка, спайси соус', img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=400' },
    { id: 10, category: 'baked', name: 'Запеченная Фила', price: 700, weight: '270г', desc: 'Лосось гриль, сливочный сыр, унаги соус', img: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=400' },
    
    // Сеты
    { id: 11, category: 'sets', name: 'Сет Огненный Дракон', price: 2500, weight: '1200г', desc: 'Филадельфия, Дракон, Запеченный с угрем (32 шт)', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=400' },
    { id: 12, category: 'sets', name: 'Сет Королевский', price: 4500, weight: '2000г', desc: 'Премиум ассорти для компании (72 шт)', img: 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=400' },

    // Нигири и Сашими (добавляем для массовки)
    { id: 13, category: 'nigiri', name: 'Нигири Лосось', price: 180, weight: '40г', desc: 'Охлажденный лосось, рис', img: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=400' },
    { id: 14, category: 'nigiri', name: 'Сашими Тунец', price: 600, weight: '100г', desc: 'Отборное филе тунца', img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=400' },
];

// Генерируем еще 30+ позиций автоматически для объема
for(let i = 15; i <= 50; i++) {
    const types = ['classic', 'baked', 'nigiri'];
    const type = types[Math.floor(Math.random() * types.length)];
    sushiData.push({
        id: i,
        category: type,
        name: `Ролл #${i} Вкусный`,
        price: 400 + Math.floor(Math.random() * 500),
        weight: '220г',
        desc: 'Классический состав, свежие ингредиенты',
        img: 'https://images.unsplash.com/photo-1559410545-028903f7da8b?q=80&w=400'
    });
}

// --- STATE ---
let cart = [];

// --- DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBtn = document.getElementById('cart-btn');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const orderModal = document.getElementById('order-modal');
const closeModal = document.getElementById('close-modal');

// --- RENDER MENU ---
function renderMenu(filter = 'all') {
    menuGrid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? sushiData 
        : sushiData.filter(item => item.category === filter);

    filteredData.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('product-card', 'animate-on-scroll');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="product__img">
            <div class="product__info">
                <div class="product__header">
                    <h3 class="product__title">${item.name}</h3>
                    <span class="product__weight">${item.weight}</span>
                </div>
                <p class="product__desc">${item.desc}</p>
                <div class="product__footer">
                    <span class="product__price">${item.price} ₽</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        <i class="ri-add-line"></i>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
    
    // Перезапуск анимации для новых элементов
    observeElements();
}

// --- FILTERS ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Render
        renderMenu(btn.dataset.filter);
    });
});

// --- CART LOGIC ---
function addToCart(id) {
    const item = sushiData.find(p => p.id === id);
    const existingItem = cart.find(c => c.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    openCart(); // Open cart on add
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
}

function changeQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(id);
        else updateCartUI();
    }
}

function updateCartUI() {
    // Update Count
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.innerText = totalQty;

    // Render Items
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart__empty-msg">Корзина пуста</div>';
    } else {
        cart.forEach(item => {
            totalPrice += item.price * item.qty;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart__item-info">
                    <h4>${item.name}</h4>
                    <span>${item.price} ₽</span>
                    <div class="cart__controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotal.innerText = totalPrice + ' ₽';
}

// --- UI INTERACTIONS ---
function openCart() {
    cartSidebar.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        closeCart();
        orderModal.classList.add('active');
        cart = []; // Clear cart
        updateCartUI();
    } else {
        alert('Добавьте товары в корзину');
    }
});

closeModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// Mobile Menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if(navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show'));
}
if(navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show'));
}
navLinks.forEach(n => n.addEventListener('click', () => navMenu.classList.remove('show')));


// --- SCROLL ANIMATIONS (Intersection Observer) ---
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}


// --- DOWNLOAD IMITATION ---
document.querySelector('.download-trigger').addEventListener('click', function(e) {
    // Если файла нет реально, предотвратим переход и покажем алерт для теста
    // e.preventDefault(); 
    // alert("Имитация скачивания файла sushi-beta.zip началась...");
    // В реальном проекте e.preventDefault не нужен, если файл лежит рядом
});


// --- INIT ---
window.addEventListener('load', () => {
    renderMenu();
    observeElements();
});

// Change header background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) header.style.background = 'rgba(0,0,0,0.95)';
    else header.style.background = 'rgba(20,20,20,0.7)';
});