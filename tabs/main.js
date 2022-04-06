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
        }
    }
})


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
            <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
                {{variant.variantColor}}
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to
                cart</button>
        </div>
    </div>


    <product-tabs :reviews="reviews"></product-tabs>
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

app.component(
    'product-review', {
        template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
    <p>
        <label for="name">Name:</label> 
        <input id="name" v-model="name" placeholder="name"> 
    </p>
    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
        Yes
        <input type="radio" v-model="recommend" value="Yes">
    </label>
    <label>
        No
        <input type="radio" v-model="recommend" value="No">
    </label>
    

    <p>
        <input type="submit" value="Submit">
    </p>
    </form>
    `,
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                recommend: null,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                this.errors = []
                if (this.name && this.review && this.rating) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,
                        recommend: this.recommend
                    }

                    this.$emit('review-submitted', productReview)


                    this.name = null
                    this.review = null
                    this.rating = null,
                        this.recommend = null

                } else {
                    if (!this.name) this.errors.push('Name required')
                    if (!this.review) this.errors.push('Review required')
                    if (!this.rating) this.errors.push('Rating required')
                }
            }
        }
    }
)

app.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab"
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab = tab">{{ tab }}</span>
        </div>

        <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
                <p>{{ review.name }}</p>
                <p>{{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>{{ review.recommend }}</p>
            </li>
        </ul>
    </div>

    <div  v-show="selectedTab === 'Make a Review'">
        <product-review @review-submitted="addReview"></product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    },
})

app.mount('#app')