'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url) => {
//     return new Promise( (resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState ===4) {
//                 if (xhr.status !==200) {
//                     reject ('Error');
//                 } else {
//                     resolve (xhr.responseText);
//                 }
//             }
//
//         };
//         xhr.send();
//         }
//     )
// };

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };


class List {
    constructor(url, container,list=listContext) {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.url = url;
        this.list = list;
        this._init();

       // // this._fetchProducts();
       //  this._render();
       //  //this._totalCartPrice();
       //  this._getProducts()
       //      .then(data => {
       //          this.goods = [...data];
       //          this._render();
       //      })

    }

    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 20000},
    //         {id: 2, title: 'Mouse', price: 1500},
    //         {id: 3, title: 'Keyboard', price: 5000},
    //         {id: 4, title: 'Gamepad', price: 4500},
    //     ]
    // }

    // _getProducts() {
    //     return fetch(`${API}/catalogData.json`)
    //         .then(response => response.json())
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData(data){
        this.goods = [...data];
        this._render();
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new this.list[this.constructor.name] (product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
    calcSum() {
        // return this.goods.reduce((sum, good) => sum + good.price, 0);
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    // _totalCartPrice() {
    //     let totalPrice = document.querySelector('.total');
    //     let summary = 0;
    //     this.goods.forEach(good => {
    //         summary += good.price;
    //     });
    //     totalPrice.innerText = `${summary}`;
    //
    // }


}

class Item {
    constructor(product, img = 'img/1.jpg') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }

    render() {
        return ``;
        // return `<div class="product-item" data-id="${this.id}">
        //         <img src="${this.img}" alt="Some img">
        //         <div class="desc">
        //             <h3>${this.title}</h3>
        //             <p>${this.price} \u20bd</p>
        //             <button class="buy-btn">Купить</button>
        //         </div>
        //     </div>`;
    }
}


// class ListCart {
//     constructor(busketContainer = '.dropCart') {
//         this.busketContainer = busketContainer;
//         this.goods = [];
//         this.allProducts = [];
//         this._getGoodsToBusket();
//     }
//     _getGoodsToBusket(){
//         let basketBtns = document.querySelectorAll('.buy-btn');
//         basketBtns.forEach(function (btn) {
//             btn.addEventListener('click', function (event) {
//                 let price = event.srcElement.dataset.price;
//                 let name = event.srcElement.dataset.name;
//                 this.goods({ price: price, name: name })
//             })
//         });
//     }
//     _removeGoodsFromBusket() {
//
//     }
//
//
//     _render() {
//
//     }
//
//
//
// }
//
// class ProductInCart {
//     constructor(product) {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//
//     }
//
//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.title}</h3>
//                     <p>${this.price} \u20bd</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`;
//     }
// }

class ProductList extends List{
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', element => {
            if (element.target.classList.contains('buy-btn')) {
                this.cart.addProduct(element.target);
            }
        });
    }

}
class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
    }
}
class Cart extends List {
    constructor(container = '.dropCart', url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });

    }

    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                       this._render();

                    }
                } else {
                    alert('Error');
                }
            })
    }

    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
        document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })

    }
}

class CartItem extends Item{
    constructor(element, img = 'img/1.jpg'){
        super(element, img);
        this.quantity = element.quantity;
    }
    render(){
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-cartTable">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-cartBlock">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }

}

const listContext = {
    ProductList: ProductItem,
    Cart: CartItem
};
let cart = new Cart ();
let products = new ProductList (cart);



//new ProductList();
//new ListCart();



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
