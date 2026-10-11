const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        inStock: true
    },
    {
        id: 2,
        name: "Phone",
        price: 800,
        inStock: true
    },
    {
        id: 3,
        name: "Headphones",
        price: 150,
        inStock: false
    }
];



const productList=document.getElementById("productList");
const searchInput=document.getElementById("searchInput")
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
const minPriceInput=document.getElementById("minPriceInput")
const maxPriceInput=document.getElementById("maxPriceInput")
const applyFilterBtn=document.getElementById("applyFilterBtn")



const savedCart = localStorage.getItem("cart");

let cart = [];

if (savedCart !== null) {
    cart = JSON.parse(savedCart);
}

renderProducts(products);

function renderProducts(productsToShow) {
    productList.innerHTML = "";

    productsToShow.forEach((product) => {
    const productCard=document.createElement("div")
    productCard.classList.add("product-card")

    const productName=document.createElement("h3")
    const productPrice=document.createElement("p")
    const productStock=document.createElement("p")
    const addToCartBtn = document.createElement("button");
   
    productName.textContent=product.name
    productPrice.textContent=`price:$${product.price}`;    
    productStock.textContent=product.inStock ? "In Stock" : "Out of Stock";
    addToCartBtn.textContent = "Add to Cart";

    if (product.inStock === false) {
          addToCartBtn.disabled = true;
          addToCartBtn.textContent = "Unavailable";
     }
    
    addToCartBtn.addEventListener("click", () => {
           cart.push(product);
           localStorage.setItem("cart", JSON.stringify(cart));
           ///این خط ارایه کارت رو ب صورت رشته تبدیل میکنه و با کلید کارت ذخیره میکنه
           renderCart();
    });

    productCard.appendChild(productName)
    productCard.appendChild(productPrice)
    productCard.appendChild(productStock)
    productCard.appendChild(addToCartBtn);

    productList.appendChild(productCard)
});
}


function renderCart() {
    cartList.innerHTML = "";

    if (cart.length===0){
        let emptyText=document.createElement("p")
        emptyText.textContent="Your cart is empty"
         cartList.appendChild(emptyText);
    }
   
    clearCartBtn.disabled = cart.length === 0;

    cart.forEach((product,index) => {
        
        
         const cartItem = document.createElement("p");
         cartItem.textContent = `${product.name} - $${product.price}`;
        
         const removeBtn = document.createElement("button");
         removeBtn.textContent = "Remove";
         cartItem.appendChild(removeBtn);
         removeBtn.addEventListener("click", () => {
             cart.splice(index, 1);//////رای حذف، اضافه‌کردن یا جایگزین‌کردن عناصر آرایه
             localStorage.setItem("cart", JSON.stringify(cart));
             renderCart();
        });

        cartList.appendChild(cartItem);

    });

    cartCount.textContent=cart.length
    


    //const total = cart.reduce((sum, product) => sum + product.price, 0);
    const total=cart.reduce((sum,product)=>{
        return sum+product.price
    },0) 
    
    // cartTotal.textContent = `Total: $${total}`;

    let discount=0
    if(total>=1500){
            discount=0.1*total
    }
    const finalTotal=total-discount

    cartTotal.textContent = `Final Total: $${finalTotal} | discount: $${discount}`;

    if(discount>0){
        cartTotal.textContent += " | 10% Discount Applied!";
    }

    let shipping=0
    if(cart.length > 0 && finalTotal<1000){
        shipping=50
    }
    const amountToPay=finalTotal+shipping
    cartTotal.textContent += ` | shipping : $${shipping} | AmountToPay : $${amountToPay}`;

0
}

clearCartBtn.addEventListener("click",()=>{
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart()
}) 

renderCart();


applyFilterBtn.addEventListener("click",()=>{
        const minPrice=Number(minPriceInput.value)
        const maxPrice=Number(maxPriceInput.value)
        const filteredProducts=products.filter((product)=>{
            return  (product.price>=minPrice)&&(product.price<=maxPrice)
        })
        renderProducts(filteredProducts);
})

///////وقتی کاربر چیزی تایپ می‌کنه 
// محصولاتی که اسمشون شامل اون متن هست جدا کنیم.

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue);
    });

    renderProducts(filteredProducts);
});

stockBtn.addEventListener("click",()=>{

    const productStocked = products.filter((product) => product.inStock===true);

 renderProducts(productStocked);
})
allProductsBtn.addEventListener("click",()=>{

     renderProducts(products);
})
cheapBtn.addEventListener("click",()=>{
    const cheapProduct=products.filter((product) => product.price<500);
    renderProducts(cheapProduct);
})
expensiveBtn.addEventListener("click", () => {
    const expensiveProducts = products.filter((product) => product.price > 500);
    renderProducts(expensiveProducts);
});


sortPriceBtn1.addEventListener("click", () => {
        products.sort((a,b) => a.price-b.price)
        renderProducts(products);
})
sortPriceBtn2.addEventListener("click", () => {
        products.sort((a,b) => b.price-a.price)
        renderProducts(products);
})