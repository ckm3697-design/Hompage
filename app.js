/* =========================================================
   app.js
   제품 목록을 products.json 에서 불러와 화면에 그리고,
   검색어 / 카테고리 버튼으로 필터링합니다.
   ※ 이 파일은 로직 담당입니다. 제품을 추가/수정하려면
     이 파일이 아니라 products.json 을 편집하세요.
   ========================================================= */

let ALL_PRODUCTS = [];
let activeCategory = "전체";
let searchTerm = "";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("product-search");
const filterBar = document.getElementById("category-filters");
const emptyState = document.getElementById("product-empty");

function renderCategoryButtons(categories) {
  const cats = ["전체", ...categories];
  filterBar.innerHTML = cats
    .map(
      (c) =>
        `<li><button class="cat-btn${c === activeCategory ? " active" : ""}" data-cat="${c}">
          <span>${c}</span>
          <span class="mono">${c === "전체" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter((p) => p.category === c).length}</span>
        </button></li>`
    )
    .join("");

  filterBar.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderCategoryButtons(categories);
      renderProducts();
    });
  });
}

function renderProducts() {
  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "전체" || p.category === activeCategory;
    const haystack = (p.name + " " + p.desc + " " + p.category).toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  grid.innerHTML = filtered
    .map(
      (p) => `
      <div class="product-card">
        <span class="p-code mono">${p.code}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <span class="p-cat">${p.category}</span>
      </div>`
    )
    .join("");
}

async function init() {
  try {
    const res = await fetch("products.json");
    ALL_PRODUCTS = await res.json();
    const categories = [...new Set(ALL_PRODUCTS.map((p) => p.category))];
    renderCategoryButtons(categories);
    renderProducts();
  } catch (err) {
    grid.innerHTML = `<p style="padding:24px;color:#B23A2E;">제품 목록을 불러오지 못했습니다. GitHub Pages로 배포된 주소에서 열어야 정상적으로 표시됩니다. (파일을 더블클릭해서 여는 경우 동작하지 않습니다)</p>`;
  }
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

init();
