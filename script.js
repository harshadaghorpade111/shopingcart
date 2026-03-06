let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

function addToCart(name,price){

let item = cart.find(p=>p.name===name);

if(item){
item.qty++;
}else{
cart.push({name,price,qty:1});
}

saveCart();
alert("Item added to cart");
}

function updateCart(){

let cartTable = document.getElementById("cart-items");
let totalEl = document.getElementById("total");
let emptyMsg = document.getElementById("empty-msg");

if(!cartTable) return;

cartTable.innerHTML="";
let total=0;

if(cart.length===0){
emptyMsg.style.display="block";
}else{
emptyMsg.style.display="none";
}

cart.forEach((item,index)=>{

let subtotal=item.price*item.qty;
total+=subtotal;

let row=document.createElement("tr");

row.innerHTML=`
<td>${item.name}</td>
<td>₹${item.price}</td>
<td>
<button onclick="decrease(${index})">-</button>
${item.qty}
<button onclick="increase(${index})">+</button>
</td>
<td>₹${subtotal}</td>
<td><button onclick="removeItem(${index})">Remove</button></td>
`;

cartTable.appendChild(row);

});

totalEl.textContent=total;

saveCart();
}

function increase(i){
cart[i].qty++;
updateCart();
}

function decrease(i){
if(cart[i].qty>1){
cart[i].qty--;
}
updateCart();
}

function removeItem(i){
cart.splice(i,1);
updateCart();
}

function clearCart(){
cart=[];
updateCart();
}

function checkout(){

if(cart.length===0){
alert("Your cart is empty!");
return;
}

alert("Order placed successfully!");
cart=[];
updateCart();
}

updateCart();