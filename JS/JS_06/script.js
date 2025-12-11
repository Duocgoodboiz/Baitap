const products = [
  { id: 1, name: "iPhone 14 Pro Max", price: 27000000 },
  { id: 2, name: "Samsung Galaxy S23 Ultra", price: 24500000 },
  { id: 3, name: "MacBook Air M2", price: 26990000 },
  { id: 4, name: "Sony PlayStation 5", price: 12500000 },
  { id: 5, name: "Apple Watch Series 8", price: 9500000 },
  { id: 6, name: "Xiaomi 13 Pro", price: 18000000 },
  { id: 7, name: "iPad Gen 10", price: 10500000 },
  { id: 8, name: "AirPods Pro 2", price: 5800000 },
];

const searchInput = document.getElementById("searchInput");
const productListElement = document.getElementById("productList");

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function renderProducts(list) {
  productListElement.innerHTML = "";

  if (list.length === 0) {
    productListElement.innerHTML =
      '<div class="not-found">Không tìm thấy sản phẩm phù hợp</div>';
    return;
  }

  list.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");

    productDiv.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="product-price">${formatCurrency(product.price)}</span>
        `;

    productListElement.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(keyword);
  });

  renderProducts(filteredProducts);
});

renderProducts(products);
