const products = document.querySelectorAll('.product');
const basket = document.getElementById('basket');
const wrapper = document.querySelector('.shop-wrapper');
const btnPay = document.querySelector('.btn-pay');

let offsetX, offsetY;
let isInBasket = false;
let countPrdoctInBasket = 0;

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

products.forEach(dragAndDrop);

function dragAndDrop(product) {
  if (isTouchDevice()) {
    mobileMove(product);
  } else {
    desktopMove(product);
  }
}

function desktopMove(product) {
  product.addEventListener('dragstart', () =>
    product.classList.add('dragging')
  );
  product.addEventListener('dragend', () => {
    product.classList.remove('dragging');
    if (isInBasket) {
      addToBasket(product);
      onProductAdd();
      isInBasket = false;
    }
  });
}

function mobileMove(product) {
  let isDragging = false;

  product.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    setPosition(e.touches[0], product);
  });

  product.addEventListener('touchmove', (e) => {
    if (isDragging) {
      product.classList.add('dragging');
      moveAt(e.touches[0], product);
      checkDropZone(e.touches[0]);
    }
  });

  product.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      product.classList.remove('dragging');
      if (isInBasket) {
        addToBasket(product);
        onProductAdd();
        product.style.top = '';
        product.style.left = '';
        isInBasket = false;
      }
    }
  });
}

basket.addEventListener('dragover', (e) => {
  e.preventDefault();
  isInBasket = true;
});

function addToBasket(product) {
  basket.appendChild(product);
}

function onProductAdd() {
  countPrdoctInBasket += 1;
  if (countPrdoctInBasket >= 3) {
    btnPay.classList.add('active');
  }
}

function setPosition(touch, product) {
  offsetX = touch.clientX - product.offsetLeft;
  offsetY = touch.clientY - product.offsetTop;
}
function moveAt(touch, product) {
  product.style.left = touch.clientX - offsetX + 'px';
  product.style.top = touch.clientY - offsetY + 'px';
}

function checkDropZone(touch) {
  const rect = basket.getBoundingClientRect();
  if (
    touch.clientX >= rect.left &&
    touch.clientX <= rect.right &&
    touch.clientY >= rect.top &&
    touch.clientY <= rect.bottom
  ) {
    isInBasket = true;
  }
}
