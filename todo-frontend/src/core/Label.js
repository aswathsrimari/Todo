import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { addLabel } from '../auth/apiCore';
import { isAuthenticated } from '../auth';

const Label = () =>{

    const [names,setName] = useState({
        name:'',
        email:''
    });

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const {name,email} = names;

    const {user,token} = isAuthenticated();
    const handleChange = name => event =>{
        setName({...names,[name]:event.target.value,["email"]:user.email});
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setError('')
        setLoading(true);
        console.log(names)
        addLabel(names,user._id,token)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setError(false);
                setSuccess(true)
                setLoading(false);
                console.log(data)
            }
        });
    }
    const showSucces = () =>{
        if(success){
            return <h3 className="text-success"> {name} is created </h3>
        }
    }

    const showLoading = () =>(
        loading && (
            <div className="alert alert-danger">
            <h2>loading..</h2>
            </div>
        )
    )


    const showError = () =>{
        if(error){
            return <h3 className="text-danger"> Category should be unique </h3>
        }
    }
    const goBack = () =>(
        <div className="mt-5">
            <Link to="/addTask" className="text-warning"> Back to Task creation </Link>
        </div>
    )
    const newLabelForm = () =>(
        <form onSubmit={clickSubmit}>
            <div className="form-group"> 
                <label className="text-muted"> Name </label> 
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} autoFocus required/>
            </div>
            <button className="btn btn-primary"> Create Label</button>

        
        </form>
    )

    return (
        <Layout title="myTODO" description="CREATE LABEL" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()} 
                    {showError()}
                    {showLoading()}
                    {newLabelForm()}
                    {goBack()}
                 </div>
            </div>      
        </Layout>
    )
}

export default Label;