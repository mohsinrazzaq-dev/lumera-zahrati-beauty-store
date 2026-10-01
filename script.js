let cart = [];

function addToCart(name, price){
  cart.push({name, price});
  renderCart();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1800);
}
function removeFromCart(index){
  cart.splice(index,1);
  renderCart();
}
function renderCart(){
  document.getElementById('cartCount').textContent = cart.length;
  const box = document.getElementById('cartItems');
  const total = cart.reduce((s,i)=>s+i.price,0);
  document.getElementById('cartTotal').textContent = total.toFixed(3) + ' ر.ع';
  if(!cart.length){
    box.innerHTML = '<div class="empty">السلة فارغة حالياً 🛍️</div>';
    return;
  }
  box.innerHTML = cart.map((item,i)=>`
    <div class="cart-item">
      <div><strong>${item.name}</strong><br><small>${item.price.toFixed(3)} ر.ع</small></div>
      <button onclick="removeFromCart(${i})">×</button>
    </div>`).join('');
}
function openCart(){document.getElementById('cartModal').style.display='block'}
function closeCart(){document.getElementById('cartModal').style.display='none'}
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function focusSearch(){
  document.getElementById('shop').scrollIntoView({behavior:'smooth'});
  setTimeout(()=>document.querySelector('.filter')?.focus(),500);
}
document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.cat===f)?'block':'none';
    });
  });
});
function subscribe(e){
  e.preventDefault();
  const toast=document.getElementById('toast');
  toast.textContent='تم الاشتراك بنجاح ✓';
  toast.classList.add('show');
  setTimeout(()=>{toast.classList.remove('show');toast.textContent='تمت الإضافة إلى السلة ✓'},1800);
  e.target.reset();
}
