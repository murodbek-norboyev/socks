const app = Vue.createApp({
    data() {
        return {
            premium: true,
            // cart ni ildiz ga qaytaramiz
            cart: []
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
            console.log(id)
        },
    }
})


// Yangi component yaratish
app.component(
    //compnent nomi
    'product', {
        props: {
            premium: {
                type: Boolean,
                requried: true
            }
        },
        // html content
        template: `
        <div class="product">
        <div class="product-image">
            <img v-bind:src="image" :alt="altText" />
        </div>

        <div class="product-info">            
            <h1>{{ title }}</h1>
            <p>Shipping: {{ shipping }}</p>

            <p v-if="inStock">In Stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            
            <h2>Details</h2>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>

            <h3>Colors</h3>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                :style="{backgroundColor: variant.variantColor}"
                 @mouseover="updateProduct(index)">
                {{variant.variantColor}}
            </div>

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button>
        </div>
    </div>
        `,
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
                        variantQuantity: 2
                    }
                ],
                selectedVariant: 0
            }
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
            shipping() {
                if (this.premium) {
                    return 'Free'
                } else {
                    return 2.99
                }
            }
        }
    }
)


app.mount('#app')