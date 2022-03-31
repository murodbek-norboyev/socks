const app = Vue.createApp({
    // dinamik ma`lumotlar
    data() {
        return {
            product: 'Socks',
            image: '/assets/images/vmSocks-green-onWhite.jpg',
            altText: 'A pair of socks',
            productLink: '/product',
            // yangi ma`lumot xususiyati
            inStock: true,
            onSale: true,
            inventory: 100
        }
    },
})

//Elementga ulanish
app.mount('#app')