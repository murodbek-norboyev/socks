app.component('product-form', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
<div>
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
</div>`
})