'use strict';

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

document.querySelector('.cartIconWrap').addEventListener('click', event => {
    document.querySelector('.basket').classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = featuredItemEl.dataset.price;
    addToCart(id, name, price);
});


function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = totalCount().toString();
    basketTotalValueEl.textContent = totalPrice();
    basketInform(id);
};

function totalCount() {
    return Object.values(basket).reduce((accumulate, curr) => accumulate + curr.count, 0);
}

function totalPrice() {
    return Object.values(basket).reduce((accumulate, curr) => curr.price * curr.count + accumulate, 0);
}

function basketInform(currentId) {
    const basketIn = document.querySelector(`.basketRow[data-currentId="${currentId}"]`);
    if (!basketIn) {
        basketForm(currentId);
        return;
    }
    const curr = basket[currentId];
    basketIn.querySelector('.productCount').textContent = curr.count;
    basketIn.querySelector('.productTotalRow').textContent = curr.price * curr.count;
}

function basketForm(currentId) {
    const productRow = `
      <div class="basketRow" data-currentId="${currentId}">
        <div>${basket[currentId].name}</div>
        <div>
          <span class="productCount">${basket[currentId].count}</span> шт.
        </div>
        <div>$${basket[currentId].price}</div>
        <div>
        $<span class="productTotalRow">${(basket[currentId].price * basket[currentId].count)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);

}


/*
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    document.querySelector('.basket').classList.toggle('hidden');
});

const cart = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in cart)) {
        cart[id] = { id: id, name: name, price: price, count: 0 };
    }
    cart[id].count++;
    document.querySelector('.cartIconWrap span').textContent = totalCount();
    document.querySelector('.basketTotalValue').textContent = totalPrice();
    cartRender(id);
};

function totalCount() {
    return Object.values(cart).reduce((accumulator, currentItem) => accumulator + currentItem.count, 0);
};

function totalPrice() {
    return Object.values(cart).reduce((accumulator, currentItem) => currentItem.count * currentItem.price + accumulator, 0);
};

function cartRender(currentItemId) {
    const cartEl = document.querySelector(`.basketRow[data-currentItemId="${currentItemId}"]`);
    if (!cartEl) {
        cartRenderNew(currentItemId);
        return;
    }
    const currentItem = cart[currentItemId];
    cartEl.querySelector('.cartCount').textContent = currentItem.count;
    cartEl.querySelector('.cartTotalPrice').textContent = currentItem.price * currentItem.count;
};

function cartRenderNew(currentItemId) {
    const currentRow = `
        <div class="basketRow" data-currentItemId="${currentItemId}">
            <div>${cart[currentItemId].name}</div>
            <div>
                <span class="cartCount">${cart[currentItemId].count}</span>шт.
            </div>
            <div>${cart[currentItemId].price}$</div>
            <div>
                <span class="cartTotalPrice">${(cart[currentItemId].price * cart[currentItemId].count)}</span>$
            </div>
        </div>`;
    document.querySelector('.basketTotal').insertAdjacentHTML("beforebegin", currentRow);
};
*/