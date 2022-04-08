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