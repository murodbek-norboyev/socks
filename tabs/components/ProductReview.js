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