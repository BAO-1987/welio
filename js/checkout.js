/* ========================================
   WELIO — Checkout Page JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Package Selection & Price Update
  const packages = document.querySelectorAll('.checkout__package-radio');
  const subtotalEl = document.querySelector('.checkout__subtotal');
  const shippingEl = document.querySelector('.checkout__shipping-cost');
  const totalEl = document.querySelector('.checkout__total');
  const productQtyEl = document.querySelector('.checkout__product-qty');
  
  const priceData = {
    '1': { price: 59, shipping: 5.99, qty: '1 Bottle' },
    '2': { price: 99, shipping: 0, qty: '2 Bottles' },
    '3': { price: 135, shipping: 0, qty: '3 Bottles' }
  };
  
  function updateSummary(packageValue) {
    const data = priceData[packageValue];
    if (!data) return;
    
    subtotalEl.textContent = `$${data.price.toFixed(2)}`;
    shippingEl.textContent = data.shipping === 0 ? 'FREE' : `$${data.shipping.toFixed(2)}`;
    shippingEl.classList.toggle('checkout__shipping-cost--free', data.shipping === 0);
    
    const total = data.price + data.shipping;
    totalEl.textContent = `$${total.toFixed(2)}`;
    productQtyEl.textContent = data.qty;
  }
  
  packages.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateSummary(e.target.value);
    });
  });
  
  // URL parameter handling
  const urlParams = new URLSearchParams(window.location.search);
  const packageParam = urlParams.get('package');
  
  if (packageParam && priceData[packageParam]) {
    const targetRadio = document.querySelector(`.checkout__package-radio[value="${packageParam}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
      updateSummary(packageParam);
    }
  }
  
  // Form Validation & Submit
  const form = document.querySelector('.checkout__form-wrapper');
  const submitBtn = document.querySelector('.checkout__submit');
  
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const requiredInputs = form.querySelectorAll('.checkout__input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
      input.classList.remove('checkout__input--error');
      
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('checkout__input--error');
        input.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (isValid) {
      // Show success message
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your order! (This is a demo)');
        submitBtn.textContent = 'Complete Order';
        submitBtn.disabled = false;
      }, 1500);
    } else {
      // Scroll to first error
      const firstError = form.querySelector('.checkout__input--error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });
  
  // Card Number Formatting
  const cardInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = value.substring(0, 19);
    });
  }
  
  // Expiry Date Formatting
  const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      e.target.value = value.substring(0, 5);
    });
  }
  
  // CVC Limit
  const cvcInput = document.querySelector('input[placeholder="123"]');
  if (cvcInput) {
    cvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
  
  // ZIP Code Limit
  const zipInput = document.querySelector('input[placeholder="10001"]');
  if (zipInput) {
    zipInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
    });
  }
  
});
