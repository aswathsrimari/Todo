import React, { useState } from 'react'
import Layout from '../core/Layout';
import { signup } from '../auth/index';
import { Link } from 'react-router-dom';




const Signup = () =>{


    const [values,setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        success:false
    })

    const {email,password,error,loading,success} = values;

    const handleChange = name => event =>{
        setValues({...values,[name]:event.target.value});
    }

    const signupForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password}/>
            </div>  
            <button className="btn btn-primary" onClick={clickSubmit}>SIGN UP</button>
        </form>
    )

    const clickSubmit = (event) =>{
        event.preventDefault();
        signup({email,password})
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,success:true});
            }
        })
    }
    const showLoading = () =>(
        loading && (
            <div className="alert alert-danger">
            <h2>loading... </h2>
            </div>
        )
    )

    const ShowSuccess = () =>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
            Successfully registered. Please click <Link to="/signin">SIGN IN</Link>
        </div>
    )

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
         {error}
        </div>
    )

    return (
        <Layout title="TODO" description="SIGN UP" className="container col-md-8 offset-md-2"> 
        
        {showLoading()}
        {signupForm()}
        {showError()}
        {ShowSuccess()}

         </Layout>
    )

}
    


export default Signup;