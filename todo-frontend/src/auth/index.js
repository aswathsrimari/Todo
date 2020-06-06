import {API} from '../config'



export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
}

export const signin = (user) =>{
    console.log(API);
    console.log(user)
    return fetch(`${API}/signin`,{
        method:"POST",
        headers : {
            Accept:"appplication/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        return err;
    })

}   


export const signup = (user) =>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers: {
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
       return response.json();
    })
    .catch(err=>{
        return err;
    })
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
        return false;
    }
}

export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();

        return fetch(`${API}/signout`,{
            method:"POST"
        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}