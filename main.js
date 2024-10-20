const products = document.querySelectorAll('.product');
const containers = document.querySelectorAll('.container');
const basket = document.getElementById('basket');
const wrapper = document.querySelector('.shop-wrapper');

let isInBasket = false;

products.forEach(dragAndDrop);

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
  });
});

function dragAndDrop(product) {
  product.addEventListener('dragstart', () =>
    product.classList.add('dragging')
  );
  product.addEventListener('dragend', () =>
    product.classList.remove('dragging')
  );

  let isDragging = false;

  product.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    moveAt(e.touches[0]);
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
        product.style.top = '';
        product.style.left = '';
        isInBasket = false;
      }
    }
  });
}

function moveAt(touch, product) {
  product.style.top = `${
    touch.clientY - wrapper.offsetTop - product.offsetHeight / 2
  }px`;
  product.style.left = `${
    touch.clientX - wrapper.offsetLeft - product.offsetWidth / 2
  }px`;
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
    console.log('мы над корзиной');
  }
}

function addToBasket(product) {
  containers.forEach((container) => {
    container.appendChild(product);
  });
}
