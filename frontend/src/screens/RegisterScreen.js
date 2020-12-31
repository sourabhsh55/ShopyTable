import { getRegistered } from "../api.js";


const RegisterScreen = {

    after_render : async()=>{
        const submit_btn = document.getElementById('submit-btn');

        submit_btn.addEventListener('click',async(e)=>{
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            const info = {
                username:name,
                email:email,
                password:password
            };
            getRegistered(info);
        })
    },

    render : ()=>{

        // check if localStorage is having the token or not
        //  --> IF YES, then redirect towards the homepage.

        return `
            <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                <li>
                    <h1>Create Account</h1>
                </li>
                <li>
                    <label for="name">Name</label>
                    <input type="name" name="name" id="name" />
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" />
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                </li>
                <li>
                    <label for="repassword">Re-Enter Password</label>
                    <input type="password" name="repassword" id="repassword" />
                </li>
                <li>
                    <button type="submit" id="submit-btn" class="primary">Register</button>
                </li>
                <li>
                    <div>
                    Already have an account?
                    <a href="/#/signin">Sign-In </a>
                    </div>
                </li>
                </ul>
            </form>
            </div>
            `;
    }
};

export default RegisterScreen;