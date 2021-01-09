import { checkIsAdmin, newProduct } from "../api.js";

const AddProductScreen = {

    after_render : async()=>{
        const btn = document.getElementById("submit-btn");
        if(btn){
            btn.addEventListener('click',async(e)=>{
                e.preventDefault();
                const name = document.getElementById("name").value;
                const category = document.getElementById("category").value;
                const brand = document.getElementById("brand").value;
                const price = document.getElementById("price").value;
                const countInStock = document.getElementById("countInStock").value;
                const rating = document.getElementById("rating").value;
                const image = document.getElementById("image").value;

                const product_info = {
                    name:name,
                    category:category,
                    brand:brand,
                    price:price,
                    countInStock:countInStock,
                    rating:rating,
                    image:image
                };

                console.log(product_info);

                const response = await newProduct(product_info);
                console.log("response : ",response);
                if(response.message){
                    console.log(`~ERROR : ${response.message}`);
                    return;
                }
                else{
                    document.location.hash = '/';
                    return;
                }
            })
        }  
    },

    render : async()=>{

        const admin = await checkIsAdmin();

        if(admin.error){
            alert(`     Oops...
            Only admin can add new Products`);
            document.location.hash = '/profile';
            return;
        }

        return `
            <div class="form-container">
            <form id="add-product-form">
                <ul class="form-items">
                <li>
                    <h1>New Product</h1>
                </li>
                <li>
                    <label for="name">Product Name</label>
                    <input type="text" name="name" id="name" value="samosa"/>
                </li>
                <li>
                    <label for="category">Category</label>
                    <input type="text" name="category" id="category" value="food"/>
                </li>
                <li>
                    <label for="brand">Brand</label>
                    <input type="text" name="brand" id="brand" value="sharma ji chat"/>
                </li>
                <li>
                    <label for="price">Price</label>
                    <input type="number" name="price" id="price" value="105"/>
                </li>
                <li>
                    <label for="countInStock">Count In Stock</label>
                    <input type="number" name="countInStock" id="countInStock" value="100000"/>
                </li>
                <li>
                    <label for="rating">Rating</label>
                    <input type="number" name="rating" id="rating" min="0" max="5" step="0.25" value="5"/>
                </li>
                <li>
                <label for="image">Image</label>
                    <input type="text" name="image" id="image" value="/images/product-.jpg"/>
                </li>
                <li>
                    <button type="submit" id="submit-btn" class="primary">Register</button>
                </li>
                </ul>
            </form>
            </div>
            `;
    }
}

export default AddProductScreen;