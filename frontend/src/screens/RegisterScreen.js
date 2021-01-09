import { getRegistered } from "../api.js";
import { getUser } from "../localStorage.js";


const RegisterScreen = {

    after_render : async()=>{
        const submit_btn = document.getElementById('submit-btn');

        submit_btn.addEventListener('click',async(e)=>{
            // e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const info = {
                username:name,
                email:email,
                password:password
            };
            const obj = await getRegistered(info);
            if(obj.error){
                alert(obj.error);
            }
            else{
                document.location.hash = "/signin";
            }
        })
    },

    render : ()=>{

        // check if localStorage is having the token or not
        //  --> IF YES, then redirect towards the homepage.
        const name = localStorage.getItem("Username");
        const token = localStorage.getItem("Access_Token");
        if(name && token){
            document.location.hash = '/singin';
        }

        return `
            <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                <li>
                    <h1>Create Account</h1>
                </li>
                
                    <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" required/>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required/>
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" required/>
                    </li>
                    <li>
                        <label for="repassword">Re-Enter Password</label>
                        <input type="password" name="repassword" id="repassword" required/>
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
                    <li>
                    <div style="color:grey">Input fields is case sensitive </div>
                    </li>
                </ul>
            </form>
            </div>
            `;
    }
};

export default RegisterScreen;