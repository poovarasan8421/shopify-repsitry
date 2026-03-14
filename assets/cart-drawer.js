import { DialogComponent } from '@theme/dialog';
import { CartAddEvent } from '@theme/events';

/**
 * A custom element that manages a cart drawer.
 *
 * @extends {DialogComponent}
 */
class CartDrawerComponent extends DialogComponent {
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(CartAddEvent.eventName, this.#handleCartAdd);
    setTimeout(() => {
          document.dispatchEvent(new CustomEvent('initSwiper'));
         
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(CartAddEvent.eventName, this.#handleCartAdd);
  }

  #handleCartAdd = () => {
    if (this.hasAttribute('auto-open')) {
      this.showDialog();
    }
  };

  open() {
    this.showDialog();
    /**
     * Close cart drawer when installments CTA is clicked to avoid overlapping dialogs
     */
    customElements.whenDefined('shopify-payment-terms').then(() => {
      const installmentsContent = document.querySelector('shopify-payment-terms')?.shadowRoot;
      const cta = installmentsContent?.querySelector('#shopify-installments-cta');
      cta?.addEventListener('click', this.closeDialog, { once: true });
    });

  //  if(updateKwikpssAccountBtn){
  // updateKwikpssAccountBtn && updateKwikpssAccountBtn()  
  // }  
    updateDOM();
  }

  close() {
    this.closeDialog();
  // if(updateKwikpssAccountBtn){
  //    updateKwikpssAccountBtn && updateKwikpssAccountBtn()  
  // } 
    updateDOM();
  }
}

if (!customElements.get('cart-drawer-component')) {
  customElements.define('cart-drawer-component', CartDrawerComponent);
  // if(updateKwikpssAccountBtn){
  // updateKwikpssAccountBtn && updateKwikpssAccountBtn()  
  // }
}
