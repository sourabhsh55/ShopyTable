import { delCartItem, getCartItems, placeOrder } from "../api.js";
import { rerender } from "../utils.js";


var obj;
var Items_id_list = [];

const CartScreen = {

    after_render : async()=>{
        // deleting products from cart.
        let btns = document.getElementsByClassName("delete-button");
        let len = btns.length;
        for(let i=0;i<len;i++){
            btns[i].addEventListener('click',async()=>{
                console.log("btn_id",btns[i].id);
                await delCartItem(btns[i].id);
                rerender(CartScreen);
            })
        }

        // placing order.
        const placeOrder_btn = document.getElementById("checkout-button");
        if(placeOrder_btn){
            placeOrder_btn.addEventListener("click",async(e)=>{
                const address = document.getElementById("address").value;
                const pincode = document.getElementById("pincode").value;
        
                console.log(`${address} + ${pincode}`);
        
                obj.items.items.map((item=>Items_id_list.push(item._id)));
        
                const order_details = {
                    address:address,
                    pincode:pincode,
                    items_id:Items_id_list,
                    Qty:obj.items.Qty,
                    totalCost:`${obj.items.Qty.reduce(function(r,a,i){return r+a*obj.items.items[i].price},0)}`
                }

                var ordered_items = await placeOrder(order_details);
                if(ordered_items.error){
                    alert(`${ordered_items.error}`);
                }
                ordered_items = ordered_items.reg_item;
                const orders_list = ordered_items.orders;
                const order_id = orders_list[orders_list.length-1]._id;
                await setTimeout(()=>{},1000);
                document.location.hash = '/profile';

            })
        }
        
    },
    render:async()=>{

        if(!localStorage.getItem("Username")){
            document.location.hash = '/';
        }

        obj = await getCartItems();

        if(obj.error){
            return `<div><h2>${obj.error}</h2></div>`;
        }
        let {items:cartItems,Qty} = obj;
        console.log(cartItems);

        return `
        <div class="content cart">
        <div class="cart-list">
            <ul class="cart-list-container">
            <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
            </li>
            ${
                cartItems.items.length === 0
                ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                : cartItems.items
                    .map(
                        (item,index) =>  
                        `
                            <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt="${item.name}" />
                            </div>
                            <div class="cart-name">
                                <div>
                                <a href="/#/product/${item._id}">
                                    ${item.name}
                                </a>
                                </div>
                                <div>
                                <strong>Qty:</strong> 
                                    ${cartItems.Qty[index]}
                                    <br>
                                    <br>
                                <button type="button" class="delete-button" id="${
                                    item._id
                                }">
                                    Delete
                                </button>
                                </div>
                            </div>
                            <div class="cart-price">
                            ₹ ${item.price}
                            </div>
                            </li>
                        `,
                        )
                    .join('\n')
            } 
            </ul>
        </div>
        <div class="cart-action">
            <h2>
                Subtotal (${cartItems.Qty.reduce((a,c)=> a+c,0)} items)
                :
                ₹ ${cartItems.Qty.reduce(function(r,a,i){return r+a*cartItems.items[i].price},0)}
            </h3>
            <br>
            <h3>Shipping Address</h3>
            <form>
                <div>
                <input type="text" id="address" class="address fw" placeholder="Address" required>
                </div>
                <br>
                <div>
                <input type="number" id="pincode" class="pincode fw" placeholder="Pin Code" required>
                </div>
            
                <br><br><br>
                <button type="submit" id="checkout-button" class="primary fw">
                    <strong>Proceed to Checkout</strong>
                </button>
            </form>
        </div>
        </div>
        `;
        }
};

export default CartScreen;