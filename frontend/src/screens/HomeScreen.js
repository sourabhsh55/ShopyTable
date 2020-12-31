import Rating from "../components/Rating.js";
import {getallProducts} from "../api.js";

const HomeScreen = {

    render : async()=>{
        const product = await getallProducts();
        return `
        <ul class="products">
            ${product.map((product)=>`
                <li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}" />
                        </a>
                        <div class="product-name">
                            <a href="/#/product/${product._id}"> ${product.name} </a>
                        </div>
                        <div class="product-rating">
                            ${Rating.render({value:product.rating})}
                        </div>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-price">$${product.price}</div>
                    </div>
                </li>
            `).join('\n')}
        `
    }
}

export default HomeScreen;