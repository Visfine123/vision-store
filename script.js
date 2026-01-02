let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = JSON.parse(localStorage.getItem("user"));

let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Wireless Headphones", price: 25, img: "./headphones.jpg" },
    { name: "Smart Watch", price: 40, img: "./smart watch.jpg" },
    { name: "Bluetooth speaker", price: 50, img: "./bluetooth.jpg" }

];

function show(page) {
    document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
    if (page === "cart") loadCart();
}

function renderProducts() {
    let box = document.getElementById("product-list");
    box.innerHTML = "";
    products.forEach(p => {
        box.innerHTML += `
<div class="product-card">
  <div class="img-box">
    <img src="${p.img}">
  </div>
  <div class="product-info">
    <h3>${p.name}</h3>
    <p class="price">$${p.price}</p>
    <button onclick="addToCart('${p.name}', ${p.price})">Add</button>
  </div>
</div>
`;
    });
    localStorage.setItem("products", JSON.stringify(products));
}
renderProducts();

function addProduct() {
    products.push({ name: pname.value, price: Number(pprice.value), img: pimg.value });
    renderProducts();
    alert("Product uploaded!");
}

function addToCart(name, price) {
    let found = cart.find(p => p.name === name);
    found ? found.qty++ : cart.push({ name, price, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function loadCart() {
    let box = document.getElementById("cart-items");
    let total = 0; box.innerHTML = "";
    cart.forEach((i, index) => {
        total += i.price * i.qty;
        box.innerHTML += `${i.name} x ${i.qty} = $${i.price * i.qty} <button onclick="removeItem(${index})">X</button><br>`;
    });
    document.getElementById("total").innerText = "Total: $" + total;
}

function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    if (!user) { show('login'); return; }
    show('payment');
}

function login() {
    user = { email: email.value };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Logged in");
    show("payment");
}
