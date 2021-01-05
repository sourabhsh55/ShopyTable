import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import ErrorScreen from './screens/ErrorScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import CartScreen from './screens/CartScreen.js';
import parseURL from "./utils.js";
import Header from './components/Header.js';
import ProfileScreen from './screens/ProfileScreen.js';
import AddProductScreen from './screens/AddProductScreen.js';

const routes = {
    '/':HomeScreen,
    '/product/:id':ProductScreen,
    '/register':RegisterScreen,
    '/signin':SigninScreen,
    '/cart':CartScreen,
    '/profile':ProfileScreen,
    '/add-product':AddProductScreen
}

const router = async()=>{

    const request = parseURL();
    console.log(request);
    const URL = (request.resource ? `/${request.resource}` : '/') + 
                (request.id ? `/:id` : '') +
                (request.action ? `/${request.action}` : '');
    
    console.log("URL : ",URL);
    console.log(routes[URL]);
    const screen = routes[URL] ? routes[URL] : ErrorScreen;

    const header = document.getElementById("header-content");
    header.innerHTML = Header.render();

    console.log("screen : ",screen);
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    if(screen.after_render){
        await screen.after_render();
    }
}

window.addEventListener("load",router);
window.addEventListener("hashchange",router);