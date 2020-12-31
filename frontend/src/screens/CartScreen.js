
const CartScreen = {
    render:()=>{
        return `
        <div class="content cart">
        <div class="cart-list">
            <ul class="cart-list-container">
            <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
            </li>
            ${
                cartItems.length === 0
                ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                : cartItems
                    .map(
                        (item) => `
                <li>
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-name">
                    <div>
                    <a href="/#/product/${item.product}">
                        ${item.name}
                    </a>
                    </div>
                    <div>
                    Qty: 
                    <select class="qty-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map((x) =>
                        item.qty === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option  value="${x + 1}">${x + 1}</option>`
                    )}  
                    </select>
                    <button type="button" class="delete-button" id="${
                        item.product
                    }">
                        Delete
                    </button>
                    </div>
                </div>
                <div class="cart-price">
                    $${item.price}
                </div>
                </li>
                `
                    )
                    .join('\n')
            } 
            </ul>
        </div>
        <div class="cart-action">
            <h3>
                Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button id="checkout-button" class="primary fw">
                Proceed to Checkout
            </button>
        </div>
        </div>
        `;
        }
}