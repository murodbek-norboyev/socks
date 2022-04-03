const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            // new data
            brand: 'Vue Mastery',
            altText: 'A pair of socks',
            details: [
                '80% cotton',
                '20% polyester',
                'Gender-neutral'
            ],
            variants: [{
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: '/assets/images/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: '/assets/images/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            cart: 0,
            selectedVariant: 0,
            onSale: true
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
            this.total = this.cart * this.price
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        // Qachon title chaqirilsa, u birlashadi brand va product yangi satrga aylanadi va satrni qaytaradi.
        title() {
            return this.brand + ' ' + this.product
        },
        // variants massiv ichidagi element index bo`yicha olib ichidagi obyektdan varinatImage qiymatini qaytaradi
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            // variants massiv ichidagi element index bo`yicha olib ichidagi obyektdan variantQuantity dan sonini olamzi
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
            // agar sotuvda mavjud bo`lsa
                return this.title + ' ' + 'are on sale!'
            }
            // agar sotuvda mavjud bo`lmasa
            return this.title + ' ' + 'are not sale'
        }
    }
})

//Elementga ulanish
app.mount('#app')