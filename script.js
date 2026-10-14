const products = [
  { id: 1, name: "Laptop", price: 1200, inStock: true },
  { id: 2, name: "Phone", price: 800, inStock: true },
  { id: 3, name: "Headphones", price: 150, inStock: false },
  { id: 4, name: "Smart Watch", price: 300, inStock: true },
  { id: 5, name: "Keyboard", price: 120, inStock: false },
  { id: 6, name: "Mouse", price: 50, inStock: true },
  { id: 7, name: "Monitor", price: 600, inStock: true },
  { id: 8, name: "Tablet", price: 450, inStock: false },
  { id: 9, name: "Speaker", price: 200, inStock: true },
  { id: 10, name: "Camera", price: 950, inStock: false },
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const stockBtn = document.getElementById("stockBtn");
const allProductsBtn = document.getElementById("allProductsBtn");
const cheapBtn = document.getElementById("cheapBtn");
const expensiveBtn = document.getElementById("expensiveBtn");
const sortPriceBtn1 = document.getElementById("sortPriceBtn1");
const sortPriceBtn2 = document.getElementById("sortPriceBtn2");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const clearCartBtn = document.getElementById("clearCartBtn");
const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");
const applyFilterBtn = document.getElementById("applyFilterBtn");
const toggleFiltersBtn = document.getElementById("toggleFiltersBtn");
const filtersContainer = document.querySelector(".filters")
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn")

const savedCart = localStorage.getItem("cart");

let cart = [];

if (savedCart !== null) {
  cart = JSON.parse(savedCart);
}

renderProducts(products);

function renderProducts(productsToShow) {
  productList.innerHTML = "";

  if (productsToShow.length === 0) {
  productList.textContent = "No products found.";
  return;
  }

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h3");
    const productPrice = document.createElement("p");
    const productStock = document.createElement("p");
    const addToCartBtn = document.createElement("button");

    productName.textContent = product.name;
    productPrice.textContent = `price:$${product.price}`;
    productStock.textContent = product.inStock ? "In Stock" : "Out of Stock";
    addToCartBtn.textContent = "Add to Cart";

    if (product.inStock === false) {
      ///////!product.inStock
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "Unavailable";
    }

    addToCartBtn.addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      ///این خط ارایه کارت رو ب صورت رشته تبدیل میکنه و با کلید کارت ذخیره میکنه
      renderCart();
    });

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productStock);
    productCard.appendChild(addToCartBtn);

    productList.appendChild(productCard);
  });
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    let emptyText = document.createElement("p");
    emptyText.textContent = "Your cart is empty";
    cartList.appendChild(emptyText);
  }

  clearCartBtn.disabled = cart.length === 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement("p");
    cartItem.classList.add("cart-item");
    cartItem.textContent = `${product.name} - $${product.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    cartItem.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1); //////رای حذف، اضافه‌کردن یا جایگزین‌کردن عناصر آرایه
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartList.appendChild(cartItem);
  });

  cartCount.textContent = cart.length;

  //const total = cart.reduce((sum, product) => sum + product.price, 0);
  const total = cart.reduce((sum, product) => {
    return sum + product.price;
  },0);

  // cartTotal.textContent = `Total: $${total}`;

  let discount = 0;
  if (total >= 1500) {
    discount = 0.1 * total;
  }
  const finalTotal = total - discount;
  const remaining = 1000 - finalTotal;

  cartTotal.textContent = `Final Total: $${finalTotal} | discount: $${discount}`;

  if (discount > 0) {
    cartTotal.textContent += " | 10% Discount Applied!";
  }

  let shipping = 0;
  if (cart.length > 0 && finalTotal < 1000) {
    shipping = 50;
  }
  const amountToPay = finalTotal + shipping;
  cartTotal.textContent += ` | shipping : $${shipping} | AmountToPay : $${amountToPay}`;

  if (cart.length > 0 && finalTotal < 1000) {
  cartTotal.textContent += ` | Add $${remaining} more for free shipping!`;
  }

}

clearCartBtn.addEventListener("click", () => {
  const answer = confirm("Are you sure you want to clear the cart?");
  if (answer === false) {
  return;
  }
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

renderCart();



toggleFiltersBtn.addEventListener("click",()=>{

    filtersContainer.classList.toggle("show");

    if (filtersContainer.classList.contains("show")) {
        toggleFiltersBtn.textContent = "✕ Close Filters";
        toggleFiltersBtn.setAttribute("aria-expanded", "true");
    } else {
        toggleFiltersBtn.textContent = "☰ Filters";
        toggleFiltersBtn.setAttribute("aria-expanded", "false");
    }

});

// 
themeToggleBtn.addEventListener("click",()=>{
   document.body.classList.toggle("dark-mode");
   const isDarkMode = document.body.classList.contains("dark-mode");
   localStorage.setItem("darkMode", isDarkMode);
   if (isDarkMode) {
    themeToggleBtn.textContent = "☀️ Light Mode";
   } else {
   themeToggleBtn.textContent = "🌙 Dark Mode";
}
})
const savedTheme = localStorage.getItem("darkMode");
if (savedTheme === "true") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️ Light Mode";
}


///تابع بستن فیلتر در منوی همبرگری
function closeFilters() {
    filtersContainer.classList.remove("show");
    toggleFiltersBtn.textContent = "☰ Filters";
    toggleFiltersBtn.setAttribute("aria-expanded", "false");
}

//// کاربر بتونه با زدن کلید اسکیپ روی کیبورد، منوی فیلتر رو ببنده
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeFilters();
    }
});

///////وقتی کاربر چیزی تایپ می‌کنه
// محصولاتی که اسمشون شامل اون متن هست جدا کنیم.
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue);
  });

  renderProducts(filteredProducts);
});

stockBtn.addEventListener("click", () => {
  const productStocked = products.filter((product) => product.inStock === true);

  renderProducts(productStocked);
  closeFilters()
});
allProductsBtn.addEventListener("click", () => {
  renderProducts(products);
  closeFilters()
});
cheapBtn.addEventListener("click", () => {
  const cheapProduct = products.filter((product) => product.price < 500);
  renderProducts(cheapProduct);
  closeFilters();
});
expensiveBtn.addEventListener("click", () => {
  const expensiveProducts = products.filter((product) => product.price > 500);
  renderProducts(expensiveProducts);
  closeFilters();
});
applyFilterBtn.addEventListener("click", () => {
  const minPrice = Number(minPriceInput.value);
  const maxPrice = maxPriceInput.value === "" ? Infinity : Number(maxPriceInput.value);
      if (minPrice > maxPrice) {
           alert("Min Price cannot be greater than Max Price");
           return;
      }
  const filteredProducts = products.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });
  renderProducts(filteredProducts);
  closeFilters();
});

resetFiltersBtn.addEventListener("click", () => {
  minPriceInput.value="";
  maxPriceInput.value="";
  searchInput.value = "";
  renderProducts(products);
});


sortPriceBtn1.addEventListener("click", () => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  renderProducts(sortedProducts);
  closeFilters();
});
sortPriceBtn2.addEventListener("click", () => {
  const sortedProducts = [...products].sort((a, b) => b.price - a.price);
  renderProducts(sortedProducts);
  closeFilters();
});

