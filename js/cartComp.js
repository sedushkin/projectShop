Vue.component ('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            imgCatalog: 'https://placehold.it/50x100',
            inBasket: [],
            isVisible: false,
            totalPrice: '',
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
        generateBasket() {
            let totalPrice =0;
            this.inBasket.forEach((product) => {
                if (product.price !== undefined) {
                    totalPrice = totalPrice + product.price*product.quantity;
                }
            });
            this.totalPrice = totalPrice;
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.inBasket.push(el);
                }
            });
        this.generateBasket();
    },
    template: `<div class="headerCart">
                            <button class="btn-cart" type="button" @click = "isVisible=!isVisible" >Корзина</button>
                            <div class="dropCart" v-if="isVisible">
                               <div class="cart-item" data-id="product.id_product">
                                    <div class="product-cartTable" v-for="product in inBasket">
                                        <img :src="imgCatalog" alt="Some image">
                                        <div class="product-desc">
                                            <p class="product-title">{{product.product_name}}</p>
                                            <p class="product-quantity">Количество: {{product.quantity}}</p>
                                            <p class="product-single-price">{{product.price}} за ед.</p>
                                            <button class="del-btn" data-id="product.id_product" :id="product.id_product" @click="deleteProduct(product)">x</button>
                                        </div>
                                    </div>
                                    <div class="right-cartBlock">
                                        <p class="product-price">Стоимость товаров: {{totalPrice}} ₽</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
});