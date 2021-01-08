import {addCartItem, getProductID} from "../api.js";
import Rating from "../components/Rating.js";
import parseURL from "../utils.js";


const ProductScreen = {

    after_render : async()=>{
        const add_btn = document.getElementById("add-button");
        if(add_btn){
            add_btn.addEventListener("click",async()=>{
                const select_ele = document.getElementsByClassName("qty-select")[0];
                const product_Qty = select_ele.value;
                const productID = select_ele.id;
                if(localStorage.getItem('Access_Token') && localStorage.getItem('Username')){
                    await addCartItem({product_Qty,productID});
                    document.location.hash = '/cart';
                    return;
                }
                else{
                    alert('you need to login first');
                    document.location.hash = '/';
                    return;
                }
            })
        }
        
    },

    render:async()=>{
        const request = parseURL();
        const id = request.id;
        var product = await getProductID(id);

        if(product.error){
            return `<div><h1>${product.error}</h1></div>`
        }
        product = product.product;
        return `

            <div class="content">
            <div class="back-to-result">
                <a href="/#/">Back to result </a>
            </div>
            <div class="details">
                <div class="details-image">
                <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="details-info">
                <ul>
                    <li>
                    <h1>${product.name}</h1>
                    </li>
                    <li>
                    ${Rating.render({
                    value: product.rating,
                    text: `${product.numReviews} reviews`,
                    })}
                    </li>
                    <li>
                    Price: <strong>$${product.price}</strong>
                    </li>
                    <li>
                    Description:
                    <div>
                        ${product.description}
                    </div>
                    </li>
                    <li>
                    Qty: 
                    <select class="qty-select" id="${product._id}">
                    ${[...Array(product.countInStock).keys()].map((x) =>
                        product.qty === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option  value="${x + 1}">${x + 1}</option>`
                    )}
                    </select>
                    </li>
                </ul>
                </div>
                <div class="details-action">
                    <ul>
                    <li>
                        Price: $${product.price}
                    </li>
                    <li>
                        Status : 
                        ${
                            product.countInStock > 0
                            ? `<span class="success">In Stock</span>`
                            : `<span class="error">Unavailable</span>`
                        }
                    </li>
                    <li>
                        ${
                            product.countInStock > 0
                            ? `<button id="add-button" class="fw primary">Add to Cart </div>`
                            : `<button id="add-button" class="fw" disabled>Add to Cart </div>`
                        }
                    </li>
                    </ul>
                </div>
            </div>
            </div>`;
    }
}
export default ProductScreen;