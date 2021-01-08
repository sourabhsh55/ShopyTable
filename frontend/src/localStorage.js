
// loggin-in the user
export const store_token = (info)=>{
    localStorage.setItem("Access_Token",info.Access_Token);
    localStorage.setItem("Refresh_token",info.Refresh_Token);
    localStorage.setItem("Username",info.Username);
    localStorage.setItem("Email",info.Email);
    return;
}

// for getting the user info
export const getUser = ()=>{
    const isname = localStorage.getItem("Username");
    if(!isname){
        return {};
    }
    return {name:isname};
}

// for logging out user
export const delUser = ()=>{
    localStorage.removeItem("Access_Token");
    localStorage.removeItem("Refresh_token");
    localStorage.removeItem("Username");
    localStorage.removeItem("Email");
    return;
}