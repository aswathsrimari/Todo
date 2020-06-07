import React, { useState } from 'react'
import Menu from '../core/Menu'
import Layout from '../core/Layout';
import {API} from '../config'
import { Redirect } from 'react-router-dom';
import { signin,authenticate} from '../auth/index';
import {isAuthenticated} from '../auth/index'

const Signin = () =>{

    const [values, setValues] = useState({
        email:"",
        password:"",
        error: '',
        loading: false,
        redirectToRefferer: false
    })

    const {email,password,loading,error,redirectToRefferer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values,[name]:event.target.value,error:false})
    }

    const ClickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values,error:false,redirectToRefferer:true});

                });
                
            }
        }) 
    }

    const signinForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password}/>
            </div>
            <button onClick={ClickSubmit} className="btn btn-primary" >SIGN IN</button>
        
        </form>
    );


    const showLoading = () =>(
        loading && (
            <div className="alert alert-danger">
                <h2>loading...</h2>
            </div>
        )
    )

    const RedirectTo = () =>{
        if(redirectToRefferer && error=='' && user){
            console.log(user);
            return <Redirect to="/" />
        }
    }

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
         {error}
        </div>
    )


    return ( 
        <Layout title="myTODO" description="SIGN IN" className="container col-md-8 offset-md-2">
        {showLoading()}
        {signinForm()}
        {showError()}
        {RedirectTo()}
        </Layout>
    )

}

export default Signin;