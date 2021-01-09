import { getUser } from "../localStorage.js";

const Header = {
    render : ()=>{
        const user = getUser();
        console.log("user_name_set : ",user.name);
        return `
        <div class="brand">
            <a href="/#/">ShopyTable</a>
        </div>
        <div>
            ${
                user.name ? `<a href="/#/profile">${user.name}</a> <a href="/#/cart">Cart</a>` 
                          : `<a href="/#/signin">Signin</a>`
            }
            
        </div>
        `
    }
}

export default Header;