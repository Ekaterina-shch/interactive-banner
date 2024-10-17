const products = document.querySelectorAll('.product');
const containers = document.querySelectorAll('.container');
const basket = document.getElementById('basket');
const wrapper = document.querySelector('.shop-wrapper');

products.forEach(handleDrag);

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
  });
});

function handleDrag(product) {
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
      moveAt(e.touches[0]);
      checkDropZone(e.touches[0]);
    }
  });

  product.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      product.classList.remove('dragging');
      if (basket.classList.contains('active')) {
        addToBasket();
        product.style.top = '';
        product.style.left = '';
        basket.classList.remove('active');
      }
    }
  });

  function moveAt(touch) {
    product.style.top = `${
      touch.pageY - wrapper.offsetTop - product.offsetHeight / 2
    }px`;
    product.style.left = `${
      touch.pageX - wrapper.offsetLeft - product.offsetWidth / 2
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
      basket.classList.add('active');
    }
  }

  function addToBasket() {
    basket.appendChild(product);
  }
}
