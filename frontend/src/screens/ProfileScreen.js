import { updateOrder,getAllOrders } from "../api.js";
import { delUser } from "../localStorage.js";

const ProfileScreen = {

    after_render : async()=>{
        const logout_btn = document.getElementById('signout-button');
        logout_btn.addEventListener('click',()=>{
            delUser();
            document.location.hash = "/";
        })

        const yes_btns = document.getElementsByClassName("yes-button");
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
        add_product_btn.addEventListener('click',()=>{
            document.location.hash = '/add-product';
        })
    },

    render : async()=>{

        const {ORDERS:orders} = await getAllOrders();
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