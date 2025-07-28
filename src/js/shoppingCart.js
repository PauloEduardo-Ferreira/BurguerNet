  class ShoppingCart {
        constructor() {
          this.items = [];
          this.cartSidebar = document.getElementById('cart-sidebar');
          this.cartBackdrop = document.getElementById('cart-backdrop');
          this.cartItemsContainer = document.getElementById('cart-items');
          this.cartTotalEl = document.getElementById('cart-total');
          this.cartCountEls = [document.getElementById('cart-count'), document.getElementById('cart-count-mobile')];
          this.cartEmptyMsg = document.getElementById('cart-empty-msg');
          this.checkoutBtn = document.getElementById('checkout-btn');
          this.clearCartBtn = document.getElementById('clear-cart-btn');
          this.init();
        }

        init() {
          document.getElementById('close-cart-btn').addEventListener('click', () => this.toggle());
          this.cartBackdrop.addEventListener('click', () => this.toggle());
          this.clearCartBtn.addEventListener('click', () => this.clear());

          this.cartItemsContainer.addEventListener('click', (e) => {
            const removeItemBtn = e.target.closest('.remove-item');
            const quantityChangeBtn = e.target.closest('.quantity-change');

            if (removeItemBtn) {
              this.removeItem(removeItemBtn.dataset.name);
            } else if (quantityChangeBtn) {
              this.updateQuantity(quantityChangeBtn.dataset.name, parseInt(quantityChangeBtn.dataset.change));
            }
          });
          
          this.render();
        }

        toggle() {
          this.cartSidebar.classList.toggle('translate-x-full');
          this.cartBackdrop.classList.toggle('hidden');
        }

        addItem(item) {
          const existingItem = this.items.find(i => i.name === item.name);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            this.items.push({ ...item, quantity: 1 });
          }
          this.render();
        }
        
        removeItem(itemName) {
          this.items = this.items.filter(i => i.name !== itemName);
          this.render();
        }

        updateQuantity(itemName, change) {
          const item = this.items.find(i => i.name === itemName);
          if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
              this.removeItem(itemName);
            } else {
              this.render();
            }
          }
        }
        
        clear() {
          this.items = [];
          this.render();
        }

        calculateTotal() {
          return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }

        render() {
          this.cartItemsContainer.innerHTML = '';
          
          if (this.items.length === 0) {
            this.cartItemsContainer.appendChild(this.cartEmptyMsg);
            this.cartEmptyMsg.style.display = 'block';
            this.checkoutBtn.disabled = true;
          } else {
            this.cartEmptyMsg.style.display = 'none';
            this.checkoutBtn.disabled = false;
            this.items.forEach(item => {
              const itemEl = document.createElement('div');
              itemEl.className = 'flex justify-between items-center mb-4';
              itemEl.innerHTML = `
                <div>
                  <h4 class="font-bold">${item.name}</h4>
                  <p class="text-gray-400">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-3">
                  <button class="quantity-change text-lg" data-name="${item.name}" data-change="-1">-</button>
                  <span class="font-bold">${item.quantity}</span>
                  <button class="quantity-change text-lg" data-name="${item.name}" data-change="1">+</button>
                  <button class="remove-item text-red-500 hover:text-red-400 ml-3" data-name="${item.name}"><i class="fa-solid fa-trash"></i></button>
                </div>
              `;
              this.cartItemsContainer.appendChild(itemEl);
            });
          }
          
          const total = this.calculateTotal();
          this.cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

          const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
          this.cartCountEls.forEach(el => {
            if (totalItems > 0) {
              el.textContent = totalItems;
              el.classList.remove('hidden');
            } else {
              el.classList.add('hidden');
            }
          });
        }
      }