const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

// Fixed: works on a copy so sorting preserves the original product order.
// Search, category, and sorting are applied to the same result in sequence.
function getFiltered() {
  let result = [...products];
  const search = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  if (search) {
    // Fixed: matches any part of the name without case sensitivity.
    result = result.filter((p) => p.name.toLowerCase().includes(search));
  }

  if (category !== "all") {
    // Fixed: keeps only the selected category within the search results.
    result = result.filter((p) => p.category === category);
  }

  // Fixed: ascending and descending options use the correct price order.
  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

// Fixed: replaces old cards and counts only the filtered products.
function render() {
  const items = getFiltered();
  grid.replaceChildren();
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  countEl.textContent = items.length;
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

// Fixed: resets every control and immediately restores the full catalog.
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";
  render();
});

// Fixed: displays all products when the page first loads.
render();
