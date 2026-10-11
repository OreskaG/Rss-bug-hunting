const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

// Fixed: each Add to Cart button passes its product ID to the handler.
function renderProducts() {
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p>`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => addToCart(p.id));
    card.appendChild(btn);
    productsEl.appendChild(card);
  });
}

// Fixed: repeated additions increase quantity instead of creating duplicate rows.
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return;
  }
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  renderCart();
}

// Fixed: increases the selected item's quantity by one.
function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty++;
  renderCart();
}

// Fixed: decreases quantity without allowing it to fall below one.
function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  if (item.qty > 1) item.qty--;
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

// Fixed: applies a 10% discount only for SALE10 and resets it for other codes.
function applyPromo() {
  discount = promoInput.value === "SALE10" ? 0.1 : 0;
  renderCart();
}

// Fixed: removes every item from the cart.
function clearCart() {
  cart = [];
  renderCart();
}

// Fixed: recalculates line totals, the numeric subtotal, and the item count.
// An empty cart displays its message, a zero badge, and a zero total.
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let itemCount = 0;
  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `<span>${item.name}</span>
      <button class="qty-btn" data-act="dec">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" data-act="inc">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove">✕</button>`;
    li.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    li.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    li.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
    cartItemsEl.appendChild(li);
    total += lineTotal;
    itemCount += item.qty;
  });

  if (discount) {
    total = total - total * discount;
  }

  badgeEl.textContent = itemCount;
  totalEl.textContent = total;
  emptyMsg.hidden = cart.length > 0;
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
