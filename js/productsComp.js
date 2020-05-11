Vue.component ('products', {
    // props:['filtered'],
    data() {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            products: [],
            id_product: '',
            price: '',
        };
    },

    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.$root.$refs.search.filtered.push(el);
                }
            });
    },

    template: ` <div class="products featured center">
            <div class="product-item" :id="id_product" v-for="product of $root.$refs.search.filtered" :key="product.id_product">
                <img :src="imgCatalog" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)" :id="id_product">Купить</button>
                <div v-if="products.lenght == 0">Нет данных</div>
                </div>
            </div>
        </div>`

});