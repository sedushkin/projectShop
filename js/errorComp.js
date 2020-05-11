Vue.component ('error', {

    data () {
      return {
          isError: false,
          thatError: '',
      }
    },

    methods: {
        error(thatError) {
        this.isError = true;
        this.thatError = thatError;
        console.log(thatError);
        }
    },

    template: `<div v-if="isError"> Ой, кажется ошибочка: <br> {{thatError}}</div>`

    }

);