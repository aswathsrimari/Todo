import {API} from '../config'
import emailjs from 'emailjs-com'


export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
}

export const signin = (user) =>{
    console.log(API);
    console.log(user)
    return fetch(`/api/signin`,{
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
    return fetch(`/api/signup`,{
        method:"POST",
        headers: {
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
        var templateParams = {
            email:user.email,
        };
        emailjs.send('gmail', 'template_kllHHESb', templateParams,'user_zOLpPo9rQpJLoZDSApP23')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

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

        return fetch(`/signout`,{
            method:"POST"
        })
        .then(response=>{
            window.location.reload(true)
            return response.json();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}