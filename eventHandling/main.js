const app = Vue.createApp({
    // dinamik ma`lumotlar
    data() {
        return {
            product: 'Socks',
            image: '/assets/images/vmSocks-green-onWhite.jpg',
            altText: 'A pair of socks',
            price: 150,
            total: 0,
            inStock: true,
            details: [
                '80% cotton',
                '20% polyester',
                'Gender-neutral'
            ],
            variants: [{
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: '/assets/images/vmSocks-green-onWhite.jpg'
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: '/assets/images/vmSocks-blue-onWhite.jpg'
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
            this.total = this.cart * this.price
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        decrement(){
            this.cart != 0 ? this.cart -= 1 : NaN
            this.total != 0 ? this.total -= 150 : NaN
        }
    },
})

//Elementga ulanish
app.mount('#app')