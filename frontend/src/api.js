
export const getallProducts = async()=>{
    const url = "http://localhost:5000/products/allProducts";
    // const url = "http://192.168.100.5:5000/products/allProducts";
    const params = {
        headers:{
            'Content-Type' : "application/json",
        },
        method:'get'
    }

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        obj = data;
    })
    return obj.products;
}

export const getProductID = async(id)=>{
    const url = `http://localhost:5000/products/${id}`;
    const params = {
        headers:{
            'Content-Type' : "application/json",
        },
        method:'get'
    }

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        obj = data;
    })
    return obj;
}

export const getRegistered = async(info)=>{
    const url = `http://localhost:5000/auth/register`;
    const params = {
        headers : {
            'Content-Type' : "application/json"
        },
        method:'POST',
        body:JSON.stringify(info)
    };
    // console.log("info of user : ",info);

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log("data : ",data);
        obj = data;
    })
    return obj;
}

export const getLoggedIn = async(info)=>{
    const url = `http://localhost:5000/auth/login`;
    const params = {
        headers : {
            'Content-Type' : "application/json"
        },
        method:'POST',
        body:JSON.stringify(info)
    };
    // console.log("info of user : ",info);

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log("Tokens : ",data);
        obj = data;
    })
    return obj;
}

export const getCartItems = async()=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/carts/allProducts`;
    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'POST',
        body:JSON.stringify({email:localStorage.getItem("Email")})
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log("~data : ",data);
        obj = data;
    });
    return obj;
}

export const delCartItem = async(id)=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/carts/deleteProduct`;

    const data = {
        productID:id,
        email:localStorage.getItem("Email")
    };

    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'delete',
        body:JSON.stringify(data)
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    });
    return obj;
};

export const addCartItem = async(product_info)=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/carts/addProduct`;

    const data = {
        productID:product_info.productID,
        email:localStorage.getItem("Email"),
        Qty:product_info.product_Qty
    };
    console.log("sent data : ",data);
    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'post',
        body:JSON.stringify(data)
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    });
    return obj;
};

export const placeOrder = async(order_details)=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/orders/placeOrder`;

    const data = order_details;
    data.email = localStorage.getItem("Email");
    
    console.log("sent data : ",data);
    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'post',
        body:JSON.stringify(data)
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    });
    return obj;
};

export const getAllOrders = async()=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/orders/allOrders`;

    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'post',
        body:JSON.stringify({email:localStorage.getItem("Email")})
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log("~data : ",data);
        obj = data;
    });
    return obj;
};

export const updateOrder = async(id)=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/orders/updateOrder`;

    const data = {
        productID : id,
        email : localStorage.getItem("Email")
    };

    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'post',
        body:JSON.stringify(data)
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    });
    return obj;
};


export const newProduct = async(product_info)=>{
    const token = localStorage.getItem("Access_Token");
    const url = `http://localhost:5000/products/addProduct`;

    const data = product_info;

    const params = {
        headers : {
            'Content-Type' : "application/json",
            Authorization: `Bearer ${token}`,
        },
        method:'post',
        body:JSON.stringify(data)
    };

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    });
    return obj;
};

export const checkIsAdmin = async()=>{
    const token = localStorage.getItem("Access_Token");
    const url = "http://localhost:5000/auth/isAdmin";

    const data = {
        email:localStorage.getItem("Email"),
        name:localStorage.getItem("Username")
    }
    
    const params = {
        headers : {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
        method:"POST",
        body : JSON.stringify(data)
    }

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    })
    return obj;
};

export const getNewAccessToken = async()=>{
    const url = "http://localhost:5000/auth/newAccessToken";

    const data = {
        email:localStorage.getItem("Email"),
        username:localStorage.getItem("Username"),
        refreshToken : localStorage.getItem("Refresh_token")
    }
    
    const params = {
        headers : {
            "Content-Type":"application/json",
        },
        method:"POST",
        body : JSON.stringify(data)
    }

    var obj;
    await fetch(url,params)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        // console.log(data);
        obj = data;
    })
    return obj;
};