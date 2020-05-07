'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'img/',
        isVisible: false,
        searchLine: '',
        searchVisible: true,

    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){

            console.log(product.id_product);
        }
    },

    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
    computed: {
        getfilter(searchLine){
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    this.searchVisible=true;
                } else {
                    this.searchVisible=false;
                }
            })
        },




    },
});








//
//
// class List {
//     constructor(url, container,list=listContext) {
//         this.container = container;
//         this.goods = [];
//         this.allProducts = [];
//         this.url = url;
//         this.list = list;
//         this.filter();
//         this._init();
//     }
//
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     handleData(data){
//         this.goods = [...data];
//         this._render();
//     }
//
//     _render() {
//         const block = document.querySelector(this.container);
//
//         for (let product of this.goods) {
//             const productObject = new this.list[this.constructor.name] (product);
//             this.allProducts.push(productObject);
//             block.insertAdjacentHTML('beforeend', productObject.render());
//         }
//     }
//     calcSum() {
//
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//
// }
//
// class Item {
//     constructor(product, img = 'img/1.jpg') {
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.id_product = product.id_product;
//         this.img = img;
//     }
//
//     render() {
//         return ``;
//
//     }
// }
//
//
//
// class ProductList extends List{
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init() {
//         document.querySelector(this.container).addEventListener('click', element => {
//             if (element.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(element.target);
//             }
//         });
//     }
//
// }
// class ProductItem extends Item {
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price} ₽</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                 </div>
//             </div>`;
//     }
// }
// class Cart extends List {
//     constructor(container = '.dropCart', url = "/getBasket.json") {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//
//     }
//
//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                        this._render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//
//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
//         block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
//     }
//
//     _init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//         document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target);
//             }
//         })
//
//     }
// }
//
// class CartItem extends Item{
//     constructor(element, img = 'img/1.jpg'){
//         super(element, img);
//         this.quantity = element.quantity;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//             <div class="product-cartTable">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Количество: ${this.quantity}</p>
//         <p class="product-single-price">${this.price} за ед.</p>
//         </div>
//         </div>
//         <div class="right-cartBlock">
//             <p class="product-price">${this.quantity*this.price} ₽</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//     }
//
// }
//
// const listContext = {
//     ProductList: ProductItem,
//     Cart: CartItem
// };
// let cart = new Cart ();
// let products = new ProductList (cart);
//



