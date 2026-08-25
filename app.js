/* =========================================================
   app.js
   제품 목록을 products.json 에서 불러와 화면에 그리고,
   검색어 / 카테고리 버튼으로 필터링합니다.
   ※ 이 파일은 로직 담당입니다. 제품을 추가/수정하려면
     이 파일이 아니라 products.json 을 편집하세요.

   사진을 넣고 싶다면 products.json의 각 항목에 "image" 값으로
   이미지 경로(예: "images/pvc-101.jpg")를 추가하면 자동으로 그 사진이 쓰이고,
   없으면 카테고리별 기본 아이콘이 대신 표시됩니다.
   ========================================================= */

let ALL_PRODUCTS = [];
let activeCategory = "전체";
let searchTerm = "";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("product-search");
const filterBar = document.getElementById("category-filters");
const emptyState = document.getElementById("product-empty");

/* 카테고리별 기본 아이콘 (사진이 없을 때 대신 보여줌) */
const CATEGORY_ICONS = {
  "난연 PVC 파이프": `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="15" stroke="currentColor" stroke-width="2.2"/>
    <circle cx="24" cy="24" r="8.5" stroke="currentColor" stroke-width="2.2"/>
    <line x1="24" y1="9" x2="24" y2="15.5" stroke="currentColor" stroke-width="2.2"/>
    <line x1="24" y1="32.5" x2="24" y2="39" stroke="currentColor" stroke-width="2.2"/>
  </svg>`,
  "소방 배관자재": `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8c5 6 8 11 8 15.5C32 29 28.4 33 24 33s-8-4-8-9.5C16 19 19 14 24 8Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M14 40h20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M24 33v7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,
  "이음관·부속자재": `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14v8a10 10 0 0 0 10 10h8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="4" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2.2"/>
    <rect x="26" y="26" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2.2"/>
  </svg>`,
  "보온·단열자재": `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16c8-6 24-6 32 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M8 24c8-6 24-6 32 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M8 32c8-6 24-6 32 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,
};
const DEFAULT_ICON = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="9" y="9" width="30" height="30" rx="3" stroke="currentColor" stroke-width="2.2"/>
  <path d="M9 19h30M19 9v30" stroke="currentColor" stroke-width="2.2"/>
</svg>`;

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
    .map((p) => {
      const thumb = p.image
        ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
        : CATEGORY_ICONS[p.category] || DEFAULT_ICON;
      return `
      <div class="product-card">
        <div class="product-thumb${p.image ? " has-photo" : ""}">${thumb}</div>
        <div class="product-body">
          <span class="p-code mono">${p.code}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <span class="p-cat-tag">${p.category}</span>
        </div>
      </div>`;
    })
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
