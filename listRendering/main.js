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
            //massiv
            details: [
                '80% cotton',
                '20% polyester',
                'Gender-neutral'
            ],
            sizes: [
                'S',
                'M',
                'XL',
                'XXL'
            ],
            variants: [{
                    variantId: 2234,
                    variantColor: 'green'
                },
                {
                    variantId: 2235,
                    variantColor: 'blue'
                }
            ]
        }
    },
})

//Elementga ulanish
app.mount('#app')