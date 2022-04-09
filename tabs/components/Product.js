app.component(
    'product', {
        props: {
            premium: {
                type: Boolean,
                requried: true
            }
        },
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
          <div class="actions">
          <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
          :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
          {{variant.variantColor}}
      </div>

      <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to
          cart</button>

      <button v-on:click="removeFromCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
          Remove from cart
      </button>
      </div>
        </div>
        </div>
        <product-form :reviews="reviews"></product-form>
        <product-review @review-submitted="addReview"></product-review>

        `,
        data() {
            return {
                product: 'Socks',
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
                selectedVariant: 0,
                reviews: []
            }
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },
            removeFromCart() {
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
            },
            updateProduct(index) {
                this.selectedVariant = index
            },
            addReview(productReview) {
                this.reviews.push(productReview)
            }

        },
        computed: {
            title() {
                return this.brand + ' ' + this.product
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping() {
                if (this.premium) {
                    return 'Free'
                } else {
                    return 2.99
                }
            },
        }
    }
)