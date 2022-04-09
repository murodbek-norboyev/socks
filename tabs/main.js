const app = Vue.createApp({
    data() {
        return {
            premium: true,
            cart: []
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeById(id) {
            const index = this.cart.indexOf(id)

            if(index > -1) {
                this.cart.splice(index, 1)
            }
        }
    }
})