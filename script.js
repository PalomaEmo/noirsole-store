let cart = JSON.parse(localStorage.getItem("noirsoleCart") || "[]");

function saveCart(){
  localStorage.setItem("noirsoleCart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function addToCart(name, price){
  cart.push({name, price});
  saveCart();
  openCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  saveCart();
}

function updateCartCount(){
  const el=document.getElementById("cartCount");
  if(el) el.textContent=cart.length;
}

function money(n){
  return new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(n);
}

function renderCart(){
  const box=document.getElementById("cartItems");
  const total=document.getElementById("cartTotal");
  if(!box || !total) return;
  if(!cart.length){
    box.innerHTML='<p class="empty">Tu carrito está vacío.</p>';
    total.textContent="$0 MXN";
    return;
  }
  box.innerHTML=cart.map((item,i)=>`
    <div class="cart-row">
      <span>${item.name}<br><small>${money(item.price)}</small></span>
      <button onclick="removeFromCart(${i})" style="background:none;border:0;color:#ff303d;cursor:pointer">REMOVE</button>
    </div>`).join("");
  total.textContent=money(cart.reduce((sum,item)=>sum+item.price,0));
}

function openCart(){
  document.getElementById("cartPanel")?.classList.add("open");
  document.getElementById("cartBackdrop")?.classList.add("open");
}
function closeCart(){
  document.getElementById("cartPanel")?.classList.remove("open");
  document.getElementById("cartBackdrop")?.classList.remove("open");
}

function renderCheckout(){
  const box=document.getElementById("checkoutItems");
  const total=document.getElementById("checkoutTotal");
  if(!box || !total) return;
  if(!cart.length){
    box.innerHTML='<p class="muted">No hay productos en el carrito.</p>';
    total.textContent="$0 MXN";
    return;
  }
  box.innerHTML=cart.map(item=>`
    <div class="summary-row"><span>${item.name}</span><strong>${money(item.price)}</strong></div>
  `).join("");
  total.textContent=money(cart.reduce((sum,item)=>sum+item.price,0));
}

updateCartCount();
renderCart();
