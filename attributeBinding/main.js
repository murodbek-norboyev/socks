const app = Vue.createApp({
    // dinamik ma`lumotlar
    data() {
        return {
            product: 'Socks',
            image: 'vmSocks-green-onWhite.jpg',
            altText: 'A pair of socks',
            productLink: '/product'
        }
    },
})

//Elementga ulanish
app.mount('#app')