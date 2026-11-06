// --- DATABASE & STATE ---
const products = [
    {
        id: 1,
        name: "Combo Família Suprema",
        category: "promocao",
        badge: "25% OFF",
        price: 89.90,
        oldPrice: 119.90,
        description: "1 Pizza Grande + Pizza Doce + Guaraná 2L.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        bestseller: true,
        ingredients: ["Mussarela", "Calabresa", "Chocolate", "Guaraná"],
        isPizza: true
    },
    {
        id: 2,
        name: "Margherita D.O.C.",
        category: "tradicional",
        badge: "⭐ Mais Pedida",
        price: 59.90,
        oldPrice: null,
        description: "Molho italiano, mussarela de búfala, tomate cereja e manjericão.",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
        bestseller: true,
        ingredients: ["Molho de Tomate", "Mussarela de Búfala", "Manjericão"],
        isPizza: true
    },
    {
        id: 3,
        name: "Calabresa Artesanal & Catupiry",
        category: "tradicional",
        badge: "🔥 Clássico",
        price: 64.90,
        oldPrice: null,
        description: "Calabresa defumada, cebola roxa e Catupiry original.",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80",
        bestseller: true,
        ingredients: ["Calabresa Defumada", "Cebola Roxa", "Catupiry"],
        isPizza: true
    },
    {
        id: 4,
        name: "Quatro Queijos Trufado",
        category: "especial",
        badge: "✨ Chef's Pick",
        price: 74.90,
        oldPrice: null,
        description: "Blend de Mussarela, Gorgonzola, Provolone, Parmesão e azeite trufado.",
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=700&q=80",
        bestseller: false,
        ingredients: ["Mussarela", "Gorgonzola", "Provolone", "Parmesão", "Azeite Trufado"],
        isPizza: true
    },
    {
        id: 5,
        name: "Pepperoni com Mel de Pimenta",
        category: "especial",
        badge: "Destaque",
        price: 76.90,
        oldPrice: null,
        description: "Pepperoni artesanal e toque de mel com pimenta.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
        bestseller: true,
        ingredients: ["Pepperoni", "Mussarela", "Mel com Pimenta"],
        isPizza: true
    },
    {
        id: 6,
        name: "Frango Supremo com Bacon",
        category: "tradicional",
        badge: null,
        price: 66.90,
        oldPrice: null,
        description: "Frango desfiado, bacon crocante e cream cheese Philadelphia.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
        bestseller: false,
        ingredients: ["Frango", "Bacon Crocante", "Cream Cheese"],
        isPizza: true
    },
    {
        id: 7,
        name: "Chocolate Belga com Morango",
        category: "doce",
        badge: "🍫 Sobremesa",
        price: 54.90,
        oldPrice: null,
        description: "Ganache de chocolate belga e morangos frescos.",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
        bestseller: false,
        ingredients: ["Chocolate Belga", "Morangos"],
        isPizza: true
    },
    {
        id: 8,
        name: "Coca-Cola Zero 2 Litros",
        category: "bebida",
        badge: "🥤 Bebida",
        price: 14.90,
        oldPrice: null,
        description: "Gelada na temperatura perfeita.",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80",
        bestseller: false,
        ingredients: ["Refrigerante 2L"],
        isPizza: false
    }
];

const sizes = [
    { id: 'p', name: 'Pequena (4 fatias)', priceOffset: -12 },
    { id: 'm', name: 'Média (6 fatias)', priceOffset: 0 },
    { id: 'g', name: 'Grande (8 fatias)', priceOffset: 16 },
    { id: 'fam', name: 'Família (12 fatias)', priceOffset: 32 }
];

const borders = [
    { id: 'none', name: 'Sem Borda Recheada', price: 0 },
    { id: 'catupiry', name: 'Borda de Catupiry Original', price: 9.90 },
    { id: 'cheddar', name: 'Borda de Cheddar Cremoso', price: 9.90 },
    { id: 'chocolate', name: 'Borda de Chocolate Belga', price: 12.90 }
];

let cart = [];
let currentCustomizingProduct = null;
let selectedSize = 'm';
let selectedBorder = 'none';
let currentActiveOrder = null;
let orderTimerInterval = null;
let selectedRating = 5;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderHomeBestsellers();
    renderHomeReviews();
    renderProducts(products);
    updateCartUI();
});

// --- NAVIGATION & VIEWS ---
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

// --- RENDERING HOME ---
function renderHomeBestsellers() {
    const container = document.getElementById('home-bestsellers-grid');
    if (!container) return;
    const items = products.filter(p => p.bestseller).slice(0, 4);

    container.innerHTML = items.map(p => `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
            <div class="relative h-52 overflow-hidden bg-dark-900">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700">
                ${p.badge ? `<span class="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full">${p.badge}</span>` : ''}
            </div>
            <div class="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-white text-base group-hover:text-amber-400 transition-colors">${p.name}</h3>
                    <p class="text-xs text-stone-400 mt-1 line-clamp-2 font-light">${p.description}</p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                        <span class="text-[10px] text-stone-500 uppercase tracking-wider block">Preço</span>
                        <span class="text-lg font-extrabold text-white">R$ ${p.price.toFixed(2)}</span>
                    </div>
                    <button onclick="openCustomizeModal(${p.id})" class="bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all">
                        <i data-lucide="plus" class="w-4 h-4"></i> ${p.isPizza ? 'Personalizar' : 'Adicionar'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderHomeReviews() {
    const container = document.getElementById('home-reviews-grid');
    if (!container) return;

    const reviews = [
        { name: "Mariana Costa", text: "A melhor massa de longa fermentação! Chegou em 25 minutos super quentinha.", stars: 5, tag: "Cliente VIP" },
        { name: "Lucas Silveira", text: "O preço dinâmico ao escolher a borda é transparente e maravilhoso. Sem sustos!", stars: 5, tag: "Primeiro Pedido" },
        { name: "Beatriz Mendes", text: "O rastreamento ao vivo e o botão direto para o WhatsApp facilitam muito.", stars: 5, tag: "Cliente Frequente" }
    ];

    container.innerHTML = reviews.map(r => `
        <div class="glass-card p-6 rounded-2xl space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex text-amber-400 text-sm">★★★★★</div>
                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-semibold">${r.tag}</span>
            </div>
            <p class="text-stone-300 text-xs italic font-light">"${r.text}"</p>
            <div class="flex items-center gap-3 pt-2 border-t border-white/5">
                <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">${r.name.charAt(0)}</div>
                <span class="font-bold text-xs text-white">${r.name}</span>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// --- RENDERING CATALOG ---
function renderProducts(items) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-20 text-stone-500 text-sm">Nenhum item encontrado.</div>`;
        return;
    }

    grid.innerHTML = items.map(p => `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
            <div class="relative h-52 overflow-hidden bg-dark-900">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700">
                ${p.badge ? `<span class="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full">${p.badge}</span>` : ''}
            </div>
            <div class="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-white text-base group-hover:text-amber-400 transition-colors">${p.name}</h3>
                    <p class="text-xs text-stone-400 mt-1 font-light">${p.description}</p>
                    <div class="flex flex-wrap gap-1 mt-3">
                        ${p.ingredients.slice(0, 3).map(ing => `<span class="text-[10px] bg-white/5 text-stone-400 px-2 py-0.5 rounded-md border border-white/5">${ing}</span>`).join('')}
                    </div>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                        <span class="text-[10px] text-stone-500 uppercase tracking-wider block">Preço</span>
                        <span class="text-lg font-extrabold text-white">R$ ${p.price.toFixed(2)}</span>
                    </div>
                    <button onclick="openCustomizeModal(${p.id})" class="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all">
                        <i data-lucide="plus" class="w-4 h-4"></i> ${p.isPizza ? 'Personalizar' : 'Pedir'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function filterCategory(cat) {
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'font-extrabold', 'shadow-lg', 'shadow-amber-500/20');
        btn.classList.add('glass-card', 'text-stone-400');
    });
    event && event.target.classList.add('bg-amber-500', 'text-black', 'font-extrabold', 'shadow-lg', 'shadow-amber-500/20');
    event && event.target.classList.remove('glass-card', 'text-stone-400');

    if (cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
}

function handleSearch(query) {
    const q = query.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.ingredients.some(i => i.toLowerCase().includes(q))));
}

// --- CUSTOMIZATION MODAL (Conditional with custom placeholder for beverages) ---
function openCustomizeModal(productId) {
    currentCustomizingProduct = products.find(p => p.id === productId);
    if (!currentCustomizingProduct) return;

    selectedSize = 'm';
    selectedBorder = 'none';
    document.getElementById('modal-obs').value = '';

    document.getElementById('modal-img').src = currentCustomizingProduct.image;
    document.getElementById('modal-title').textContent = currentCustomizingProduct.name;
    document.getElementById('modal-desc').textContent = currentCustomizingProduct.description;
    document.getElementById('modal-category-tag').textContent = currentCustomizingProduct.category.toUpperCase();

    const optionsContainer = document.getElementById('modal-pizza-options');
    const obsLabel = document.getElementById('modal-obs-label');
    const obsInput = document.getElementById('modal-obs');

    if (currentCustomizingProduct.isPizza) {
        optionsContainer.classList.remove('hidden');
        obsLabel.textContent = "Observações para o Pizzaiolo";
        obsInput.placeholder = "Ex: Sem cebola, massa bem passada...";
        renderSizesOptions();
        renderBordersOptions();
    } else {
        optionsContainer.classList.add('hidden');
        obsLabel.textContent = "Observações do Pedido";
        obsInput.placeholder = "Ex: Bem gelada, com gelo e limão...";
    }

    updateModalPrice();

    document.getElementById('modal-customize').classList.remove('hidden');
    document.getElementById('modal-customize').classList.add('flex');
    lucide.createIcons();
}

function closeCustomizeModal() {
    document.getElementById('modal-customize').classList.add('hidden');
    document.getElementById('modal-customize').classList.remove('flex');
}

function renderSizesOptions() {
    document.getElementById('sizes-container').innerHTML = sizes.map(s => `
        <label onclick="selectSize('${s.id}')" class="border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${selectedSize === s.id ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-dark-900/50 hover:border-white/20'}">
            <div class="flex items-center gap-2.5">
                <input type="radio" name="size" value="${s.id}" ${selectedSize === s.id ? 'checked' : ''} class="accent-amber-500">
                <span class="text-xs font-semibold text-stone-200">${s.name}</span>
            </div>
            <span class="text-[11px] text-stone-400 font-medium">${s.priceOffset >= 0 ? '+' : ''}R$ ${s.priceOffset.toFixed(2)}</span>
        </label>
    `).join('');
}

function selectSize(id) {
    selectedSize = id;
    renderSizesOptions();
    updateModalPrice();
}

function renderBordersOptions() {
    document.getElementById('borders-container').innerHTML = borders.map(b => `
        <label onclick="selectBorder('${b.id}')" class="border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${selectedBorder === b.id ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-dark-900/50 hover:border-white/20'}">
            <div class="flex items-center gap-2.5">
                <input type="radio" name="border" value="${b.id}" ${selectedBorder === b.id ? 'checked' : ''} class="accent-amber-500">
                <span class="text-xs font-semibold text-stone-200">${b.name}</span>
            </div>
            <span class="text-[11px] text-stone-400 font-medium">${b.price > 0 ? '+R$ ' + b.price.toFixed(2) : 'Grátis'}</span>
        </label>
    `).join('');
}

function selectBorder(id) {
    selectedBorder = id;
    renderBordersOptions();
    updateModalPrice();
}

function calculateCurrentPrice() {
    if (!currentCustomizingProduct) return 0;
    let base = currentCustomizingProduct.price;
    if (currentCustomizingProduct.isPizza) {
        const s = sizes.find(x => x.id === selectedSize);
        const b = borders.find(x => x.id === selectedBorder);
        if (s) base += s.priceOffset;
        if (b) base += b.price;
    }
    return Math.max(base, 5);
}

function updateModalPrice() {
    document.getElementById('modal-total-price').textContent = `R$ ${calculateCurrentPrice().toFixed(2)}`;
}

function addToCartFromModal() {
    if (!currentCustomizingProduct) return;
    const obs = document.getElementById('modal-obs').value;

    let details = currentCustomizingProduct.isPizza ? `${sizes.find(x => x.id === selectedSize).name} • ${borders.find(x => x.id === selectedBorder).name}` : 'Gelada';

    cart.push({
        cartId: Date.now(),
        name: currentCustomizingProduct.name,
        image: currentCustomizingProduct.image,
        details,
        observation: obs,
        price: calculateCurrentPrice()
    });

    updateCartUI();
    closeCustomizeModal();
    toggleCart();
    showToast("Item adicionado à sacola!");
}

// --- CART & SIDEBAR ---
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('hidden');
}

function removeFromCart(cartId) {
    cart = cart.filter(x => x.cartId !== cartId);
    updateCartUI();
    showToast("Item removido.");
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    badge.textContent = cart.length;
    if (cart.length > 0) {
        badge.classList.remove('scale-0');
        badge.classList.add('scale-100');
    } else {
        badge.classList.remove('scale-100');
        badge.classList.add('scale-0');
    }

    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-20 space-y-3">
                <i data-lucide="shopping-bag" class="w-12 h-12 text-stone-600 mx-auto"></i>
                <p class="text-stone-400 text-xs font-medium">Sua sacola está vazia</p>
                <button onclick="toggleCart(); switchView('cardapio')" class="text-xs font-bold text-amber-400 hover:underline">Ver cardápio</button>
            </div>
        `;
        document.getElementById('cart-subtotal').textContent = 'R$ 0,00';
        document.getElementById('cart-total').textContent = 'R$ 0,00';
        lucide.createIcons();
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price;
        return `
            <div class="flex items-start justify-between gap-4 py-3">
                <div class="flex gap-3">
                    <img src="${item.image}" alt="" class="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10">
                    <div class="space-y-1">
                        <h4 class="font-bold text-xs text-white">${item.name}</h4>
                        <p class="text-[10px] text-stone-400">${item.details}</p>
                        ${item.observation ? `<p class="text-[10px] text-amber-400 font-medium">Obs: ${item.observation}</p>` : ''}
                        <p class="text-xs font-extrabold text-amber-400">R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.cartId})" class="text-stone-500 hover:text-red-400 transition-colors p-1">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
    }).join('');

    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `R$ ${subtotal.toFixed(2)}`;
    lucide.createIcons();
}

// --- CHECKOUT FLOW ---
function openCheckoutModal() {
    if (cart.length === 0) return;
    toggleCart();
    document.getElementById('modal-checkout').classList.remove('hidden');
    document.getElementById('modal-checkout').classList.add('flex');
    lucide.createIcons();
}

function closeCheckoutModal() {
    document.getElementById('modal-checkout').classList.add('hidden');
    document.getElementById('modal-checkout').classList.remove('flex');
}

function autofillAddress() {
    document.getElementById('checkout-cep').value = '80010-000';
    document.getElementById('checkout-street').value = 'Rua XV de Novembro';
    document.getElementById('checkout-number').value = '1000';
    document.getElementById('checkout-complement').value = 'Apto 42B';
    showToast("Endereço preenchido via GPS/CEP!");
}

function simulateCepSearch(cep) {
    if (cep.replace(/\D/g, '').length === 8) {
        document.getElementById('checkout-street').value = 'Av. Comendador Araújo';
        document.getElementById('checkout-number').value = '500';
        showToast("CEP localizado com sucesso!");
    }
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;

    currentActiveOrder = {
        id: Math.floor(1000 + Math.random() * 9000),
        name,
        phone,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    closeCheckoutModal();
    cart = [];
    updateCartUI();

    const btnStatus = document.getElementById('btn-order-status');
    btnStatus.classList.remove('hidden');
    btnStatus.classList.add('flex');
    document.getElementById('status-order-id').textContent = currentActiveOrder.id;

    startLiveOrderSimulation();
    openOrderStatusModal();
    showToast("Pedido confirmado!");
}

// --- LIVE ORDER STATUS TRACKER WITH TIMER & EVALUATION ---
function openOrderStatusModal() {
    document.getElementById('modal-order-status').classList.remove('hidden');
    document.getElementById('modal-order-status').classList.add('flex');
    lucide.createIcons();
}

function closeOrderStatusModal() {
    document.getElementById('modal-order-status').classList.add('hidden');
    document.getElementById('modal-order-status').classList.remove('flex');
}

function startLiveOrderSimulation() {
    if (orderTimerInterval) clearInterval(orderTimerInterval);

    const step2Icon = document.getElementById('step-2-icon');
    const step3Icon = document.getElementById('step-3-icon');
    const step3Text = document.getElementById('step-3-text');
    const step4Icon = document.getElementById('step-4-icon');
    const step4Text = document.getElementById('step-4-text');
    const evaluationBox = document.getElementById('order-evaluation-box');

    // Reset UI
    step2Icon.className = "w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shrink-0 animate-pulse";
    step2Icon.textContent = "✓";
    step3Icon.className = "w-6 h-6 rounded-full bg-dark-800 border border-white/10 text-stone-500 flex items-center justify-center font-bold shrink-0";
    step3Icon.textContent = "3";
    step3Text.className = "font-bold text-stone-500";
    step4Icon.className = "w-6 h-6 rounded-full bg-dark-800 border border-white/10 text-stone-500 flex items-center justify-center font-bold shrink-0";
    step4Icon.textContent = "4";
    step4Text.className = "font-bold text-stone-500";
    evaluationBox.classList.add('hidden');

    let elapsed = 0;
    orderTimerInterval = setInterval(() => {
        elapsed += 1;

        if (elapsed === 8) {
            // Saiu para entrega
            step2Icon.classList.remove('animate-pulse');
            step3Icon.className = "w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shrink-0 animate-pulse";
            step3Icon.textContent = "✓";
            step3Text.className = "font-bold text-white";
        }

        if (elapsed === 16) {
            // Entregue + Avaliação
            step3Icon.classList.remove('animate-pulse');
            step4Icon.className = "w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shrink-0";
            step4Icon.textContent = "✓";
            step4Text.className = "font-bold text-white";
            evaluationBox.classList.remove('hidden');
            clearInterval(orderTimerInterval);
        }
    }, 1000);
}

function setRating(stars) {
    selectedRating = stars;
    const starBtns = document.querySelectorAll('.star-btn');
    starBtns.forEach((btn, index) => {
        if (index < stars) {
            btn.classList.add('text-amber-400');
            btn.classList.remove('text-stone-600');
        } else {
            btn.classList.remove('text-amber-400');
            btn.classList.add('text-stone-600');
        }
    });
}

function submitEvaluation() {
    const comment = document.getElementById('eval-comment').value;
    showToast(`Obrigado pela avaliação de ${selectedRating} estrelas!`);
    closeOrderStatusModal();
    document.getElementById('btn-order-status').classList.add('hidden');
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'glass-panel bg-dark-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3 text-xs font-semibold';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-amber-400"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
