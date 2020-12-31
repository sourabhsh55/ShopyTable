import {getLoggedIn} from "../api.js";

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
            //save these tokens inside the localStorage.
        })
    },
    render: () => {

        return `
        <div class="form-container">
          <form id="signin-form">
            <ul class="form-items">
              <li>
                <h1>Sign-In</h1>
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
                <button type="submit" id="Signin-btn" class="primary">Signin</button>
              </li>
              <li>
                <div>
                  New User?
                  <a href="/#/register">Create your account </a>
                </div>
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
