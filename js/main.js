/**
 * WELIO — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 1. Trust Bar Marquee (CSS-based, no JS needed)
  // ========================================
  // Marquee animation is handled purely by CSS

  // ========================================
  // 2. Reviews Slider
  // ========================================
  const reviewsSlider = document.querySelector('.reviews-slider');
  if (reviewsSlider) {
    new Swiper('.reviews-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  // ========================================
  // 2B. Product Slider
  // ========================================
  const productSliderEl = document.querySelector('.product-slider');
  if (productSliderEl) {
    const productSwiper = new Swiper(productSliderEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 400,
      pagination: {
        el: '.product-pagination',
        clickable: true,
      },
    });
  }

  // ========================================
  // 2C. Before & After Slider (Auto-play)
  // ========================================
  const beforeAfterSlider = document.querySelector('.before-after-slider');
  if (beforeAfterSlider) {
    new Swiper('.before-after-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      navigation: {
        nextEl: '.before-after-next',
        prevEl: '.before-after-prev',
      },
      pagination: {
        el: '.before-after-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
        },
        1024: {
          slidesPerView: 2,
          centeredSlides: false,
        },
      },
    });
  }

  // ========================================
  // 3. FAQ Accordion
  // ========================================
  const faqQuestions = document.querySelectorAll('.faq__question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      
      // Close all other answers
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const answer = q.nextElementSibling;
        if (answer) {
          answer.style.maxHeight = null;
        }
      });
      
      // Toggle current answer
      if (!isActive) {
        this.classList.add('active');
        const answer = this.nextElementSibling;
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // ========================================
  // 4. Smooth Scroll for Anchor Links
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // 5. Mobile Menu Toggle
  // ========================================
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
  
  if (burger && mobileMenu) {
    // Toggle menu on burger click
    burger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ========================================
  // 6. Symptom Checklist Counter
  // ========================================
  const checkboxes = document.querySelectorAll('.symptom-checklist__checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const checkedCount = document.querySelectorAll('.symptom-checklist__checkbox:checked').length;
      
      // Update closer text dynamically based on count
      const closer = document.querySelector('.symptom-checklist__closer p');
      if (closer && checkedCount >= 2) {
        closer.innerHTML = `You checked <strong>${checkedCount}</strong> symptoms. This isn't aging. This isn't hormones. There's a hidden reason your body feels this way. <strong>And it's fixable.</strong>`;
      }
    });
  });

  // ========================================
  // 7. Scroll Animations (Hero only)
  // ========================================
  const animateHero = () => {
    const heroElements = document.querySelectorAll('.hero__benefit, .hero__badge, .hero__title, .hero__cta');
    
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      
      // Animate immediately since hero is visible on load
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  };
  
  // Initialize hero animation
  animateHero();

  // ========================================
  // 8. Header Scroll Effect
  // ========================================
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (header) {
      // Add shadow on scroll
      if (currentScrollY > 0) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = '';
      }
    }
    
    lastScrollY = currentScrollY;
  });

  // ========================================
  // 9. Pricing Card Hover Effects
  // ========================================
  const pricingCards = document.querySelectorAll('.pricing__card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Remove scale from popular card when hovering others
      pricingCards.forEach(c => {
        if (c !== this && c.classList.contains('pricing__card--popular')) {
          c.style.transform = 'scale(1)';
        }
      });
    });
    
    card.addEventListener('mouseleave', function() {
      // Restore scale to popular card
      pricingCards.forEach(c => {
        if (c.classList.contains('pricing__card--popular')) {
          c.style.transform = 'scale(1.05)';
        }
      });
    });
  });

});
