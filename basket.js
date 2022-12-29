"use strict";

const cartIconWrapEl = document.querySelector('.cartIconWrap')
const basketCounterEl = document.querySelector('.cartIconWrap span')
const basketAllPriceEl = document.querySelector('.basketTotal span')
const basketTotalEl = document.querySelector('.basketTotal')
const basketEl = document.querySelector('.basket')

cartIconWrapEl.addEventListener('click', () => {
    document.querySelector('.basket').classList.toggle('hidden');
    });


const basket = {};

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCard(id, name, price);

});


let basketCount = 0


function addToCard(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0
        };
    }
    basket[id].count += 1;
    basketCount++
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketAllPriceEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}


function getTotalBasketCount() {
    let totalCount = 0
    console.log(Object.values(basket))
    const objBasketValue = Object.values(basket)
    for (let i = 0; i < objBasketValue.length; i++) {
        totalCount = totalCount + objBasketValue[i].count
    }
    return totalCount;
}


function getTotalBasketPrice() {
    let totalPrice = 0;
    const objBasketValue = Object.values(basket);
    for (let i = 0; i < objBasketValue.length; i++) {
        totalPrice = totalPrice + objBasketValue[i].price * objBasketValue[i].count;
    }
    return totalPrice;
}


function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
    } else {
        basketRowEl.querySelector('.productCount').textContent = basket[id].count;
        basketRowEl.querySelector('.productTotalRow').
            textContent = basket[id].count * basket[id].price;
    }
}


function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}