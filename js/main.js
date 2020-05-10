'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';




const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        inBasket: [],
        filtered:[],
        imgCatalog: 'img/1.jpg',
        isVisible: false,
        searchLine: '',
        searchVisible: true,
        id_product: '',
        price: '',
        totalPrice: '',
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
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let find = this.inBasket.find(isProduct => isProduct.id_product === product.id_product);
                    if (find) {
                        find.quantity++;
                        this.generateBasket();
                    } else {
                        let productsToBasket = {
                        id_product: product.id_product,
                        product_name: product.product_name,
                        price: product.price,
                        img: product.img,
                        quantity: 1,
                        };
                        this.inBasket.push(productsToBasket);
                        this.generateBasket();
                    }
                } else {
                    alert('Error');
                }
            })
        },

        deleteProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                            this.generateBasket();
                        } else {
                            let element;
                            this.inBasket.forEach(function (isProduct, i) {
                                let id = isProduct.id_product;
                                if (product.product_id == id) {
                                    element = i;
                                }
                            });
                            this.inBasket.splice(element, 1);
                            this.generateBasket();
                        }
                    }
                })
        },

        getfilter(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },

        generateBasket() {
            let totalPrice =0;
            this.inBasket.forEach((product) => {
                if (product.price !== undefined) {
                    totalPrice = totalPrice + product.price*product.quantity;
                }
            });
            this.totalPrice = totalPrice;
        }
    },

    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        this.filtered = this.products;
        this.generateBasket();
    },
});
