import {getLoggedIn} from "../api.js";
import { store_token, getUser } from "../localStorage.js";

const SigninScreen = {

    after_render : async()=>{
        const signin_btn = document.getElementById('Signin-btn');
        signin_btn.addEventListener('click',async(e)=>{
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const info = {
                username:name,
                email:email,
                password:password
            };
            const tokens = await getLoggedIn(info);
            if(tokens.error){
              alert(`${tokens.error}`)
            }
            else{
              store_token({
                Access_Token:tokens.accessToken,
                Refresh_Token:tokens.refreshToken,
                Username:name,
                Email:email
              });
              document.location.hash = "/";
            }
        })
    },
    render: () => {

      const name = localStorage.getItem("Username");
      if(name){
        document.location.hash = '/';
      }

        return `
        <div class="form-container">
        <form id="signin-form">
            <ul class="form-items">
              <li>
                <h1>Sign-In</h1>
              </li>
              
              <li>
              <label for="name" required>Name</label>
              <input type="name" name="name" id="name" required/>
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
                <button type="submit" id="Signin-btn" class="primary">Signin</button>
              </li>
              <li>
                <div>
                  New User?
                  <a href="/#/register">Create your account </a>
                </div>
              </li>
              <li>
              <div style="color:grey">Input fields is case sensitive </div>
              </li>
            </ul>
            </form>
        </div>
        
        `;
      },
}

// const SigninScreen = {
//     render:()=>{
//         return `<div> SignIn Screen </div>`;
//     }
// };

export default SigninScreen;
