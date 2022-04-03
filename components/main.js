const app = Vue.createApp({
    data() {
        return {
            //ilovada komponent o'z otasidan ma'lumotlarni olishi kerak bo'ladi. Bunday holda, 
            //bizning product komponentimizning otasiga yozamiz.
            // Aytaylik, bizning ildiz namunamizda foydalanuvchining premium hisob egasi ekanligini 
            // ko'rsatadigan ba'zi foydalanuvchi ma'lumotlari mavjud. 
            // agar foydalanuvchi premium aʼzo boʻlsa, uning barcha joʻnatmalari bepul. 
            premium: true
        }
    },
})


// Yangi component yaratish
app.component(
    //compnent nomi
    'product', {
        /*
        Vue-da biz ma'lumot almashishning bunday turini boshqarish uchun rekvizitlar(props)dan foydalanamiz. 
        Rekvizitlar asosan o'zgaruvchilar bo'lib, otasi unga yuboradigan ma'lumotlar bilan to'ldirilishini kutadi.
        product komponentimizga rekvizit ob'ektini qo'shish orqali komponent qanday rekvizit olishni ko`ramiz .
        */
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
            <!-- computed image qiymati  -->
            <img v-bind:src="image" :alt="altText" />
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>

            <p v-if="inStock">In Stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            
            <!-- Propsni ko\`rsatish uchun element
            <p>User is premium: {{ premium }}</p>
            -->
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>


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

            <div class="cart">
                <p>Cart ({{ cart }})</p>
            </div>
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
                        variantQuantity: 0
                    }
                ],
                cart: 0,
                selectedVariant: 0
            }
        },
        methods: {
            addToCart() {
                this.cart += 1
                this.total = this.cart * this.price
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
                /*
                Endi biz rekvizitimizdan ( this.premium) foydalanmoqdamiz va u toʻgʻri boʻlganda 
                shipping “Bepul” ni qaytaradi. Aks holda, u 2.99 ni qaytaradi.
                */
                if (this.premium) {
                    return 'Free'
                } else {
                    return 2.99
                }
            }
        }
    }
)

app.component(
    'detail', {
        template: `
        <h1>
        Details
        </h1>
        `
    }
)

app.mount('#app')