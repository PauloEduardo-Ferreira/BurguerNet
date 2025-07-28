  class LandingPage {
        constructor(shoppingCart) {
          this.shoppingCart = shoppingCart;
          this.mobileMenuButton = document.getElementById('mobile-menu-button');
          this.mobileMenu = document.getElementById('mobile-menu');
          this.tabButtons = document.querySelectorAll('.tab-button');
          this.tabContents = document.querySelectorAll('.tab-content');
          this.addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
          this.cartButtons = [document.getElementById('cart-button'), document.getElementById('cart-button-mobile')];
          this.init();
        }

        init() {
          this.initMobileMenu();
          this.initTabs();
          this.initAddToCart();
          this.initCartToggle();
        }

        initMobileMenu() {
          if (!this.mobileMenuButton || !this.mobileMenu) return;
          this.mobileMenuButton.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
          });
        }

        initTabs() {
          if (this.tabButtons.length === 0) return;
          this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
              this.updateActiveTab(button);
              this.showTabContent(button.dataset.target);
            });
          });
        }

        initAddToCart() {
          this.addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              const name = e.target.dataset.name;
              const price = parseFloat(e.target.dataset.price);
              this.shoppingCart.addItem({ name, price });
            });
          });
        }
        
        initCartToggle() {
          this.cartButtons.forEach(button => {
            button.addEventListener('click', () => this.shoppingCart.toggle());
          });
        }

        updateActiveTab(activeButton) {
          this.tabButtons.forEach(btn => {
            btn.classList.remove('tab-active', 'text-white');
            btn.classList.add('text-gray-300');
          });
          activeButton.classList.add('tab-active', 'text-white');
          activeButton.classList.remove('text-gray-300');
        }

        showTabContent(targetId) {
          this.tabContents.forEach(content => {
            content.classList.toggle('hidden', content.id !== targetId);
          });
        }
      }

      // ===== Ponto de Entrada Principal (main.js) =====
      document.addEventListener('DOMContentLoaded', () => {
        const shoppingCart = new ShoppingCart();
        new LandingPage(shoppingCart);
      });