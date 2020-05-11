Vue.component ('search', {
    // props: ['products', 'searchLine'],
    data () {
        return {

            filtered:[],
        };
    },

    methods: {
        getfilter(){
            const regexp = new RegExp(this.$root.searchLine, 'i');
            this.filtered = this.$root.$refs.products.products.filter(product => regexp.test(product.product_name));
        },
    },

    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="$root.searchLine" placeholder="поиск...">
                    <button class="btn-search" type="submit" @click="$root.$refs.search.getfilter()">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});