

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this._render();
        this._totalCartPrice();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ]
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
    _totalCartPrice() {
        let totalPrice = document.getElementById('#totalPrice');
        let summary = 0;
        this.goods.forEach(good => {
            summary += good.price;
        });
        totalPrice.innerHTML = `${summary}`;

    }


}

class ProductItem {
    constructor(product, img = 'img/1.jpg') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}


class ListCart {


    
}

class ProductInCart {

}



new ProductList();




// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (title="Не указано", price=1) => {
//   return `<div class="product-item">
//             <h3>${title}</h3>
//             <p>${price}</p>
//             <button class="by-btn">Добавить в корзину</button>
//           </div>`;
// };
//
// const renderProducts = (list) => {
//    let productList  =[];
//    productList = list.map((good) => {
//     return renderProduct(good.title, good.price);
//    });
//   console.log(productList);
//   document.querySelector('.products').innerHTML = productList.join(' ');
//
// };
//
// renderProducts(products);