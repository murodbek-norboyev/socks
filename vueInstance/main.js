const app = Vue.createApp({
    // dinamik ma`lumotlar
    data() {
        return {
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks'
        }
    },
})

//Elementga ulanish
app.mount('#app')