import { updateOrder,getAllOrders, checkIsAdmin, getNewAccessToken } from "../api.js";
import { delUser } from "../localStorage.js";

const ProfileScreen = {

    after_render : async()=>{
        const logout_btn = document.getElementById('signout-button');
        if(logout_btn){
            logout_btn.addEventListener('click',()=>{
                delUser();
                document.location.hash = "/";
            })
        }
        

        const yes_btns = document.getElementsByClassName("yes-button");
        if(yes_btns){
            for(let i=0;i<yes_btns.length;i++){
                yes_btns[i].addEventListener('click',async()=>{
                    let r = confirm("Are you sure you have received your package?");
                    if(r==true){
                        await updateOrder(yes_btns[i].id);
                        document.getElementsByClassName(yes_btns[i].id)[0].childNodes[9].innerText = true;
                        yes_btns[i].disabled = true;
                        yes_btns[i].innerText = "Done";
                    }
                })
            }

            const add_product_btn = document.getElementById("Add-product-button");
            if(add_product_btn){
                add_product_btn.addEventListener('click',()=>{
                    document.location.hash = '/add-product';
                })
            }
        }
    },

    render : async()=>{

        if(!localStorage.getItem("Username")){
            document.location.hash = '/';
        }
        var obj_orderItem = await getAllOrders();

        // if token is expired and make a request at the backend for the new Access_Token
        if(obj_orderItem.error == "jwt expired" || obj_orderItem.error == "invalid token" || obj_orderItem.error == "invalid signature"){
            // alert("jwt expired");
            const newToken = await getNewAccessToken();
            if(newToken.error){
                // alert(newToken.error);
                document.location.hash = '/';
                return;
            }
            localStorage.setItem("Access_Token",newToken.token);
            obj_orderItem = await getAllOrders();
        }
        const {ORDERS:orders} = obj_orderItem;
        console.log(orders.length);
        const name = localStorage.getItem("Username");
        const email = localStorage.getItem("Email");
        return `
            <div class="content profile">
            <div class="profile-info">
            <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                <li>
                    <h1>User Profile</h1>
                </li>
                <li>
                    <h2><label for="name">Name: ${name}</label></h2>
                    <h2><label for="email">Email: ${email}</label></h2>
                </li>

                <li>
                    <button type="button" id="signout-button" class="primary" >Sign Out</button>
                </li>   
                <li>
                    <button type="button" id="Add-product-button" class="primary" >Add Product</button>
                </li>        
                </ul>
            </form>
            </div>
            </div>
            <div class="profile-orders">
            <h2>Order History</h2>
                <table>
                <thead>
                    <tr>
                    <th>ORDER ID</th>
                    <th>ADDRESS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>DELIVERED</th>
                    <th class="tr-action">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                    orders.length === 0
                        ? `<tr><td colspan="5"><h2>No Order Found.</h2></tr>`
                        : orders
                            .map(
                            (order) => `
                <tr class="${order._id}">
                    <td>${order._id}</td>
                    <td>${order.address}</td>
                    <td>${
                        order.time.split('T')[0]
                    }</td>
                    <td>${order.totalCost}</td>
                    <td>${order.isDelivered}</td>
                    
                    <td>
                        ${order.isDelivered==true
                             ? `<button type="button" id="${order._id}" class="yes-button" disabled>Done</button>`
                             : `<button type="button" id="${order._id}" class="yes-button">Yes</button>`
                        }
                    </td> 
                </tr>
                
                `
                            )
                            .join('\n')
                    }
                </tbody>
                </table>
            </div>
            </div>
            
            `;
        }
};


export default ProfileScreen;


{/* <td>${order.isDelivered}</td> */}

// alert("Are you sure you have received your package?");
// await updateOrder(yes_btns[i].id);

{/* <td><button id="${order._id}" class="yes-button">Yes</button></td> */}