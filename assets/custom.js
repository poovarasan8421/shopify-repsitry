
function colorswatch(){
  const drawer = document.querySelector('.custom-color-swatchdrawer');
  const drawerinner = document.querySelector('.custom-color-swatchdrawer .color-swatch-drawer-inner');
  const openBtn = document.querySelector('.moreless-button');
  // const openBtn = document.querySelectorAll('.moreless-button');
  const closeBtn = document.querySelector('.close-svg');
  const quickclsBtn = document.querySelector('.quick-add-modal__close');
  const header = document.querySelector('.header-section');
   let originalHeaderZ = '';
  if (!drawer || !openBtn || !closeBtn) return;

  // Open drawer
  openBtn.addEventListener('click', function (event) {
    event.stopPropagation(); // stop event before it reaches document
    drawer.classList.add('active');
    originalHeaderZ = header.style.zIndex;
    console.log(originalHeaderZ, 'originalHeaderZ');
    header.style.zIndex = '1';
    document.documentElement.setAttribute('scroll-lock', 'true'); 
    if(quickclsBtn){
    quickclsBtn.style.display="none";
    }
  });
  
//   const openBtns = document.querySelectorAll('.moreless-button');
//   // Open drawer
// openBtns.forEach((btn) => {
//   btn.addEventListener('click', function (event) {
//     event.stopPropagation(); // stop event before it reaches document
//     drawer.classList.add('active');
//     originalHeaderZ = header.style.zIndex;
//     console.log(originalHeaderZ, 'originalHeaderZ');
//     header.style.zIndex = '1';
//     document.documentElement.setAttribute('scroll-lock', 'true');
//     if (quickclsBtn) {
//       quickclsBtn.style.display = "none";
//     }
//   });
// });

  drawerinner.addEventListener('click', (event) => {
      event.stopPropagation(); 
   });
   drawer.addEventListener('click', function (event) {
    event.stopPropagation();
    drawer.classList.remove('active');
    document.documentElement.removeAttribute('scroll-lock');
    header.style.zIndex = originalHeaderZ; 
    if(quickclsBtn){
    quickclsBtn.style.display="flex";
    }
  });
  // Close drawer with close button
  closeBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    drawer.classList.remove('active');
    document.documentElement.removeAttribute('scroll-lock');
    header.style.zIndex = originalHeaderZ; 
    if(quickclsBtn){
    quickclsBtn.style.display="flex";
    }
  });

  // Prevent clicks inside the drawer from closing it
  drawer.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Close drawer when clicking outside
  document.addEventListener('click', function () {
    if (drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      document.documentElement.removeAttribute('scroll-lock'); 
      header.style.zIndex = originalHeaderZ;
      if(quickclsBtn){
       quickclsBtn.style.display="flex";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  colorswatch();
});
document.addEventListener('cartChange', () => {
  colorswatch();
});


// // Cart Drawer Recomended Section Js Start
function cartRecommend() {
  const recommended_swiper = document.querySelector(
    '.cart__recommended_product .cart__recommended_product_slide'
  );

  if (recommended_swiper) {
    new Swiper(recommended_swiper, {
      slidesOffsetAfter: 25,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1.1,
          spaceBetween: 8,
          slidesOffsetAfter: 20,
        },
        450: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          slidesOffsetAfter: 30,
        },
        750: {
          slidesPerView: 1.8,
          spaceBetween:10,
        },
      },

      watchOverflow: true,
      centeredSlidesBounds: true,
    });
  }
}

cartRecommend();
document.addEventListener('initSwiper', cartRecommend);
document.addEventListener("cartChange", cartRecommend);

//  class HotSpots extends HTMLElement {
//   constructor() {
//     super();
//     this.el = this;
//   }

//   connectedCallback() {
//     this.buttons = this.querySelectorAll('[data-button]');
//     this.blockContainer = this.querySelector('[data-block-container]');
//     this.hotspotBlocks = this.querySelectorAll('.swiper-slide');

//     this._initSwiper();
//     this._bindEvents();
//   }

//   _initSwiper() {
//     this.swiper = new Swiper(this.blockContainer, {
//       slidesPerView: 1,
//       spaceBetween: 0,
//       autoHeight: true,
//       allowTouchMove: true,
//     });
//   }

//   _bindEvents() {
//     this.buttons.forEach(button => {
//       const id = button.dataset.button;
//       button.addEventListener('click', e => {
//         e.preventDefault();
//         e.stopPropagation();
//         this._showContent(id);
//       });
//     });

//     this.swiper.on('slideChange', () => {
//       const currentSlide = this.swiper.slides[this.swiper.activeIndex];
//       const id = currentSlide.dataset.hotspotBlock;
//       this.buttons.forEach(btn => {
//         btn.classList.toggle('is-active', btn.dataset.button === id);
//       });
//     });

//     document.addEventListener('shopify:block:select', (e) => {
//       const blockId = e.detail.blockId;
//       this._showContent(blockId);
//     });
//   }

//  _showContent(id) {
//   // Find all blocks inside Swiper
//   const allBlocks = this.blockContainer.querySelectorAll('.hotspot-content__block');

//   allBlocks.forEach(block => {
//     if (block.dataset.hotspotBlock === id) {
//       block.style.display = 'block';   // Show selected
//       block.classList.add('is-active');
//     } else {
//       block.style.display = 'none';    // Hide others
//       block.classList.remove('is-active');
//     }
//   });
// }

// }

// customElements.define('hot-spots', HotSpots);

// Initialize Swiper
const hotspotSwiper = new Swiper('.hotspots__content.swiper-container', {
  slidesPerView: 1,
  loop: false, // or true if you want looping
  effect: 'fade', // smooth fade
  fadeEffect: { crossFade: true },
  allowTouchMove: false,
  scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
  speed: 500, // transition duration

   navigation: {
    nextEl: '.hotspots__content .swiper-button-next',
    prevEl: '.hotspots__content .swiper-button-prev',
  },

});

// Connect buttons to slides
document.querySelectorAll('.hotspots__buttons button[data-button]').forEach(button => {
  button.addEventListener('click', () => {
    const blockId = button.dataset.button;
    // Find corresponding slide
    const slide = document.querySelector(`.hotspot-content__block[data-hotspot-block="${blockId}"]`);
    if (!slide) return;
    const index = Array.from(slide.parentNode.children).indexOf(slide);

    // Slide to the target
    hotspotSwiper.slideTo(index, 500); // 500ms smooth transition
  });
});

// Update is-active class when slide changes
hotspotSwiper.on('slideChange', () => {
  const slides = document.querySelectorAll('.hotspot-content__block');
  slides.forEach(slide => slide.classList.remove('is-active'));
  slides[hotspotSwiper.activeIndex].classList.add('is-active');
});

document.addEventListener("DOMContentLoaded", () => {
  const cartRec = document.querySelectorAll('.cart-drawer__inner .quick-add');
  console.log(cartRec, 'cartRec');
  const cart_cls_btn = document.querySelector('.cart-items-component .cart-drawer__close-button');
  if (!cartRec.length) return; // exit if no quick-add buttons found

  cartRec.forEach((item) => {
    item.addEventListener('click', () => {
      document.documentElement.classList.add("scroll-lock");
    });
  });
  cart_cls_btn.addEventListener('click', () => {
    document.documentElement.classList.remove("scroll-lock");
  });
 const dialog = document.querySelector('.cart-drawer .dialog-modal');

if (dialog) {
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();

    // Check if click is outside the dialog content area
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      document.documentElement.classList.remove('scroll-lock');
    }
  });
}
});


document.addEventListener("DOMContentLoaded", () => {
  let startY = 0;

  const selectors = document.querySelectorAll(
    '.header-section .menu-drawer__menu-item--mainlist, .header__drawer--mobile .button-with-logo .menu-drawer__close-button'
  );

  selectors.forEach(el => {

    el.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', e => {
      const endY = e.changedTouches[0].clientY;

      // Tap (not scroll)
      if (Math.abs(startY - endY) < 10) {
        e.preventDefault();

        // Link → navigate
        if (el.tagName === 'A' && el.href) {
          window.location.href = el.href;
        }

        // Button → close drawer
        if (el.tagName === 'BUTTON') {
          el.click();
        }
      }
    }, { passive: false });

  });
});




// document.addEventListener('click', function(e) {
//   const btn = e.target.closest('.product-information__grid .button[id^=BuyButtons-ProductSubmitButton-].atc-added');
//   if (!btn) return;

//   // const ripple = document.createElement('span');
//   // ripple.classList.add('ripple-effect');

//   const rect = btn.getBoundingClientRect();
//   const size = Math.max(rect.width, rect.height);
//   ripple.style.width = ripple.style.height = size + 'px';
//   ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
//   ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

//   btn.appendChild(ripple);

//   setTimeout(() => ripple.remove(), 600); // remove after animation
// });

// document.addEventListener('click', function(e) {
//   const btn = e.target.closest('#md-sticky-atc');
//   if (!btn) return;

//   // const ripple = document.createElement('span');
//   // ripple.classList.add('ripple-effect');

//   const rect = btn.getBoundingClientRect();
//   const size = Math.max(rect.width, rect.height);
//   ripple.style.width = ripple.style.height = size + 'px';
//   ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
//   ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

//   // btn.appendChild(ripple);

//   setTimeout(() => ripple?.remove(), 600); // remove after animation
// });

  
 